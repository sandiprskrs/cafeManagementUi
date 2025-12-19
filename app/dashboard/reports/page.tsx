'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { analyticsService } from '@/lib/services';
import { formatCurrency } from '@/lib/utils';
import { Download } from 'lucide-react';

export default function ReportsPage() {
    const kpis = analyticsService.getKPIs();
    const topItems = analyticsService.getTopSellingItems();
    const categorySales = analyticsService.getCategorySales();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Business insights and performance metrics</p>
                </div>
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* KPI Summary */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Orders Today
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{kpis.ordersToday}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Revenue Today
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{formatCurrency(kpis.revenueToday)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Tables
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{kpis.activeTables}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg Order Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {formatCurrency(kpis.ordersToday > 0 ? kpis.revenueToday / kpis.ordersToday : 0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Top Selling Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topItems.map((item, index) => (
                                <div key={item.item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.quantity} sold
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{formatCurrency(item.revenue)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Category Sales */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categorySales.map((cat) => (
                                <div key={cat.category} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{cat.category}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {cat.orders} orders • {formatCurrency(cat.sales)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{
                                                width: `${(cat.sales / Math.max(...categorySales.map((c) => c.sales))) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
