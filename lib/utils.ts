import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance, formatRelative } from 'date-fns';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format currency values
 */
export function formatCurrency(amount: number, currency: string = '₹'): string {
    return `${currency}${amount.toFixed(2)}`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date, formatStr: string = 'PPP'): string {
    return format(date, formatStr);
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
    return formatDistance(date, new Date(), { addSuffix: true });
}

/**
 * Format date to relative description (e.g., "today at 3:00 PM")
 */
export function formatRelativeDate(date: Date): string {
    return formatRelative(date, new Date());
}

/**
 * Format time from Date object
 */
export function formatTime(date: Date): string {
    return format(date, 'HH:mm');
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return (value / total) * 100;
}

/**
 * Generate a random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Get status color for badges
 */
export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        // Order statuses
        draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        queued: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        ready: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        served: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',

        // Table statuses
        free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        occupied: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        reserved: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        billing: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',

        // Stock statuses
        ok: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',

        // Purchase order statuses
        pending: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        ordered: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };

    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Check if order is overdue (more than specified minutes)
 */
export function isOrderOverdue(createdAt: Date, thresholdMinutes: number = 10): boolean {
    const now = new Date();
    const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
    return diffMinutes > thresholdMinutes;
}
