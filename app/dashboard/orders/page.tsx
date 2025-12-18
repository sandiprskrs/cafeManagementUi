'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/contexts/CartContext';
import { menuService, tableService, orderService } from '@/lib/services';
import { formatCurrency } from '@/lib/utils';
import { MENU_CATEGORIES } from '@/lib/constants';
import { MenuCategory, Table } from '@/types';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { showSuccess, showToast } from '@/lib/sweetalert';

export default function OrdersPage() {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('Coffee');
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const { cart, setCurrentTable, addItem, updateQuantity, removeItem, clearCart } = useCart();

    const tables = tableService.getAll();
    const menuItems = menuService.getByCategory(selectedCategory);

    const handleTableSelect = (tableId: string) => {
        setSelectedTable(tableId);
        setCurrentTable(tableId);
    };

    const handleSendToKitchen = () => {
        if (cart.items.length === 0) return;

        const order = orderService.create({
            tableId: cart.tableId,
            items: cart.items,
            status: 'queued',
            subtotal: cart.subtotal,
            tax: cart.tax,
            discount: cart.discount,
            total: cart.total,
        });

        showSuccess(
            'Order Sent to Kitchen!',
            `Order #${order.id.slice(0, 8)} has been successfully sent to the kitchen.`
        );
        clearCart();
    };

    return (
        <div className="h-full flex gap-4 animate-fade-in">
            {/* Tables */}
            <div className="w-64 space-y-4">
                <h2 className="text-lg font-semibold">Tables</h2>
                <div className="grid grid-cols-2 gap-2">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            onClick={() => handleTableSelect(table.id)}
                            className={`p-4 rounded-lg border-2 transition-smooth hover-lift ${selectedTable === table.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div className="text-sm font-medium">Table {table.number}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {table.capacity} seats
                            </div>
                            <Badge
                                variant={
                                    table.status === 'free'
                                        ? 'success'
                                        : table.status === 'occupied'
                                            ? 'destructive'
                                            : 'warning'
                                }
                                className="mt-2"
                            >
                                {table.status}
                            </Badge>
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-3">Menu</h2>
                    <div className="flex gap-2 flex-wrap">
                        {MENU_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                        <Card
                            key={item.id}
                            className={`cursor-pointer transition-smooth hover-lift ${!item.isAvailable ? 'opacity-50' : ''
                                }`}
                            onClick={() => item.isAvailable && addItem(item)}
                        >
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">{item.name}</CardTitle>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {item.description}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">
                                        {formatCurrency(item.price)}
                                    </span>
                                    {item.isAvailable ? (
                                        <Plus className="h-5 w-5 text-primary" />
                                    ) : (
                                        <span className="text-xs text-destructive">Out of stock</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Cart */}
            <div className="w-80 space-y-4">
                <h2 className="text-lg font-semibold">Current Order</h2>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {cart.tableId
                                ? `Table ${cart.tableId.replace('table-', '')}`
                                : 'Select a table'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cart.items.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                No items in cart
                            </p>
                        ) : (
                            <>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-2 p-2 rounded border">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.menuItem.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatCurrency(item.menuItem.price)} each
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-accent rounded"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-sm font-medium w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-accent rounded"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1 hover:bg-destructive/10 rounded"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal:</span>
                                        <span>{formatCurrency(cart.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax (5%):</span>
                                        <span>{formatCurrency(cart.tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total:</span>
                                        <span>{formatCurrency(cart.total)}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Button className="w-full" onClick={handleSendToKitchen}>
                                        Send to Kitchen
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={clearCart}>
                                        Clear Cart
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
