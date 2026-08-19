import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Eye, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import type { Booking, User } from '@/types/types';
import { formatDateTime, formatDate, formatDateOnly, formatTime } from '@/lib/booking-utils';
import { exportBookingsToPDF } from '@/lib/pdf-export';

export default function BookingsPage() {
  const { profile } = useAuth();
  const { t } = useAppTranslation();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [filteredActiveBookings, setFilteredActiveBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pastBookingsPage, setPastBookingsPage] = useState(1);
  const pastBookingsPerPage = 10;
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFilters, setExportFilters] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    resources: [] as string[],
    statuses: [] as string[],
  });
  
  const [filters, setFilters] = useState({
    status: 'all',
    userId: 'all',
    search: '',
  });

  useEffect(() => {
    updateBookingStatuses();
  }, [profile]);

  useEffect(() => {
    applyFilters();
  }, [activeBookings, filters]);

  const updateBookingStatuses = async () => {
    // Call Edge Function to auto-complete expired approved bookings
    try {
      const { data, error } = await supabase.functions.invoke('update-booking-statuses');
      
      if (error) {
        console.error('Error updating booking statuses:', error);
      } else if (data?.updated_count > 0) {
        console.log(`Auto-completed ${data.updated_count} expired booking(s)`);
      }
    } catch (error) {
      console.error('Failed to update booking statuses:', error);
    }
    
    // Fetch bookings after status update
    fetchBookings();
    if (profile?.role === 'admin' || profile?.role === 'manager') {
      fetchUsers();
    }
  };

  const fetchBookings = async () => {
    if (!profile) return;

    setLoading(true);

    // Fetch active bookings (pending, approved, rejected, cancelled)
    let activeQuery = supabase
      .from('bookings')
      .select(`
        *,
        resource:resources(name, location),
        user:profiles!bookings_user_id_fkey(name, email),
        reviewer:profiles!bookings_reviewed_by_fkey(name)
      `)
      .in('status', ['pending', 'approved', 'rejected', 'cancelled'])
      .order('created_at', { ascending: false });

    if (profile.role === 'user') {
      activeQuery = activeQuery.eq('user_id', profile.id);
    }

    const { data: activeData } = await activeQuery;

    if (activeData) {
      setActiveBookings(activeData);
    }

    // Fetch past bookings (completed)
    let pastQuery = supabase
      .from('bookings')
      .select(`
        *,
        resource:resources(name, location),
        user:profiles!bookings_user_id_fkey(name, email),
        reviewer:profiles!bookings_reviewed_by_fkey(name)
      `)
      .eq('status', 'completed')
      .order('end_time', { ascending: false });

    if (profile.role === 'user') {
      pastQuery = pastQuery.eq('user_id', profile.id);
    }

    const { data: pastData } = await pastQuery;

    if (pastData) {
      setPastBookings(pastData);
    }

    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, name, email, role, created_at')
      .order('name');

    if (data) {
      setUsers(data);
    }
  };

  const applyFilters = () => {
    let filtered = [...activeBookings];

    if (filters.status !== 'all') {
      filtered = filtered.filter(b => b.status === filters.status);
    }

    if (filters.userId !== 'all') {
      filtered = filtered.filter(b => b.user_id === filters.userId);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(b =>
        b.resource?.name.toLowerCase().includes(searchLower) ||
        b.purpose.toLowerCase().includes(searchLower) ||
        b.user?.name?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredActiveBookings(filtered);
  };

  const handleExportPDF = () => {
    if (!exportFilters.startDate || !exportFilters.endDate) {
      toast.error(t('bookings.exportDatesRequired'));
      return;
    }

    // Combine active and past bookings for export
    const allBookings = [...activeBookings, ...pastBookings];

    // Filter bookings based on export filters
    let exportBookings = [...allBookings];

    // Filter by date range
    exportBookings = exportBookings.filter(b => {
      const bookingDate = new Date(b.start_time);
      return bookingDate >= exportFilters.startDate! && bookingDate <= exportFilters.endDate!;
    });

    // Filter by resources if selected
    if (exportFilters.resources.length > 0) {
      exportBookings = exportBookings.filter(b =>
        exportFilters.resources.includes(b.resource?.name || '')
      );
    }

    // Filter by statuses if selected
    if (exportFilters.statuses.length > 0) {
      exportBookings = exportBookings.filter(b =>
        exportFilters.statuses.includes(b.status)
      );
    }

    if (exportBookings.length === 0) {
      toast.error(t('bookings.noBookingsForFilters'));
      return;
    }

    // Prepare filter summary for PDF
    const filterSummary = {
      dateRange: {
        start: formatDate(exportFilters.startDate),
        end: formatDate(exportFilters.endDate),
      },
      resources: exportFilters.resources,
      statuses: exportFilters.statuses,
    };

    exportBookingsToPDF(exportBookings, filterSummary, profile?.name || 'User');
    toast.success(t('bookings.exportSuccess').replace('{count}', String(exportBookings.length)));
    setExportDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      cancelled: 'outline',
      completed: 'outline',
    };

    const statusLabels: Record<string, string> = {
      pending: t('bookings.pending'),
      approved: t('bookings.approved'),
      rejected: t('bookings.rejected'),
      cancelled: t('bookings.cancelled'),
      completed: t('bookings.completed'),
    };

    // Special styling for completed status
    if (status === 'completed') {
      return (
        <Badge variant="outline" className="bg-white border-2 border-black uppercase font-bold">
          {statusLabels[status] || status}
        </Badge>
      );
    }

    return (
      <Badge variant={variants[status] || 'default'} className="capitalize">
        {statusLabels[status] || status}
      </Badge>
    );
  };

  const getBookingTypeBadge = (bookingType: string) => {
    return bookingType === 'multi_day' ? (
      <Badge variant="outline" className="bg-accent">{t('bookings.multiDay')}</Badge>
    ) : null;
  };

  const formatBookingDate = (booking: Booking) => {
    if (booking.booking_type === 'multi_day' && booking.booking_group_id) {
      // For multi-day bookings, show date range
      return `${formatDateOnly(booking.start_time)} - ${formatDateOnly(booking.end_time)}`;
    }
    return formatDateOnly(booking.start_time);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold border-b-thick border-primary inline-block pb-1">{t('bookings.title')}</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <FileDown className="w-4 h-4 mr-2" />
                  {t('bookings.exportPDF')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t('bookings.exportTitle')}</DialogTitle>
                  <DialogDescription>
                    {t('bookings.exportDescription')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t('bookings.startDate')} *</Label>
                      <Calendar
                        mode="single"
                        selected={exportFilters.startDate}
                        onSelect={(date) => setExportFilters({ ...exportFilters, startDate: date })}
                        className="border-2 w-fit"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('bookings.endDate')} *</Label>
                      <Calendar
                        mode="single"
                        selected={exportFilters.endDate}
                        onSelect={(date) => setExportFilters({ ...exportFilters, endDate: date })}
                        disabled={(date) => !exportFilters.startDate || date < exportFilters.startDate}
                        className="border-2 w-fit"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                      {t('bookings.cancelButton')}
                    </Button>
                    <Button onClick={handleExportPDF}>
                      {t('bookings.exportButton')}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/bookings/new">
                <Plus className="w-4 h-4 mr-2" />
                {t('bookings.newBooking')}
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>{t('bookings.status')}</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('bookings.allStatuses')}</SelectItem>
                <SelectItem value="pending">{t('bookings.pending')}</SelectItem>
                <SelectItem value="approved">{t('bookings.approved')}</SelectItem>
                <SelectItem value="rejected">{t('bookings.rejected')}</SelectItem>
                <SelectItem value="cancelled">{t('bookings.cancelled')}</SelectItem>
                <SelectItem value="completed">{t('bookings.completed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(profile?.role === 'admin' || profile?.role === 'manager') && (
            <div className="space-y-2">
              <Label>{t('bookings.user')}</Label>
              <Select value={filters.userId} onValueChange={(value) => setFilters({ ...filters, userId: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('bookings.allUsers')}</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2 md:col-span-2">
            <Label>{t('bookings.search')}</Label>
            <Input
              placeholder={t('bookings.searchPlaceholder')}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            {/* ACTIVE BOOKINGS SECTION */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-b-4 border-black inline-block pb-1">
                {t('bookings.activeBookings').toUpperCase()} ({filteredActiveBookings.length})
              </h2>
              
              {filteredActiveBookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed">
                  <p className="text-muted-foreground">{t('bookings.noActiveBookings')}</p>
                </div>
              ) : (
                <div className="bg-white border-3 border-black hard-shadow overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary border-b-3 border-black hover:bg-primary">
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.resource').toUpperCase()}</TableHead>
                        {(profile?.role === 'admin' || profile?.role === 'manager') && (
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.user').toUpperCase()}</TableHead>
                        )}
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.purpose').toUpperCase()}</TableHead>
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.date').toUpperCase()}</TableHead>
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.startTime').toUpperCase()}</TableHead>
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.endTime').toUpperCase()}</TableHead>
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.type').toUpperCase()}</TableHead>
                        <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('common.status').toUpperCase()}</TableHead>
                        <TableHead className="text-right font-bold uppercase text-black whitespace-nowrap">{t('bookings.actions').toUpperCase()}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveBookings.map((booking, index) => (
                        <TableRow 
                          key={booking.id}
                          className={index % 2 === 0 ? "bg-white border-b border-black" : "bg-[#FFF8E7] border-b border-black"}
                        >
                          <TableCell className="font-medium whitespace-nowrap">
                            <div>
                              <p>{booking.resource?.name}</p>
                              <p className="text-xs text-muted-foreground">{booking.resource?.location}</p>
                            </div>
                          </TableCell>
                          {(profile?.role === 'admin' || profile?.role === 'manager') && (
                            <TableCell className="whitespace-nowrap">{booking.user?.name}</TableCell>
                          )}
                          <TableCell className="max-w-xs truncate">{booking.purpose}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">{formatBookingDate(booking)}</TableCell>
                          <TableCell className="text-sm font-medium whitespace-nowrap">{formatTime(booking.start_time)}</TableCell>
                          <TableCell className="text-sm font-medium whitespace-nowrap">{formatTime(booking.end_time)}</TableCell>
                          <TableCell className="whitespace-nowrap">{getBookingTypeBadge(booking.booking_type)}</TableCell>
                          <TableCell className="whitespace-nowrap">{getStatusBadge(booking.status)}</TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/bookings/${booking.id}`}>
                                <Eye className="w-4 h-4 mr-1" />
                                {t('bookings.view')}
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <div className="my-8 border-t-4 border-black"></div>

            {/* PAST BOOKINGS SECTION */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-b-4 border-black inline-block pb-1">
                {t('bookings.pastBookings').toUpperCase()} ({pastBookings.length})
              </h2>
              
              {pastBookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed">
                  <p className="text-muted-foreground">{t('bookings.noPastBookings')}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white border-3 border-black hard-shadow overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary border-b-3 border-black hover:bg-secondary">
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.resource').toUpperCase()}</TableHead>
                          {(profile?.role === 'admin' || profile?.role === 'manager') && (
                            <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.user').toUpperCase()}</TableHead>
                          )}
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.purpose').toUpperCase()}</TableHead>
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.date').toUpperCase()}</TableHead>
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.startTime').toUpperCase()}</TableHead>
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('bookings.endTime').toUpperCase()}</TableHead>
                          <TableHead className="font-bold uppercase text-black whitespace-nowrap">{t('common.status').toUpperCase()}</TableHead>
                          <TableHead className="text-right font-bold uppercase text-black whitespace-nowrap">{t('bookings.actions').toUpperCase()}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastBookings
                          .slice((pastBookingsPage - 1) * pastBookingsPerPage, pastBookingsPage * pastBookingsPerPage)
                          .map((booking, index) => (
                            <TableRow 
                              key={booking.id}
                              className={index % 2 === 0 ? "bg-white border-b border-black" : "bg-[#FFF8E7] border-b border-black"}
                            >
                              <TableCell className="font-medium whitespace-nowrap">
                                <div>
                                  <p>{booking.resource?.name}</p>
                                  <p className="text-xs text-muted-foreground">{booking.resource?.location}</p>
                                </div>
                              </TableCell>
                              {(profile?.role === 'admin' || profile?.role === 'manager') && (
                                <TableCell className="whitespace-nowrap">{booking.user?.name}</TableCell>
                              )}
                              <TableCell className="max-w-xs truncate">{booking.purpose}</TableCell>
                              <TableCell className="text-sm whitespace-nowrap">{formatBookingDate(booking)}</TableCell>
                              <TableCell className="text-sm font-medium whitespace-nowrap">{formatTime(booking.start_time)}</TableCell>
                              <TableCell className="text-sm font-medium whitespace-nowrap">{formatTime(booking.end_time)}</TableCell>
                              <TableCell className="whitespace-nowrap">{getStatusBadge(booking.status)}</TableCell>
                              <TableCell className="text-right whitespace-nowrap">
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/bookings/${booking.id}`}>
                                    <Eye className="w-4 h-4 mr-1" />
                                    {t('bookings.viewDetails')}
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination for Past Bookings */}
                  {pastBookings.length > pastBookingsPerPage && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPastBookingsPage(p => Math.max(1, p - 1))}
                        disabled={pastBookingsPage === 1}
                        className="w-full sm:w-auto"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {t('bookings.previous')}
                      </Button>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {t('bookings.page')} {pastBookingsPage} {t('bookings.of')} {Math.ceil(pastBookings.length / pastBookingsPerPage)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPastBookingsPage(p => Math.min(Math.ceil(pastBookings.length / pastBookingsPerPage), p + 1))}
                        disabled={pastBookingsPage >= Math.ceil(pastBookings.length / pastBookingsPerPage)}
                        className="w-full sm:w-auto"
                      >
                        {t('bookings.next')}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
