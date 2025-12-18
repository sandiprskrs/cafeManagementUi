'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cart, CartItem, MenuItem, OrderItem } from '@/types';
import { generateId } from '@/lib/utils';
import { DEFAULT_TAX_PERCENTAGE } from '@/lib/constants';

interface CartContextType {
    cart: Cart;
    setCurrentTable: (tableId: string | null) => void;
    addItem: (menuItem: MenuItem, quantity?: number) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    updateNotes: (itemId: string, notes: string) => void;
    applyDiscount: (itemId: string, discount: number) => void;
    clearCart: () => void;
    applyGlobalDiscount: (discount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({
        tableId: null,
        items: [],
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });

    const calculateTotals = (items: CartItem[], globalDiscount: number = 0): Omit<Cart, 'tableId' | 'items'> => {
        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const discount = (subtotal * globalDiscount) / 100;
        const taxableAmount = subtotal - discount;
        const tax = (taxableAmount * DEFAULT_TAX_PERCENTAGE) / 100;
        const total = taxableAmount + tax;

        return { subtotal, tax, discount, total };
    };

    const setCurrentTable = (tableId: string | null) => {
        setCart((prev) => ({ ...prev, tableId }));
    };

    const addItem = (menuItem: MenuItem, quantity: number = 1) => {
        setCart((prev) => {
            // Check if item already exists
            const existingItemIndex = prev.items.findIndex(
                (item) => item.menuItem.id === menuItem.id && !item.notes
            );

            let newItems: CartItem[];

            if (existingItemIndex >= 0) {
                // Update existing item
                newItems = [...prev.items];
                const existingItem = newItems[existingItemIndex];
                existingItem.quantity += quantity;
                existingItem.subtotal = existingItem.quantity * menuItem.price;
            } else {
                // Add new item
                const newItem: CartItem = {
                    id: generateId(),
                    menuItem,
                    quantity,
                    subtotal: quantity * menuItem.price,
                };
                newItems = [...prev.items, newItem];
            }

            const totals = calculateTotals(newItems, prev.discount);
            return { ...prev, items: newItems, ...totals };
        });
    };

    const removeItem = (itemId: string) => {
        setCart((prev) => {
            const newItems = prev.items.filter((item) => item.id !== itemId);
            const totals = calculateTotals(newItems, prev.discount);
            return { ...prev, items: newItems, ...totals };
        });
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }

        setCart((prev) => {
            const newItems = prev.items.map((item) => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        quantity,
                        subtotal: quantity * item.menuItem.price,
                    };
                }
                return item;
            });

            const totals = calculateTotals(newItems, prev.discount);
            return { ...prev, items: newItems, ...totals };
        });
    };

    const updateNotes = (itemId: string, notes: string) => {
        setCart((prev) => {
            const newItems = prev.items.map((item) => {
                if (item.id === itemId) {
                    return { ...item, notes };
                }
                return item;
            });

            return { ...prev, items: newItems };
        });
    };

    const applyDiscount = (itemId: string, discount: number) => {
        setCart((prev) => {
            const newItems = prev.items.map((item) => {
                if (item.id === itemId) {
                    return { ...item, discount };
                }
                return item;
            });

            return { ...prev, items: newItems };
        });
    };

    const applyGlobalDiscount = (discount: number) => {
        setCart((prev) => {
            const totals = calculateTotals(prev.items, discount);
            return { ...prev, ...totals };
        });
    };

    const clearCart = () => {
        setCart({
            tableId: null,
            items: [],
            subtotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCurrentTable,
                addItem,
                removeItem,
                updateQuantity,
                updateNotes,
                applyDiscount,
                clearCart,
                applyGlobalDiscount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
