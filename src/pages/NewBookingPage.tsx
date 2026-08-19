import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { supabase } from '@/db/supabase';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import type { Resource, Booking } from '@/types/types';
import { checkBookingConflict, combineDateAndTime, formatDate, formatDateOnly, formatTime, getDayOfWeek } from '@/lib/booking-utils';

export default function NewBookingPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { t } = useAppTranslation();
  const [step, setStep] = useState(1);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [bookingType, setBookingType] = useState<'single' | 'multi_day'>('single');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [purpose, setPurpose] = useState('');
  const [attendees, setAttendees] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingConflict, setCheckingConflict] = useState(false);
  const [hasConflict, setHasConflict] = useState(false);
  const [conflictExplanation, setConflictExplanation] = useState('');
  const [generatingAgenda, setGeneratingAgenda] = useState(false);
  const [generatedAgenda, setGeneratedAgenda] = useState('');
  const [showAgenda, setShowAgenda] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (bookingType === 'single' && selectedResource && date && startTime && endTime) {
      checkConflict();
    } else if (bookingType === 'multi_day' && selectedResource && startDate && endDate && startTime && endTime) {
      checkConflict();
    }
  }, [selectedResource, bookingType, date, startDate, endDate, startTime, endTime]);

  const fetchResources = async () => {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .order('name');

    if (data) {
      setResources(data);
    }
  };

  const generateAgenda = async () => {
    if (!purpose.trim()) {
      toast.error(t('newBooking.purposeRequired'));
      return;
    }

    setGeneratingAgenda(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-agenda', {
        body: { purpose: purpose.trim() },
      });

      if (error) throw error;

      if (data?.agenda) {
        setGeneratedAgenda(data.agenda);
        setShowAgenda(true);
        toast.success(t('toast.operationSuccess'));
      }
    } catch (error) {
      console.error('Failed to generate agenda:', error);
      toast.error(t('toast.operationFailed'));
    } finally {
      setGeneratingAgenda(false);
    }
  };

  const checkConflict = async () => {
    if (!selectedResource) return;

    setCheckingConflict(true);
    setHasConflict(false);
    setConflictExplanation('');

    try {
      if (bookingType === 'single') {
        if (!date) return;

        const startDateTime = combineDateAndTime(formatDate(date), startTime);
        const endDateTime = combineDateAndTime(formatDate(date), endTime);

        const { data: existingBookings } = await supabase
          .from('bookings')
          .select('*')
          .eq('resource_id', selectedResource.id)
          .in('status', ['approved', 'pending']);

        if (existingBookings) {
          const conflict = checkBookingConflict(
            new Date(startDateTime),
            new Date(endDateTime),
            existingBookings
          );
          setHasConflict(conflict);

          // If there's a conflict, fetch AI explanation
          if (conflict) {
            try {
              const { data: explanationData } = await supabase.functions.invoke('generate-conflict-explanation', {
                body: {
                  resourceId: selectedResource.id,
                  startTime: startDateTime,
                  endTime: endDateTime,
                },
              });

              if (explanationData?.explanation) {
                setConflictExplanation(explanationData.explanation);
              }
            } catch (error) {
              console.error('Failed to generate conflict explanation:', error);
              setConflictExplanation('This time slot conflicts with an existing booking. Please choose a different time.');
            }
          }
        }
      } else {
        // Multi-day booking conflict check
        if (!startDate || !endDate) return;

        // Generate array of dates
        const dates: Date[] = [];
        const currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);

        while (currentDate <= endDateObj) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Check each date for conflicts
        for (const checkDate of dates) {
          const startDateTime = combineDateAndTime(formatDate(checkDate), startTime);
          const endDateTime = combineDateAndTime(formatDate(checkDate), endTime);

          const { data: existingBookings } = await supabase
            .from('bookings')
            .select('*')
            .eq('resource_id', selectedResource.id)
            .in('status', ['approved', 'pending']);

          if (existingBookings) {
            const conflict = checkBookingConflict(
              new Date(startDateTime),
              new Date(endDateTime),
              existingBookings
            );

            if (conflict) {
              setHasConflict(true);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking conflict:', error);
    }

    setCheckingConflict(false);
  };

  const validateStep1 = () => {
    if (!selectedResource) {
      toast.error(t('newBooking.resourceRequired'));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (bookingType === 'single') {
      if (!date) {
        toast.error(t('newBooking.dateRequired'));
        return false;
      }
    } else {
      if (!startDate || !endDate) {
        toast.error(t('newBooking.dateRequired'));
        return false;
      }

      if (endDate < startDate) {
        toast.error(t('newBooking.invalidTimeRange'));
        return false;
      }
    }

    if (!startTime || !endTime) {
      toast.error(t('newBooking.startTimeRequired'));
      return false;
    }

    if (startTime >= endTime) {
      toast.error(t('newBooking.invalidTimeRange'));
      return false;
    }

    if (hasConflict) {
      toast.error(t('newBooking.conflictDetected'));
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile || !selectedResource) return;

    if (!purpose.trim()) {
      toast.error(t('newBooking.purposeRequired'));
      return;
    }

    setLoading(true);

    try {
      if (bookingType === 'single') {
        if (!date) return;

        const startDateTime = combineDateAndTime(formatDate(date), startTime);
        const endDateTime = combineDateAndTime(formatDate(date), endTime);

        // Debug logging to verify timezone handling
        console.log('Single-day booking creation:', {
          selectedDate: formatDate(date),
          selectedStartTime: startTime,
          selectedEndTime: endTime,
          startDateTime,
          endDateTime,
          parsedStart: new Date(startDateTime).toLocaleString(),
          parsedEnd: new Date(endDateTime).toLocaleString(),
        });

        const attendeesList = attendees
          .split(',')
          .map(a => a.trim())
          .filter(a => a.length > 0);

        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .insert([{
            resource_id: selectedResource.id,
            user_id: profile.id,
            start_time: startDateTime,
            end_time: endDateTime,
            purpose: purpose.trim(),
            attendees: attendeesList,
            status: 'pending',
            booking_type: 'single',
          }])
          .select()
          .single();

        if (bookingError) {
          toast.error(t('newBooking.createFailed').replace('{bookingError.message}', bookingError.message));
          setLoading(false);
          return;
        }

        // Debug logging to verify what was stored
        console.log('Booking created:', {
          id: booking?.id,
          storedStartTime: booking?.start_time,
          storedEndTime: booking?.end_time,
          parsedStoredStart: booking?.start_time ? new Date(booking.start_time).toLocaleString() : null,
          parsedStoredEnd: booking?.end_time ? new Date(booking.end_time).toLocaleString() : null,
        });

        const { data: managers } = await supabase
          .from('profiles')
          .select('id')
          .in('role', ['manager', 'admin']);

        if (managers && booking) {
          const notifications = managers.map(manager => ({
            user_id: manager.id,
            booking_id: booking.id,
            type: 'booking_created' as const,
            message: `New booking request from ${profile.name} for ${selectedResource.name}`,
          }));

          await supabase.from('notifications').insert(notifications);

          await supabase.from('notifications').insert([{
            user_id: profile.id,
            booking_id: booking.id,
            type: 'booking_created' as const,
            message: `Your booking request for ${selectedResource.name} has been submitted`,
          }]);
        }

        toast.success(t('newBooking.createSuccess'));
        navigate('/bookings');
      } else {
        // Multi-day booking
        if (!startDate || !endDate) return;

        const attendeesList = attendees
          .split(',')
          .map(a => a.trim())
          .filter(a => a.length > 0);

        // Call Edge Function to create multi-day booking
        const { data, error } = await supabase.functions.invoke('create-multi-day-booking', {
          body: {
            resource_id: selectedResource.id,
            user_id: profile.id,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            start_time: startTime,
            end_time: endTime,
            purpose: purpose.trim(),
            attendees: attendeesList,
          },
        });

        if (error) {
          const errorMsg = await error?.context?.text();
          console.error('Multi-day booking error:', errorMsg || error?.message);
          toast.error(errorMsg || t('newBooking.multiDayCreateFailed'));
          setLoading(false);
          return;
        }

        console.log('Multi-day booking created:', data);
        toast.success(
          t('newBooking.multiDayCreateSuccess').replace('{total_days}', String(data.total_days))
        );
        navigate('/bookings');
      }
    } catch (error) {
      console.error('Booking creation error:', error);
      toast.error(t('newBooking.generalCreateFailed'));
    }

    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold border-b-thick border-primary inline-block pb-1">{t('newBooking.title')}</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">{t('newBooking.subtitle')}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-2 font-bold text-sm sm:text-base ${
                  s === step ? 'bg-primary text-primary-foreground border-primary' : 
                  s < step ? 'bg-secondary text-secondary-foreground border-secondary' : 
                  'border-border'
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-10 sm:w-16 h-0.5 ${s < step ? 'bg-secondary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t('newBooking.step1Title')}</CardTitle>
              <CardDescription>{t('newBooking.step1Description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-4 border-2 cursor-pointer transition-colors ${
                      selectedResource?.id === resource.id ? 'border-primary bg-accent' : 'hover:border-primary'
                    }`}
                    onClick={() => setSelectedResource(resource)}
                  >
                    <h3 className="font-bold">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.location}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{t('resources.capacity')}: {resource.capacity}</Badge>
                    </div>
                    {resource.description && (
                      <p className="text-sm mt-2">{resource.description}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleNext}>{t('common.next')}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t('newBooking.step2Title')}</CardTitle>
              <CardDescription>{t('newBooking.step2Description').replace('{resource}', selectedResource?.name || '')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t('newBooking.bookingType')}</Label>
                <RadioGroup value={bookingType} onValueChange={(value) => setBookingType(value as 'single' | 'multi_day')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single" className="font-normal cursor-pointer">{t('newBooking.singleDay')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multi_day" id="multi_day" />
                    <Label htmlFor="multi_day" className="font-normal cursor-pointer">{t('newBooking.multiDay')}</Label>
                  </div>
                </RadioGroup>
              </div>

              {bookingType === 'single' ? (
                <div>
                  <Label>{t('common.date')}</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="border-2 w-fit"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1">
                      <Label>{t('newBooking.startDate')}</Label>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="border-2 w-fit"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>{t('newBooking.endDate')}</Label>
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => !startDate || date < startDate}
                        className="border-2 w-fit"
                      />
                    </div>
                  </div>
                  {startDate && endDate && (
                    <div className="p-3 bg-accent border-2 border-primary">
                      <p className="text-sm font-medium">
                        {t('newBooking.totalDays')}: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-time">{t('newBooking.startTime')}</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">{t('newBooking.endTime')}</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              {checkingConflict && (
                <p className="text-sm text-muted-foreground">{t('newBooking.checkingAvailability')}</p>
              )}

              {!checkingConflict && hasConflict && (
                <div className="p-4 border-3 border-black bg-destructive/10">
                  <p className="text-sm font-bold uppercase mb-2">⚠ {t('newBooking.bookingConflict')}</p>
                  <p className="text-sm">
                    {conflictExplanation || t('newBooking.conflictMessage')}
                  </p>
                </div>
              )}

              {!checkingConflict && !hasConflict && ((bookingType === 'single' && date) || (bookingType === 'multi_day' && startDate && endDate)) && startTime && endTime && (
                <div className="p-4 border-3 border-black bg-primary/10">
                  <p className="text-sm font-bold uppercase">
                    ✓ {t('newBooking.timeSlotAvailable')}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>{t('common.back')}</Button>
                <Button onClick={handleNext}>{t('common.next')}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t('newBooking.step3Title')}</CardTitle>
              <CardDescription>{t('newBooking.step3Description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose">{t('newBooking.purposeLabel')} *</Label>
                  <Input
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder={t('newBooking.purposePlaceholder')}
                  />
                </div>

                {/* AI Agenda Generator */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateAgenda}
                    disabled={generatingAgenda || !purpose.trim()}
                    className="w-full border-3 border-black"
                  >
                    {generatingAgenda ? (
                      <>
                        <span className="animate-spin mr-2">⚙</span>
                        {t('newBooking.generatingAgenda')}
                      </>
                    ) : (
                      <>✨ {t('newBooking.generateAgendaButton')}</>
                    )}
                  </Button>

                  {showAgenda && generatedAgenda && (
                    <div className="p-4 border-3 border-black bg-primary/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase">{t('newBooking.aiGeneratedAgenda')}</p>
                        <button
                          type="button"
                          onClick={() => setShowAgenda(false)}
                          className="text-sm hover:underline"
                        >
                          {t('common.dismiss')}
                        </button>
                      </div>
                      <Textarea
                        value={generatedAgenda}
                        onChange={(e) => setGeneratedAgenda(e.target.value)}
                        className="min-h-[120px] border-2 border-black"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedAgenda);
                          toast.success(t('toast.operationSuccess'));
                        }}
                        className="border-2 border-black"
                      >
                        📋 {t('newBooking.copyToClipboard')}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attendees">{t('newBooking.attendeesLabel')}</Label>
                  <Textarea
                    id="attendees"
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    placeholder={t('newBooking.attendeesPlaceholder')}
                  />
                </div>

                <div className="p-4 border-2 bg-muted">
                  <h4 className="font-medium mb-2">{t('newBooking.bookingSummary')}</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>{t('bookingDetails.resource')}:</strong> {selectedResource?.name}</p>
                    <p><strong>{t('bookingDetails.location')}:</strong> {selectedResource?.location}</p>
                    <p><strong>{t('newBooking.bookingType')}:</strong> {bookingType === 'single' ? t('newBooking.singleDay') : t('newBooking.multiDay')}</p>
                    {bookingType === 'single' ? (
                      <p><strong>{t('common.date')}:</strong> {date ? formatDateOnly(date) : ''}</p>
                    ) : (
                      <>
                        <p><strong>{t('newBooking.startDate')}:</strong> {startDate ? formatDateOnly(startDate) : ''}</p>
                        <p><strong>{t('newBooking.endDate')}:</strong> {endDate ? formatDateOnly(endDate) : ''}</p>
                        {startDate && endDate && (
                          <p><strong>{t('newBooking.totalDays')}:</strong> {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}</p>
                        )}
                      </>
                    )}
                    <p><strong>{t('common.time')}:</strong> {startTime} - {endTime}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>{t('common.back')}</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? t('common.loading') : t('newBooking.createBooking')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
