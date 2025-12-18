'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { staffService } from '@/lib/services';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function StaffPage() {
    const [staff, setStaff] = useState(staffService.getAll());

    const handleToggleActive = (id: string) => {
        staffService.toggleActive(id);
        setStaff(staffService.getAll());
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this staff member?')) {
            staffService.delete(id);
            setStaff(staffService.getAll());
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Staff Management</h1>
                    <p className="text-muted-foreground">Manage your team members</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff Member
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {staff.map((member) => (
                    <Card key={member.id}>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground capitalize">
                                            {member.role}
                                        </p>
                                    </div>
                                    <Badge variant={member.isActive ? 'success' : 'destructive'}>
                                        {member.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">Email:</span>
                                        <span>{member.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">Phone:</span>
                                        <span>{member.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">Shift:</span>
                                        <span className="capitalize">{member.shift}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleToggleActive(member.id)}
                                    >
                                        {member.isActive ? 'Deactivate' : 'Activate'}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(member.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
