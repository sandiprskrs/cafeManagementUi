import { MenuCategory, Role } from '@/types';

// Demo Credentials
export const DEMO_CREDENTIALS = {
    manager: {
        email: 'manager@cafe.com',
        password: 'manager123',
        name: 'John Manager',
        role: 'manager' as Role,
    },
    cashier: {
        email: 'cashier@cafe.com',
        password: 'cashier123',
        name: 'Sarah Cashier',
        role: 'cashier' as Role,
    },
    staff: {
        email: 'staff@cafe.com',
        password: 'staff123',
        name: 'Mike Staff',
        role: 'staff' as Role,
    },
};

// Menu Categories
export const MENU_CATEGORIES: MenuCategory[] = [
    'Coffee',
    'Tea',
    'Bakery',
    'Sandwiches',
    'Specials',
];

// Order Statuses
export const ORDER_STATUSES = [
    { value: 'draft', label: 'Draft' },
    { value: 'queued', label: 'Queued' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'ready', label: 'Ready' },
    { value: 'served', label: 'Served' },
    { value: 'paid', label: 'Paid' },
];

// Table Configuration
export const TABLE_COUNT = 15;
export const TABLE_CAPACITIES = [2, 4, 6, 8];

// Pricing Configuration
export const DEFAULT_TAX_PERCENTAGE = 5;
export const DEFAULT_SERVICE_CHARGE_PERCENTAGE = 10;
export const DEFAULT_CURRENCY = '₹';

// Time Thresholds
export const ORDER_OVERDUE_THRESHOLD_MINUTES = 10;
export const LOW_STOCK_MULTIPLIER = 1.5; // Alert when stock is 1.5x reorder level

// Roles
export const ROLES: { value: Role; label: string }[] = [
    { value: 'manager', label: 'Manager' },
    { value: 'cashier', label: 'Cashier' },
    { value: 'staff', label: 'Staff' },
];

// Shifts
export const SHIFTS = [
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 12 AM)' },
    { value: 'night', label: 'Night (12 AM - 6 AM)' },
];

// Payment Methods
export const PAYMENT_METHODS = [
    { value: 'cash', label: 'Cash', icon: '💵' },
    { value: 'card', label: 'Card', icon: '💳' },
    { value: 'upi', label: 'UPI', icon: '📱' },
    { value: 'split', label: 'Split Payment', icon: '✂️' },
];

// Units for Inventory
export const INVENTORY_UNITS = ['kg', 'L', 'pcs', 'g', 'ml', 'dozen'];

// Tags for Menu Items
export const MENU_TAGS = [
    'Veg',
    'Vegan',
    'Spicy',
    'Popular',
    'New',
    'Gluten-Free',
    'Dairy-Free',
    'Organic',
];

// Date Range Options for Reports
export const DATE_RANGES = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' },
];
