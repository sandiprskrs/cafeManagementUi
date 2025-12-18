'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}</h2>
                    <p className="text-sm text-muted-foreground capitalize">
                        Role: {user?.role}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="rounded-full w-10 h-10 p-0"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{user?.email}</span>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}
