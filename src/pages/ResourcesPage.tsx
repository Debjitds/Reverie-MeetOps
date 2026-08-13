import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { supabase } from '@/db/supabase';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Resource } from '@/types/types';

export default function ResourcesPage() {
  const { profile } = useAuth();
  const { t } = useAppTranslation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    capacity: 1,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setResources(data);
    }
    setLoading(false);
  };

  const handleOpenDialog = (resource?: Resource) => {
    if (resource) {
      setSelectedResource(resource);
      setFormData({
        name: resource.name,
        description: resource.description || '',
        location: resource.location,
        capacity: resource.capacity,
      });
    } else {
      setSelectedResource(null);
      setFormData({
        name: '',
        description: '',
        location: '',
        capacity: 1,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.location || formData.capacity < 1) {
      toast.error(t('toast.requiredField'));
      return;
    }

    if (!profile) return;

    const resourceData = {
      name: formData.name,
      description: formData.description || null,
      location: formData.location,
      capacity: formData.capacity,
      created_by: profile.id,
    };

    if (selectedResource) {
      const { error } = await supabase
        .from('resources')
        .update(resourceData)
        .eq('id', selectedResource.id);

      if (error) {
        toast.error(`Failed to update resource: ${error.message}`);
      } else {
        toast.success(t('toast.resourceUpdated'));
        setDialogOpen(false);
        fetchResources();
      }
    } else {
      const { error } = await supabase
        .from('resources')
        .insert([resourceData]);

      if (error) {
        toast.error(`Failed to create resource: ${error.message}`);
      } else {
        toast.success(t('toast.resourceCreated'));
        setDialogOpen(false);
        fetchResources();
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedResource) return;

    const { data: activeBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('resource_id', selectedResource.id)
      .in('status', ['pending', 'approved']);

    if (activeBookings && activeBookings.length > 0) {
      toast.error(t('resources.deleteWarning'));
      setDeleteDialogOpen(false);
      return;
    }

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', selectedResource.id);

    if (error) {
      toast.error(`Failed to delete resource: ${error.message}`);
    } else {
      toast.success(t('toast.resourceDeleted'));
      setDeleteDialogOpen(false);
      fetchResources();
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('resources.noPermission')}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold border-b-thick border-primary inline-block pb-1">{t('resources.title')}</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                {t('resources.addResource')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedResource ? t('resources.editTitle') : t('resources.addTitle')}</DialogTitle>
                <DialogDescription>
                  {selectedResource ? t('resources.editDescription') : t('resources.addDescription')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('common.name')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('resources.namePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t('common.description')}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t('resources.descriptionPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t('resources.location')} *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={t('resources.locationPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">{t('resources.capacity')} *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                    placeholder={t('resources.capacityPlaceholder')}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    {t('common.cancel')}
                  </Button>
                  <Button type="submit">
                    {selectedResource ? t('resources.update') : t('resources.create')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed">
            <p className="text-muted-foreground">{t('resources.noResources')}</p>
          </div>
        ) : (
          <div className="bg-white border-3 border-black hard-shadow overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary border-b-3 border-black hover:bg-primary">
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('resources.name').toUpperCase()}</TableHead>
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('resources.location').toUpperCase()}</TableHead>
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('resources.capacity').toUpperCase()}</TableHead>
                  <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('resources.description').toUpperCase()}</TableHead>
                  <TableHead className="text-right font-bold uppercase text-black whitespace-nowrap">{t('resources.actions').toUpperCase()}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource, index) => (
                  <TableRow 
                    key={resource.id}
                    className={index % 2 === 0 ? "bg-white border-b border-black" : "bg-[#FFF8E7] border-b border-black"}
                  >
                    <TableCell className="font-medium whitespace-nowrap">{resource.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{resource.location}</TableCell>
                    <TableCell className="whitespace-nowrap">{resource.capacity}</TableCell>
                    <TableCell className="max-w-xs truncate">{resource.description || '-'}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenDialog(resource)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedResource(resource);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('resources.deleteTitle')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('resources.deleteDescription').replace('{name}', selectedResource?.name || '')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>{t('common.delete')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
