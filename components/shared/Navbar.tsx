'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, LogOut, User, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="border-b border-border bg-card px-4 md:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold line-clamp-1">
                            Welcome, {user?.name?.split(' ')[0]}
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground capitalize hidden xs:block">
                            Role: {user?.role}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="rounded-full w-9 h-9 md:w-10 md:h-10 p-0"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                            <Moon className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                    </Button>

                    <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{user?.email}</span>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleLogout} className="whitespace-nowrap">
                        <LogOut className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
