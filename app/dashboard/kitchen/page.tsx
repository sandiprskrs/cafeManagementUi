'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { orderService } from '@/lib/services';
import { OrderStatus } from '@/types';
import { formatCurrency, formatRelativeTime, isOrderOverdue } from '@/lib/utils';
import { Clock } from 'lucide-react';

const statusColumns: { status: OrderStatus; label: string }[] = [
    { status: 'queued', label: 'Queued' },
    { status: 'in-progress', label: 'In Progress' },
    { status: 'ready', label: 'Ready' },
    { status: 'served', label: 'Served' },
];

export default function KitchenPage() {
    const [orders, setOrders] = useState(orderService.getActive());

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        orderService.updateStatus(orderId, newStatus);
        setOrders(orderService.getActive());
    };

    const getOrdersByStatus = (status: OrderStatus) => {
        return orders.filter((order) => order.status === status);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold">Kitchen Display</h1>
                <p className="text-muted-foreground">Manage order preparation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statusColumns.map(({ status, label }) => (
                    <div key={status} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{label}</h3>
                            <Badge variant="outline">{getOrdersByStatus(status).length}</Badge>
                        </div>

                        <div className="space-y-3">
                            {getOrdersByStatus(status).map((order) => {
                                const isOverdue = isOrderOverdue(order.createdAt);

                                return (
                                    <Card
                                        key={order.id}
                                        className={`${isOverdue && status === 'queued'
                                                ? 'border-destructive bg-destructive/5'
                                                : ''
                                            }`}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-base">
                                                    {order.tableId
                                                        ? `Table ${order.tableId.replace('table-', '')}`
                                                        : 'Takeaway'}
                                                </CardTitle>
                                                {isOverdue && status === 'queued' && (
                                                    <Badge variant="destructive" className="text-xs">
                                                        Overdue
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {formatRelativeTime(order.createdAt)}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="text-sm">
                                                        <span className="font-medium">{item.quantity}x</span>{' '}
                                                        {item.menuItem.name}
                                                        {item.notes && (
                                                            <p className="text-xs text-muted-foreground italic">
                                                                Note: {item.notes}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {status !== 'served' && (
                                                <Button
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => {
                                                        const nextStatus =
                                                            status === 'queued'
                                                                ? 'in-progress'
                                                                : status === 'in-progress'
                                                                    ? 'ready'
                                                                    : 'served';
                                                        handleStatusChange(order.id, nextStatus);
                                                    }}
                                                >
                                                    {status === 'queued'
                                                        ? 'Start Preparing'
                                                        : status === 'in-progress'
                                                            ? 'Mark Ready'
                                                            : 'Mark Served'}
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            {getOrdersByStatus(status).length === 0 && (
                                <Card>
                                    <CardContent className="py-8">
                                        <p className="text-sm text-muted-foreground text-center">
                                            No orders
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
