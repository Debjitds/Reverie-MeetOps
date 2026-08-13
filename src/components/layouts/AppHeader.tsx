import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bell, Menu, LogOut, Calendar, LayoutDashboard, Package, Users, CalendarDays } from 'lucide-react';
import { LanguageIndicator } from '@/components/language/LanguageIndicator';
import type { Notification } from '@/types/types';
import { formatDateTime } from '@/lib/booking-utils';
import { cn } from '@/lib/utils';
import { LogoutConfirmDialog } from '@/components/common/LogoutConfirmDialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const menuItems = [
  { nameKey: 'nav.dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['user', 'manager', 'admin'] },
  { nameKey: 'nav.bookings', path: '/bookings', icon: Calendar, roles: ['user', 'manager', 'admin'] },
  { nameKey: 'nav.calendar', path: '/calendar', icon: CalendarDays, roles: ['user', 'manager', 'admin'] },
  { nameKey: 'nav.resources', path: '/resources', icon: Package, roles: ['admin'] },
  { nameKey: 'nav.users', path: '/users', icon: Users, roles: ['admin'] },
];

export function AppHeader() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useAppTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    if (!profile) return;

    fetchNotifications();

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile.id}`,
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile]);

  const fetchNotifications = async () => {
    if (!profile) return;

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    }
  };

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    fetchNotifications();
  };

  const markAllAsRead = async () => {
    if (!profile) return;

    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', profile.id)
      .eq('read', false);

    fetchNotifications();
  };

  const handleSignOut = async () => {
    setLogoutDialogOpen(true);
  };

  const confirmSignOut = async () => {
    try {
      // CRITICAL: Navigate to landing page FIRST, before signing out
      // This prevents RouteGuard from redirecting to /login
      navigate('/', { replace: true });
      
      // Small delay to ensure navigation completes before auth state changes
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Now sign out - user is already on public route
      await signOut();
      setLogoutDialogOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, ensure we're on landing page
      setLogoutDialogOpen(false);
      navigate('/', { replace: true });
    }
  };

  const visibleItems = menuItems.filter(item => 
    profile?.role && item.roles.includes(profile.role)
  );

  return (
    <header className="border-b-3 border-black bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-2 sm:px-4 md:px-6">
        <div className="flex items-center space-x-2 sm:space-x-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6 border-b-3 border-black">
                <Link to="/" className="flex items-center space-x-3">
                  <img 
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-b1pxnfidi8e8/conv-b5rmjd5bhh4w/20260501/file-bbmv6icp7i0w.png" 
                    alt="MeetOps Logo" 
                    className="w-16 h-16 object-contain"
                  />
                  <span className="text-xl font-bold uppercase tracking-wide">{t('nav.appName')}</span>
                </Link>
              </div>
              <nav className="p-4 space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-[#FFF8E7] font-bold uppercase text-sm tracking-wide"
                    >
                      <Icon className="w-5 h-5 stroke-[2.5px]" />
                      <span>{t(item.nameKey)}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
            <img 
              src="https://miaoda-conversation-file.s3cdn.medo.dev/user-b1pxnfidi8e8/conv-b5rmjd5bhh4w/20260501/file-bbmv6icp7i0w.png" 
              alt="MeetOps Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
            <span className="text-xs sm:text-base md:text-lg font-bold uppercase tracking-wide truncate">
              {t('nav.appName')}
            </span>
          </Link>
        </div>

        <div className="hidden lg:block" />

        <div className="flex items-center space-x-0.5 sm:space-x-2 md:space-x-4">
          {/* Language Indicator */}
          <LanguageIndicator />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center p-0 text-[8px] sm:text-[10px] bg-primary text-primary-foreground border-2 border-black">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">{t('notifications.title')}</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    {t('notifications.markAllRead')}
                  </Button>
                )}
              </div>
              <ScrollArea className="h-96">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {t('notifications.noNotifications')}
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-4 hover:bg-muted cursor-pointer',
                          !notification.read && 'bg-accent'
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDateTime(notification.created_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold uppercase tracking-wide">{profile?.name}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{t(`navbar.${profile?.role}`)}</p>
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={handleSignOut} title={t('navbar.logout')}>
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={confirmSignOut}
      />
    </header>
  );
}
