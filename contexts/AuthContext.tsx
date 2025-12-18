'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState, Role } from '@/types';
import { DEMO_CREDENTIALS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface AuthContextType extends AuthState {
    login: (email: string, password: string, role: Role) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });

    const login = (email: string, password: string, role: Role): boolean => {
        // Simple demo authentication
        const credentials = DEMO_CREDENTIALS[role];

        if (email === credentials.email && password === credentials.password) {
            const user: User = {
                id: generateId(),
                email: credentials.email,
                name: credentials.name,
                role: credentials.role,
            };

            setAuthState({
                user,
                isAuthenticated: true,
            });

            // Store in sessionStorage
            sessionStorage.setItem('cafe-user', JSON.stringify(user));

            return true;
        }

        return false;
    };

    const logout = () => {
        setAuthState({
            user: null,
            isAuthenticated: false,
        });
        sessionStorage.removeItem('cafe-user');
    };

    // Check for existing session on mount
    React.useEffect(() => {
        const storedUser = sessionStorage.getItem('cafe-user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser) as User;
                setAuthState({
                    user,
                    isAuthenticated: true,
                });
            } catch (error) {
                console.error('Failed to parse stored user:', error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
