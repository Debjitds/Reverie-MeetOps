import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { supabase } from '@/db/supabase';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { User, UserRole } from '@/types/types';

export default function UsersPage() {
  const { profile } = useAuth();
  const { t } = useAppTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<UserRole>('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, search]);

  const fetchUsers = async () => {
    setLoading(true);

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setUsers(data);
    }

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...users];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(u =>
        u.name?.toLowerCase().includes(searchLower) ||
        u.email?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setDialogOpen(true);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', selectedUser.id);

    if (error) {
      toast.error(t('toast.userRoleUpdateFailed').replace('{error.message}', error.message));
    } else {
      toast.success(t('toast.userRoleChanged'));
      setDialogOpen(false);
      fetchUsers();
    }
  };

  const getRoleBadge = (role: UserRole) => {
    const variants: Record<UserRole, 'default' | 'secondary' | 'destructive'> = {
      admin: 'default',
      manager: 'secondary',
      user: 'secondary',
    };

    return (
      <Badge variant={variants[role]} className="capitalize">
        {role}
      </Badge>
    );
  };

  if (profile?.role !== 'admin') {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">You do not have permission to access this page.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold border-b-thick border-primary inline-block pb-1">{t('users.title')}</h1>
        </div>

        <div className="space-y-2">
          <Label>{t('common.search')}</Label>
          <Input
            placeholder={t('users.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed">
            <p className="text-muted-foreground">{t('users.noUsers')}</p>
          </div>
        ) : (
          <div className="bg-white border-3 border-black hard-shadow overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary border-b-3 border-black hover:bg-primary">
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('users.name').toUpperCase()}</TableHead>
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('users.email').toUpperCase()}</TableHead>
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('users.role').toUpperCase()}</TableHead>
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('users.joined').toUpperCase()}</TableHead>
                  <TableHead className="text-right font-bold uppercase text-black whitespace-nowrap">{t('users.actions').toUpperCase()}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow 
                    key={user.id}
                    className={index % 2 === 0 ? "bg-white border-b border-black" : "bg-[#FFF8E7] border-b border-black"}
                  >
                    <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                    <TableCell className="whitespace-nowrap">{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="whitespace-nowrap">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(user)}
                        disabled={user.id === profile.id}
                      >
                        {t('users.changeRole')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t('users.changeRoleTitle')}</DialogTitle>
              <DialogDescription>
                {t('users.changeRoleDescription')} {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('users.currentRole')}</Label>
                <p className="text-sm">{getRoleBadge(selectedUser?.role || 'user')}</p>
              </div>
              <div className="space-y-2">
                <Label>{t('users.newRole')}</Label>
                <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">{t('users.user')}</SelectItem>
                    <SelectItem value="manager">{t('users.manager')}</SelectItem>
                    <SelectItem value="admin">{t('users.admin')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleUpdateRole}>
                  {t('users.updateRole')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
