import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { supabase } from '@/db/supabase';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS, hi, bn, ta, es, fr, ar, zhCN, ja, de } from 'date-fns/locale';
import type { Booking } from '@/types/types';
import { formatDateTime } from '@/lib/booking-utils';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Map language codes to date-fns locales
const dateFnsLocales = {
  en: enUS,
  hi: hi,
  bn: bn,
  ta: ta,
  es: es,
  fr: fr,
  ar: ar,
  zh: zhCN,
  ja: ja,
  de: de,
};

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Booking;
}

export default function CalendarPage() {
  const { profile } = useAuth();
  const { currentLanguage } = useLanguage();
  const { t } = useAppTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Create localizer with current language locale
  const localizer = useMemo(() => {
    const currentLocale = dateFnsLocales[currentLanguage] || enUS;
    
    return dateFnsLocalizer({
      format: (date: Date, formatStr: string) => 
        format(date, formatStr, { locale: currentLocale }),
      parse: (str: string, formatStr: string) => 
        parse(str, formatStr, new Date(), { locale: currentLocale }),
      startOfWeek: (date: Date) => 
        startOfWeek(date, { locale: currentLocale }),
      getDay,
      locales: { [currentLanguage]: currentLocale },
    });
  }, [currentLanguage]);

  useEffect(() => {
    fetchBookings();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('calendar-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    setLoading(true);

    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        resource:resources(name, location, capacity),
        user:profiles!bookings_user_id_fkey(name, email)
      `)
      .in('status', ['pending', 'approved', 'rejected'])
      .order('start_time', { ascending: true });

    if (data) {
      setBookings(data);
    }

    setLoading(false);
  };

  const events: CalendarEvent[] = useMemo(() => {
    return bookings.map((booking) => ({
      id: booking.id,
      title: `${booking.resource?.name} - ${booking.user?.name}`,
      start: new Date(booking.start_time),
      end: new Date(booking.end_time),
      resource: booking,
    }));
  }, [bookings]);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedBooking(event.resource);
    setDialogOpen(true);
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const booking = event.resource;
    let backgroundColor = '#3b82f6'; // Default blue for approved
    let borderColor = '#2563eb';

    if (booking.status === 'pending') {
      backgroundColor = '#eab308'; // Yellow for pending
      borderColor = '#ca8a04';
    } else if (booking.status === 'rejected') {
      backgroundColor = '#6b7280'; // Gray for rejected
      borderColor = '#4b5563';
    } else if (booking.status === 'cancelled') {
      backgroundColor = '#9ca3af'; // Light gray for cancelled
      borderColor = '#6b7280';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.875rem',
      },
    };
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

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold border-b-thick border-primary inline-block pb-1">{t('calendar.title')}</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">{t('calendar.subtitle')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
              size="sm"
              className="px-2 sm:px-4"
            >
              {t('calendar.month')}
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              onClick={() => setView('week')}
              size="sm"
              className="px-2 sm:px-4"
            >
              {t('calendar.week')}
            </Button>
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              onClick={() => setView('day')}
              size="sm"
              className="px-2 sm:px-4"
            >
              {t('calendar.day')}
            </Button>
            <Button
              variant={view === 'agenda' ? 'default' : 'outline'}
              onClick={() => setView('agenda')}
              size="sm"
              className="px-2 sm:px-4"
            >
              {t('calendar.agenda')}
            </Button>
          </div>
        </div>

        <Card className="border-2">
          <CardContent className="p-2 sm:p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="h-[500px] sm:h-[700px]">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  view={view}
                  onView={setView}
                  date={date}
                  onNavigate={setDate}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventStyleGetter}
                  style={{ height: '100%' }}
                  popup
                  messages={{
                    today: t('calendar.today'),
                    previous: t('calendar.back'),
                    next: t('calendar.next'),
                    month: t('calendar.month'),
                    week: t('calendar.week'),
                    day: t('calendar.day'),
                    agenda: t('calendar.agenda'),
                    date: t('common.date'),
                    time: t('common.time'),
                    event: t('bookingDetails.title'),
                    noEventsInRange: t('calendar.noEvents'),
                    showMore: (total) => `+${total} more`,
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{t('calendar.legend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary border-2 border-primary" />
                <span className="text-sm">{t('bookings.approved')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#eab308] border-2 border-[#ca8a04]" />
                <span className="text-sm">{t('bookings.pending')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#6b7280] border-2 border-[#4b5563]" />
                <span className="text-sm">{t('bookings.rejected')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#9ca3af] border-2 border-[#6b7280]" />
                <span className="text-sm">{t('bookings.cancelled')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('bookingDetails.title')}</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">{t('bookingDetails.resource')}</Label>
                    <p className="font-medium">{selectedBooking.resource?.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">{t('bookingDetails.location')}</Label>
                    <p className="font-medium">{selectedBooking.resource?.location}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">{t('bookingDetails.bookedBy')}</Label>
                    <p className="font-medium">{selectedBooking.user?.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">{t('common.status')}</Label>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">{t('bookingDetails.purpose')}</Label>
                  <p className="font-medium">{selectedBooking.purpose}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{t('bookingDetails.startTime')}</span>
                    </Label>
                    <p className="font-medium">{formatDateTime(selectedBooking.start_time)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{t('bookingDetails.endTime')}</span>
                    </Label>
                    <p className="font-medium">{formatDateTime(selectedBooking.end_time)}</p>
                  </div>
                </div>

                {selectedBooking.attendees && selectedBooking.attendees.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">{t('bookingDetails.attendees')} ({selectedBooking.attendees.length})</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedBooking.attendees.map((attendee, index) => (
                        <Badge key={index} variant="outline">{attendee}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button onClick={() => setDialogOpen(false)} className="w-full">
                    {t('common.close')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
