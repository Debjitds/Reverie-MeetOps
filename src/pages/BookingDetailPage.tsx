import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { supabase } from '@/db/supabase';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowLeft, Check, X, Ban } from 'lucide-react';
import { toast } from 'sonner';
import type { Booking } from '@/types/types';
import { formatDateTime } from '@/lib/booking-utils';

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { t } = useAppTranslation();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  const fetchBooking = async () => {
    if (!id) return;

    setLoading(true);

    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        resource:resources(name, location, capacity),
        user:profiles!bookings_user_id_fkey(name, email),
        reviewer:profiles!bookings_reviewed_by_fkey(name)
      `)
      .eq('id', id)
      .maybeSingle();

    if (data) {
      setBooking(data);
    } else {
      toast.error(t('common.notFound'));
      navigate('/bookings');
    }

    setLoading(false);
  };

  const handleApprove = async () => {
    if (!booking || !profile) return;

    setActionLoading(true);

    // Debug: Log booking times before approval
    console.log('Before approval:', {
      bookingId: booking.id,
      bookingGroupId: booking.booking_group_id,
      bookingType: booking.booking_type,
      startTime: booking.start_time,
      endTime: booking.end_time,
      parsedStart: new Date(booking.start_time).toLocaleString(),
      parsedEnd: new Date(booking.end_time).toLocaleString(),
    });

    // Check if this is a multi-day booking
    if (booking.booking_group_id) {
      // Approve all bookings in the group
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'approved',
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('booking_group_id', booking.booking_group_id);

      if (error) {
        toast.error(`Failed to approve multi-day booking: ${error.message}`);
      } else {
        await supabase.from('notifications').insert([{
          user_id: booking.user_id,
          booking_id: booking.id,
          type: 'booking_approved',
          message: `Your multi-day booking for ${booking.resource?.name} has been approved`,
        }]);

        toast.success(t('toast.bookingApproved'));
        fetchBooking();
      }
    } else {
      // Single booking approval
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'approved',
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', booking.id);

      if (error) {
        toast.error(`Failed to approve booking: ${error.message}`);
      } else {
        await supabase.from('notifications').insert([{
          user_id: booking.user_id,
          booking_id: booking.id,
          type: 'booking_approved',
          message: `Your booking for ${booking.resource?.name} has been approved`,
        }]);

        toast.success(t('toast.bookingApproved'));
        
        // Fetch updated booking to verify times weren't changed
        const { data: updatedBooking } = await supabase
          .from('bookings')
          .select(`
            *,
            resource:resources(name, location, capacity),
            user:profiles!bookings_user_id_fkey(name, email),
            reviewer:profiles!bookings_reviewed_by_fkey(name)
          `)
          .eq('id', booking.id)
          .maybeSingle();

        // Debug: Log booking times after approval
        if (updatedBooking) {
          console.log('After approval:', {
            bookingId: updatedBooking.id,
            startTime: updatedBooking.start_time,
            endTime: updatedBooking.end_time,
            parsedStart: new Date(updatedBooking.start_time).toLocaleString(),
            parsedEnd: new Date(updatedBooking.end_time).toLocaleString(),
            timesMatch: updatedBooking.start_time === booking.start_time && updatedBooking.end_time === booking.end_time,
          });
        }

        fetchBooking();
      }
    }

    setActionLoading(false);
  };

  const handleReject = async () => {
    if (!booking || !profile) return;

    setActionLoading(true);

    // Check if this is a multi-day booking
    if (booking.booking_group_id) {
      // Reject all bookings in the group
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'rejected',
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('booking_group_id', booking.booking_group_id);

      if (error) {
        toast.error(`Failed to reject multi-day booking: ${error.message}`);
      } else {
        const message = rejectReason 
          ? `Your multi-day booking for ${booking.resource?.name} has been rejected. Reason: ${rejectReason}`
          : `Your multi-day booking for ${booking.resource?.name} has been rejected`;

        await supabase.from('notifications').insert([{
          user_id: booking.user_id,
          booking_id: booking.id,
          type: 'booking_rejected',
          message,
        }]);

        toast.success(t('toast.bookingRejected'));
        fetchBooking();
      }
    } else {
      // Single booking rejection
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'rejected',
          reviewed_by: profile.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', booking.id);

      if (error) {
        toast.error(`Failed to reject booking: ${error.message}`);
      } else {
        const message = rejectReason 
          ? `Your booking for ${booking.resource?.name} has been rejected. Reason: ${rejectReason}`
          : `Your booking for ${booking.resource?.name} has been rejected`;

        await supabase.from('notifications').insert([{
          user_id: booking.user_id,
          booking_id: booking.id,
          type: 'booking_rejected',
          message,
        }]);

        toast.success(t('toast.bookingRejected'));
        setRejectDialogOpen(false);
        setRejectReason('');
        fetchBooking();
      }
    }

    setActionLoading(false);
  };

  const handleCancel = async () => {
    if (!booking || !profile) return;

    setActionLoading(true);

    // Check if this is a multi-day booking
    if (booking.booking_group_id) {
      // Cancel all bookings in the group
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('booking_group_id', booking.booking_group_id);

      if (error) {
        toast.error(`Failed to cancel multi-day booking: ${error.message}`);
      } else {
        const { data: managers } = await supabase
          .from('profiles')
          .select('id')
          .in('role', ['manager', 'admin']);

        if (managers) {
          const notifications = managers.map(manager => ({
            user_id: manager.id,
            booking_id: booking.id,
            type: 'booking_cancelled' as const,
            message: `Multi-day booking for ${booking.resource?.name} by ${booking.user?.name} has been cancelled`,
          }));

          await supabase.from('notifications').insert(notifications);
        }

        toast.success(t('toast.bookingCancelled'));
        fetchBooking();
      }
    } else {
      // Single booking cancellation
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', booking.id);

      if (error) {
        toast.error(`Failed to cancel booking: ${error.message}`);
      } else {
        const { data: managers } = await supabase
          .from('profiles')
          .select('id')
          .in('role', ['manager', 'admin']);

        if (managers) {
          const notifications = managers.map(manager => ({
            user_id: manager.id,
            booking_id: booking.id,
            type: 'booking_cancelled' as const,
            message: `Booking for ${booking.resource?.name} by ${booking.user?.name} has been cancelled`,
          }));

          await supabase.from('notifications').insert(notifications);
        }

        toast.success(t('toast.bookingCancelled'));
        setCancelDialogOpen(false);
        fetchBooking();
      }
    }

    setActionLoading(false);
  };

  const canApproveReject = profile && (profile.role === 'admin' || profile.role === 'manager') && booking?.status === 'pending';
  const canCancel = profile && booking && (
    (profile.id === booking.user_id && (booking.status === 'pending' || booking.status === 'approved')) ||
    (profile.role === 'admin' || profile.role === 'manager')
  );

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
        {status}
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

  if (!booking) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Booking not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/bookings')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold border-b-thick border-primary inline-block pb-1">{	('bookingDetails.title')}</h1>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Information</CardTitle>
              {getStatusBadge(booking.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-muted-foreground">{	('bookingDetails.resource')}</Label>
                <p className="font-medium">{booking.resource?.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{	('bookingDetails.location')}</Label>
                <p className="font-medium">{booking.resource?.location}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{	('resources.capacity')}</Label>
                <p className="font-medium">{booking.resource?.capacity} people</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{	('bookingDetails.bookedBy')}</Label>
                <p className="font-medium">{booking.user?.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{	('bookingDetails.startTime')}</Label>
                <p className="font-medium">{formatDateTime(booking.start_time)}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{	('bookingDetails.endTime')}</Label>
                <p className="font-medium">{formatDateTime(booking.end_time)}</p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">{	('bookingDetails.purpose')}</Label>
              <p className="font-medium">{booking.purpose}</p>
            </div>

            {booking.attendees && booking.attendees.length > 0 && (
              <div>
                <Label className="text-muted-foreground">{	('bookingDetails.attendees')}</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {booking.attendees.map((attendee, index) => (
                    <Badge key={index} variant="outline">{attendee}</Badge>
                  ))}
                </div>
              </div>
            )}

            {booking.reviewed_by && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">{	('bookingDetails.reviewedBy')}</Label>
                  <p className="font-medium">{booking.reviewer?.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">{	('bookingDetails.reviewedAt')}</Label>
                  <p className="font-medium">{booking.reviewed_at ? formatDateTime(booking.reviewed_at) : '-'}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {canApproveReject && (
                <>
                  <Button onClick={handleApprove} disabled={actionLoading}>
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => setRejectDialogOpen(true)} disabled={actionLoading}>
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
              {canCancel && booking.status !== 'cancelled' && (
                <Button variant="outline" onClick={() => setCancelDialogOpen(true)} disabled={actionLoading}>
                  <Ban className="w-4 h-4 mr-2" />
                  Cancel Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{	('bookingDetails.cancelBooking')}</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, keep it</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancel}>Yes, cancel booking</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{	('bookingDetails.reject')}</AlertDialogTitle>
              <AlertDialogDescription>
                Please provide a reason for rejecting this booking (optional).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReject}>{	('bookingDetails.reject')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
