// User and Authentication Types
export type Role = 'manager' | 'cashier' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Menu Types
export type MenuCategory = 'Coffee' | 'Tea' | 'Bakery' | 'Sandwiches' | 'Specials';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  image?: string;
  prepTime: number; // in minutes
  isAvailable: boolean;
  tags: string[]; // e.g., 'Veg', 'Vegan', 'Spicy', 'Popular'
}

// Order Types
export type OrderStatus = 'draft' | 'queued' | 'in-progress' | 'ready' | 'served' | 'paid';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'split';

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  discount?: number; // percentage
  subtotal: number;
}

export interface Order {
  id: string;
  tableId: string | null; // null for takeaway
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  servedAt?: Date;
  notes?: string;
}

// Table Types
export type TableStatus = 'free' | 'occupied' | 'reserved' | 'billing';

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
}

// Inventory Types
export type StockStatus = 'ok' | 'low' | 'critical';

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string; // 'kg', 'L', 'pcs', etc.
  reorderLevel: number;
  supplier: string;
  status: StockStatus;
  lastUpdated: Date;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'ordered' | 'delivered';
  orderDate: Date;
  deliveryDate?: Date;
}

// Staff Types
export interface Staff {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone: string;
  shift: 'morning' | 'afternoon' | 'evening' | 'night';
  isActive: boolean;
  hireDate: Date;
}

export interface Shift {
  id: string;
  staffId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'absent';
}

// Analytics Types
export interface KPIData {
  ordersToday: number;
  revenueToday: number;
  activeTables: number;
  lowStockItems: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategorySales {
  category: MenuCategory;
  sales: number;
  orders: number;
}

export interface TopSellingItem {
  item: MenuItem;
  quantity: number;
  revenue: number;
}

// Settings Types
export interface CafeSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  businessHours: {
    open: string;
    close: string;
  };
  taxPercentage: number;
  serviceChargeEnabled: boolean;
  serviceChargePercentage: number;
  currency: string;
  theme: 'light' | 'dark';
  accentColor: string;
}

// Cart Types (for POS)
export interface CartItem extends OrderItem {}

export interface Cart {
  tableId: string | null;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}
