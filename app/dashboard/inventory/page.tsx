'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { inventoryService } from '@/lib/services';
import { Plus, Minus } from 'lucide-react';

export default function InventoryPage() {
    const [inventory, setInventory] = useState(inventoryService.getAll());

    const handleStockUpdate = (id: string, change: number) => {
        inventoryService.updateStock(id, change);
        setInventory(inventoryService.getAll());
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            ok: 'success',
            low: 'warning',
            critical: 'destructive',
        } as const;
        return variants[status as keyof typeof variants] || 'default';
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Inventory Management</h1>
                    <p className="text-muted-foreground">Track and manage stock levels</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                </Button>
            </div>

            <div className="grid gap-4">
                {inventory.map((item) => (
                    <Card key={item.id}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <Badge variant={getStatusBadge(item.status)}>
                                            {item.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Supplier: {item.supplier}
                                    </p>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Current Stock</p>
                                        <p className="text-2xl font-bold">
                                            {item.currentStock} {item.unit}
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Reorder Level</p>
                                        <p className="text-lg font-medium">
                                            {item.reorderLevel} {item.unit}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleStockUpdate(item.id, -1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleStockUpdate(item.id, 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {item.status !== 'ok' && (
                                <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                                    <p className="text-sm text-warning">
                                        {item.status === 'critical'
                                            ? '⚠️ Critical: Stock is very low. Order immediately!'
                                            : '⚡ Low stock: Consider reordering soon.'}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
