'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { menuService } from '@/lib/services';
import { formatCurrency } from '@/lib/utils';
import { MENU_CATEGORIES } from '@/lib/constants';
import { MenuCategory, MenuItem } from '@/types';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { showDeleteConfirm, showToast } from '@/lib/sweetalert';

export default function MenuPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');
    const [menuItems, setMenuItems] = useState(menuService.getAll());

    const filteredItems = menuItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleToggleAvailability = (id: string) => {
        const item = menuItems.find(i => i.id === id);
        menuService.toggleAvailability(id);
        setMenuItems(menuService.getAll());
        showToast(
            item?.isAvailable ? 'Item marked as unavailable' : 'Item marked as available',
            'success'
        );
    };

    const handleDelete = async (id: string, itemName: string) => {
        const result = await showDeleteConfirm(itemName);
        if (result.isConfirmed) {
            menuService.delete(id);
            setMenuItems(menuService.getAll());
            showToast('Menu item deleted successfully', 'success');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Menu Management</h1>
                    <p className="text-muted-foreground">Manage your cafe menu items</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Item
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search menu items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant={selectedCategory === 'All' ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory('All')}
                            >
                                All
                            </Button>
                            {MENU_CATEGORIES.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover-lift transition-smooth">
                        <div className="aspect-video bg-gradient-primary relative">
                            <div className="absolute top-2 right-2">
                                <Badge variant={item.isAvailable ? 'success' : 'destructive'}>
                                    {item.isAvailable ? 'Available' : 'Out of Stock'}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="pt-4 space-y-3">
                            <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-primary">
                                    {formatCurrency(item.price)}
                                </span>
                                <Badge variant="outline">{item.category}</Badge>
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleToggleAvailability(item.id)}
                                >
                                    {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(item.id, item.name)}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <Card>
                    <CardContent className="py-12">
                        <p className="text-center text-muted-foreground">
                            No menu items found matching your criteria
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
