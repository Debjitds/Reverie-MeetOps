import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, LayoutDashboard, Package, Users, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const menuItems = [
  { nameKey: 'nav.dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['user', 'manager', 'admin'] },
  { nameKey: 'nav.bookings', path: '/bookings', icon: Calendar, roles: ['user', 'manager', 'admin'] },
  { nameKey: 'nav.calendar', path: '/calendar', icon: CalendarDays, roles: ['user', 'manager', 'admin'] },
  { nameKey: 'nav.resources', path: '/resources', icon: Package, roles: ['admin'] },
  { nameKey: 'nav.users', path: '/users', icon: Users, roles: ['admin'] },
];

export function AppSidebar() {
  const { profile } = useAuth();
  const location = useLocation();
  const { t } = useAppTranslation();

  const visibleItems = menuItems.filter(item => 
    profile?.role && item.roles.includes(profile.role)
  );

  return (
    <aside className="w-64 border-r-3 border-black bg-white shrink-0 hidden lg:block">
      <div className="h-full flex flex-col">
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

        <nav className="flex-1 p-4 space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 transition-colors font-bold uppercase text-sm tracking-wide',
                  isActive 
                    ? 'bg-primary text-black border-l-4 border-black' 
                    : 'hover:bg-[#FFF8E7]'
                )}
              >
                <Icon className="w-5 h-5 stroke-[2.5px]" />
                <span>{t(item.nameKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-3 border-black bg-white">
          <div className="text-sm">
            <p className="font-bold uppercase text-xs tracking-wide text-black">{profile?.name}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t(`navbar.${profile?.role}`)}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
