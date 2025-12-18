import {
    MenuItem,
    Table,
    Order,
    OrderItem,
    InventoryItem,
    Staff,
    PurchaseOrder,
    KPIData,
    RevenueData,
    CategorySales,
    TopSellingItem,
    OrderStatus,
    StockStatus,
    MenuCategory,
} from '@/types';
import {
    mockMenuItems,
    mockTables,
    mockOrders,
    mockInventory,
    mockStaff,
    mockPurchaseOrders,
} from './mockData';
import { generateId } from './utils';
import { DEFAULT_TAX_PERCENTAGE } from './constants';

// In-memory data stores
let menuItems = [...mockMenuItems];
let tables = [...mockTables];
let orders = [...mockOrders];
let inventory = [...mockInventory];
let staff = [...mockStaff];
let purchaseOrders = [...mockPurchaseOrders];

// Menu Services
export const menuService = {
    getAll: (): MenuItem[] => menuItems,

    getById: (id: string): MenuItem | undefined => {
        return menuItems.find((item) => item.id === id);
    },

    getByCategory: (category: MenuCategory): MenuItem[] => {
        return menuItems.filter((item) => item.category === category);
    },

    create: (item: Omit<MenuItem, 'id'>): MenuItem => {
        const newItem: MenuItem = {
            ...item,
            id: generateId(),
        };
        menuItems.push(newItem);
        return newItem;
    },

    update: (id: string, updates: Partial<MenuItem>): MenuItem | null => {
        const index = menuItems.findIndex((item) => item.id === id);
        if (index === -1) return null;

        menuItems[index] = { ...menuItems[index], ...updates };
        return menuItems[index];
    },

    delete: (id: string): boolean => {
        const index = menuItems.findIndex((item) => item.id === id);
        if (index === -1) return false;

        menuItems.splice(index, 1);
        return true;
    },

    toggleAvailability: (id: string): MenuItem | null => {
        const item = menuItems.find((item) => item.id === id);
        if (!item) return null;

        item.isAvailable = !item.isAvailable;
        return item;
    },
};

// Table Services
export const tableService = {
    getAll: (): Table[] => tables,

    getById: (id: string): Table | undefined => {
        return tables.find((table) => table.id === id);
    },

    updateStatus: (id: string, status: Table['status'], orderId?: string): Table | null => {
        const table = tables.find((t) => t.id === id);
        if (!table) return null;

        table.status = status;
        if (orderId) {
            table.currentOrderId = orderId;
        } else {
            delete table.currentOrderId;
        }
        return table;
    },

    getAvailable: (): Table[] => {
        return tables.filter((table) => table.status === 'free');
    },
};

// Order Services
export const orderService = {
    getAll: (): Order[] => orders,

    getById: (id: string): Order | undefined => {
        return orders.find((order) => order.id === id);
    },

    getByStatus: (status: OrderStatus): Order[] => {
        return orders.filter((order) => order.status === status);
    },

    getByTable: (tableId: string): Order[] => {
        return orders.filter((order) => order.tableId === tableId);
    },

    getActive: (): Order[] => {
        return orders.filter((order) =>
            ['queued', 'in-progress', 'ready'].includes(order.status)
        );
    },

    create: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
        const newOrder: Order = {
            ...orderData,
            id: generateId(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        orders.push(newOrder);

        // Update table status if applicable
        if (newOrder.tableId) {
            tableService.updateStatus(newOrder.tableId, 'occupied', newOrder.id);
        }

        return newOrder;
    },

    update: (id: string, updates: Partial<Order>): Order | null => {
        const index = orders.findIndex((order) => order.id === id);
        if (index === -1) return null;

        orders[index] = {
            ...orders[index],
            ...updates,
            updatedAt: new Date(),
        };
        return orders[index];
    },

    updateStatus: (id: string, status: OrderStatus): Order | null => {
        const order = orders.find((o) => o.id === id);
        if (!order) return null;

        order.status = status;
        order.updatedAt = new Date();

        if (status === 'served') {
            order.servedAt = new Date();
        }

        // Update table status based on order status
        if (order.tableId) {
            if (status === 'paid') {
                tableService.updateStatus(order.tableId, 'free');
            } else if (status === 'served') {
                tableService.updateStatus(order.tableId, 'billing', order.id);
            }
        }

        return order;
    },

    delete: (id: string): boolean => {
        const index = orders.findIndex((order) => order.id === id);
        if (index === -1) return false;

        const order = orders[index];
        if (order.tableId) {
            tableService.updateStatus(order.tableId, 'free');
        }

        orders.splice(index, 1);
        return true;
    },

    calculateTotals: (items: OrderItem[], discountPercent: number = 0): {
        subtotal: number;
        tax: number;
        discount: number;
        total: number;
    } => {
        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const discount = (subtotal * discountPercent) / 100;
        const taxableAmount = subtotal - discount;
        const tax = (taxableAmount * DEFAULT_TAX_PERCENTAGE) / 100;
        const total = taxableAmount + tax;

        return { subtotal, tax, discount, total };
    },
};

// Inventory Services
export const inventoryService = {
    getAll: (): InventoryItem[] => inventory,

    getById: (id: string): InventoryItem | undefined => {
        return inventory.find((item) => item.id === id);
    },

    getLowStock: (): InventoryItem[] => {
        return inventory.filter((item) => item.status === 'low' || item.status === 'critical');
    },

    updateStock: (id: string, quantity: number): InventoryItem | null => {
        const item = inventory.find((i) => i.id === id);
        if (!item) return null;

        item.currentStock += quantity;
        item.lastUpdated = new Date();

        // Update status based on stock level
        if (item.currentStock <= item.reorderLevel * 0.5) {
            item.status = 'critical';
        } else if (item.currentStock <= item.reorderLevel) {
            item.status = 'low';
        } else {
            item.status = 'ok';
        }

        return item;
    },

    create: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>): InventoryItem => {
        const newItem: InventoryItem = {
            ...item,
            id: generateId(),
            lastUpdated: new Date(),
        };
        inventory.push(newItem);
        return newItem;
    },

    update: (id: string, updates: Partial<InventoryItem>): InventoryItem | null => {
        const index = inventory.findIndex((item) => item.id === id);
        if (index === -1) return null;

        inventory[index] = {
            ...inventory[index],
            ...updates,
            lastUpdated: new Date(),
        };
        return inventory[index];
    },

    delete: (id: string): boolean => {
        const index = inventory.findIndex((item) => item.id === id);
        if (index === -1) return false;

        inventory.splice(index, 1);
        return true;
    },
};

