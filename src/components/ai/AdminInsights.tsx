import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export function AdminInsights() {
  const { t } = useAppTranslation();
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      // Fetch this week's booking data
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, resource:resources(name)')
        .gte('created_at', oneWeekAgo.toISOString());

      const { data: resources } = await supabase.from('resources').select('name');

      if (!bookings || !resources) {
        toast.error(t('common.somethingWentWrong'));
        return;
      }

      // Calculate statistics
      const totalBookings = bookings.length;
      const pendingApprovals = bookings.filter((b) => b.status === 'pending').length;

      // Bookings per room
      const bookingsPerRoom: Record<string, number> = {};
      bookings.forEach((b) => {
        const roomName = b.resource?.name || 'Unknown';
        bookingsPerRoom[roomName] = (bookingsPerRoom[roomName] || 0) + 1;
      });

      // Most and least booked rooms
      const sortedRooms = Object.entries(bookingsPerRoom).sort((a, b) => b[1] - a[1]);
      const mostBookedRoom = sortedRooms[0]?.[0] || 'None';
      const leastBookedRoom = sortedRooms[sortedRooms.length - 1]?.[0] || 'None';

      // Busiest day
      const bookingsByDay: Record<string, number> = {};
      bookings.forEach((b) => {
        const day = new Date(b.start_time).toLocaleDateString('en-US', { weekday: 'long' });
        bookingsByDay[day] = (bookingsByDay[day] || 0) + 1;
      });
      const busiestDay = Object.entries(bookingsByDay).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

      // Call AI insights API
      const { data, error } = await supabase.functions.invoke('generate-admin-insights', {
        body: {
          stats: {
            totalBookings,
            bookingsPerRoom,
            mostBookedRoom,
            leastBookedRoom,
            busiestDay,
            pendingApprovals,
          },
        },
      });

      if (error) throw error;

      if (data?.insights) {
        setInsights(data.insights);
        toast.success(t('toast.operationSuccess'));
      }
    } catch (error) {
      console.error('Failed to generate insights:', error);
      toast.error(t('common.somethingWentWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-3 border-black hard-shadow">
      <CardHeader className="bg-primary">
        <CardTitle className="flex items-center gap-2 uppercase">
          <Sparkles className="w-5 h-5" />
          {t('dashboard.aiInsights')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {!insights && !loading && (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground mb-4">
              {t('dashboard.chatWithAI')}
            </p>
            <Button
              onClick={generateInsights}
              className="border-3 border-black"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t('dashboard.aiInsights')}
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
            <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
          </div>
        )}

        {insights && !loading && (
          <div className="space-y-4">
            <div className="p-4 border-2 border-black bg-muted/30">
              <p className="text-sm whitespace-pre-wrap">{insights}</p>
            </div>
            <Button
              onClick={generateInsights}
              variant="outline"
              className="w-full border-3 border-black"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('dashboard.aiInsights')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
