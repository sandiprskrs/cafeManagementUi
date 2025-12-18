'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    ShoppingCart,
    ChefHat,
    Coffee,
    Package,
    Users,
    BarChart3,
    Settings,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders / POS', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Kitchen', href: '/dashboard/kitchen', icon: ChefHat },
    { name: 'Menu', href: '/dashboard/menu', icon: Coffee },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { name: 'Staff', href: '/dashboard/staff', icon: Users },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({
    isOpen,
    onClose
}: {
    isOpen?: boolean;
    onClose?: () => void;
}) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-full md:border-r",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-6 py-5 border-b border-border">
                        <Coffee className="h-8 w-8 text-primary" />
                        <span className="ml-2 text-xl font-bold">Cafe Manager</span>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all',
                                        isActive
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            'mr-3 h-5 w-5 flex-shrink-0',
                                            isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                                        )}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
}