// Staff Services
export const staffService = {
    getAll: (): Staff[] => staff,

    getById: (id: string): Staff | undefined => {
        return staff.find((s) => s.id === id);
    },

    getActive: (): Staff[] => {
        return staff.filter((s) => s.isActive);
    },

    create: (staffData: Omit<Staff, 'id'>): Staff => {
        const newStaff: Staff = {
            ...staffData,
            id: generateId(),
        };
        staff.push(newStaff);
        return newStaff;
    },

    update: (id: string, updates: Partial<Staff>): Staff | null => {
        const index = staff.findIndex((s) => s.id === id);
        if (index === -1) return null;

        staff[index] = { ...staff[index], ...updates };
        return staff[index];
    },

    delete: (id: string): boolean => {
        const index = staff.findIndex((s) => s.id === id);
        if (index === -1) return false;

        staff.splice(index, 1);
        return true;
    },

    toggleActive: (id: string): Staff | null => {
        const member = staff.find((s) => s.id === id);
        if (!member) return null;

        member.isActive = !member.isActive;
        return member;
    },
};

// Purchase Order Services
export const purchaseOrderService = {
    getAll: (): PurchaseOrder[] => purchaseOrders,

    getById: (id: string): PurchaseOrder | undefined => {
        return purchaseOrders.find((po) => po.id === id);
    },

    create: (poData: Omit<PurchaseOrder, 'id'>): PurchaseOrder => {
        const newPO: PurchaseOrder = {
            ...poData,
            id: generateId(),
        };
        purchaseOrders.push(newPO);
        return newPO;
    },

    updateStatus: (id: string, status: PurchaseOrder['status'], deliveryDate?: Date): PurchaseOrder | null => {
        const po = purchaseOrders.find((p) => p.id === id);
        if (!po) return null;

        po.status = status;
        if (deliveryDate) {
            po.deliveryDate = deliveryDate;
        }

        return po;
    },
};

// Analytics Services
export const analyticsService = {
    getKPIs: (): KPIData => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayOrders = orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            orderDate.setHours(0, 0, 0, 0);
            return orderDate.getTime() === today.getTime();
        });

        const revenueToday = todayOrders
            .filter((order) => order.status === 'paid')
            .reduce((sum, order) => sum + order.total, 0);

        const activeTables = tables.filter((table) => table.status === 'occupied').length;
        const lowStockItems = inventory.filter((item) =>
            item.status === 'low' || item.status === 'critical'
        ).length;

        return {
            ordersToday: todayOrders.length,
            revenueToday,
            activeTables,
            lowStockItems,
        };
    },

    getRevenueData: (days: number = 7): RevenueData[] => {
        const data: RevenueData[] = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const dayOrders = orders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                orderDate.setHours(0, 0, 0, 0);
                return orderDate.getTime() === date.getTime() && order.status === 'paid';
            });

            const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0);

            data.push({
                date: date.toISOString().split('T')[0],
                revenue,
                orders: dayOrders.length,
            });
        }

        return data;
    },

    getCategorySales: (): CategorySales[] => {
        const categoryMap = new Map<MenuCategory, { sales: number; orders: number }>();

        orders
            .filter((order) => order.status === 'paid')
            .forEach((order) => {
                order.items.forEach((item) => {
                    const category = item.menuItem.category;
                    const existing = categoryMap.get(category) || { sales: 0, orders: 0 };
                    categoryMap.set(category, {
                        sales: existing.sales + item.subtotal,
                        orders: existing.orders + item.quantity,
                    });
                });
            });

        return Array.from(categoryMap.entries()).map(([category, data]) => ({
            category,
            ...data,
        }));
    },

    getTopSellingItems: (limit: number = 5): TopSellingItem[] => {
        const itemMap = new Map<string, { item: MenuItem; quantity: number; revenue: number }>();

        orders
            .filter((order) => order.status === 'paid')
            .forEach((order) => {
                order.items.forEach((orderItem) => {
                    const existing = itemMap.get(orderItem.menuItem.id) || {
                        item: orderItem.menuItem,
                        quantity: 0,
                        revenue: 0,
                    };
                    itemMap.set(orderItem.menuItem.id, {
                        item: orderItem.menuItem,
                        quantity: existing.quantity + orderItem.quantity,
                        revenue: existing.revenue + orderItem.subtotal,
                    });
                });
            });

        return Array.from(itemMap.values())
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, limit);
    },
};

// Reset function for testing
export const resetData = () => {
    menuItems = [...mockMenuItems];
    tables = [...mockTables];
    orders = [...mockOrders];
    inventory = [...mockInventory];
    staff = [...mockStaff];
    purchaseOrders = [...mockPurchaseOrders];
};
