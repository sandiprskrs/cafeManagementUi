'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/contexts/ThemeContext';
import { Save } from 'lucide-react';
import { showSuccess } from '@/lib/sweetalert';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage cafe configuration</p>
            </div>

            {/* Business Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cafe Name</label>
                            <Input defaultValue="The Coffee House" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <Input defaultValue="+91 98765 43210" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input defaultValue="123 Main Street, City, State 12345" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" defaultValue="contact@coffeehouse.com" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Opening Time</label>
                            <Input type="time" defaultValue="08:00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Closing Time</label>
                            <Input type="time" defaultValue="22:00" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pricing Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Pricing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tax Percentage (%)</label>
                            <Input type="number" defaultValue="5" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Currency</label>
                            <Input defaultValue="₹" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <p className="font-medium">Service Charge</p>
                            <p className="text-sm text-muted-foreground">
                                Add service charge to orders
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Theme</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setTheme('light')}
                                className={`flex-1 p-4 rounded-lg border-2 transition-all ${theme === 'light'
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">☀️</div>
                                    <p className="font-medium">Light</p>
                                </div>
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`flex-1 p-4 rounded-lg border-2 transition-all ${theme === 'dark'
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🌙</div>
                                    <p className="font-medium">Dark</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                </Button>
            </div>
        </div>
    );
}
