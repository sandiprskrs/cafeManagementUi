'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { analyticsService, orderService } from '@/lib/services';
import { ShoppingCart, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
    const kpis = analyticsService.getKPIs();
    const recentOrders = orderService.getAll().slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your cafe operations</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.ordersToday}</div>
                        <p className="text-xs text-muted-foreground">Total orders processed</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(kpis.revenueToday)}</div>
                        <p className="text-xs text-muted-foreground">From paid orders</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tables</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.activeTables}</div>
                        <p className="text-xs text-muted-foreground">Currently occupied</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-warning" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-warning">{kpis.lowStockItems}</div>
                        <p className="text-xs text-muted-foreground">Need reordering</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                            >
                                <div>
                                    <p className="font-medium">
                                        {order.tableId ? `Table ${order.tableId.replace('table-', '')}` : 'Takeaway'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.items.length} items • {formatCurrency(order.total)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${order.status === 'paid'
                                                ? 'bg-success/10 text-success'
                                                : order.status === 'ready'
                                                    ? 'bg-info/10 text-info'
                                                    : 'bg-warning/10 text-warning'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
