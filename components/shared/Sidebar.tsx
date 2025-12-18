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

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow border-r border-border bg-card overflow-y-auto">
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
    );
}
