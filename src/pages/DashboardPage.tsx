import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/db/supabase';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, Plus, List } from 'lucide-react';
import { AdminInsights } from '@/components/ai/AdminInsights';
import type { Booking, BookingStats } from '@/types/types';
import { formatDateTime } from '@/lib/booking-utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const { t } = useAppTranslation();
  const [stats, setStats] = useState<BookingStats>({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (user && profile) {
      fetchDashboardData();
    } else {
      // No profile (e.g. fetch failed or row missing) — render the empty
      // dashboard instead of spinning forever.
      setLoading(false);
    }
  }, [user, profile, authLoading]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    setLoading(true);

    try {
      let bookingsQuery = supabase
        .from('bookings')
        .select('*, resource:resources(name), user:profiles!bookings_user_id_fkey(name)');

      if (profile.role === 'user') {
        bookingsQuery = bookingsQuery.eq('user_id', profile.id);
      }

      const { data: bookings, error } = await bookingsQuery;

      if (error) {
        console.error('[Dashboard] Failed to load bookings:', error.message);
      } else if (bookings) {
        const now = new Date();
        const upcoming = bookings
          .filter(b => new Date(b.start_time) > now && b.status === 'approved')
          .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
          .slice(0, 5);

        setUpcomingBookings(upcoming);

        setStats({
          total: bookings.length,
          pending: bookings.filter(b => b.status === 'pending').length,
          approved: bookings.filter(b => b.status === 'approved').length,
          rejected: bookings.filter(b => b.status === 'rejected').length,
        });
      }
    } catch (err) {
      console.error('[Dashboard] Unexpected error while loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      cancelled: 'outline',
      completed: 'outline',
    };

    return (
      <Badge variant={variants[status] || 'default'} className="capitalize">
        {t(`bookings.${status}`)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold border-b-thick border-primary inline-block pb-1">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground mt-2">{t('dashboard.welcome')}, {profile?.name}</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.totalBookings')}</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.pendingBookings')}</CardTitle>
              <Calendar className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.approvedBookings')}</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.rejectedBookings')}</CardTitle>
              <Calendar className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t('dashboard.upcomingBookings')}</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">{t('dashboard.noUpcomingBookings')}</p>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-start justify-between border-l-thick border-primary pl-4 gap-2">
                      <div>
                        <p className="font-medium">{booking.resource?.name}</p>
                        <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDateTime(booking.start_time)}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-start sm:self-auto">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/bookings/new">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('dashboard.newBooking')}
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/bookings">
                  <List className="w-4 h-4 mr-2" />
                  {t('dashboard.viewAllBookings')}
                </Link>
              </Button>
              {profile?.role === 'admin' && (
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/resources">
                    <Package className="w-4 h-4 mr-2" />
                    {t('dashboard.manageResources')}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights for Admin */}
        {profile?.role === 'admin' && (
          <div className="mt-6">
            <AdminInsights />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
