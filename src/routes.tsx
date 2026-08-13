import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import NewBookingPage from './pages/NewBookingPage';
import BookingDetailPage from './pages/BookingDetailPage';
import CalendarPage from './pages/CalendarPage';
import ResourcesPage from './pages/ResourcesPage';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LandingPage from './pages/LandingPage';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Landing',
    path: '/',
    element: <LandingPage />,
    public: true,
    visible: false,
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    public: true,
    visible: false,
  },
  {
    name: 'Register',
    path: '/register',
    element: <RegisterPage />,
    public: true,
    visible: false,
  },
  {
    name: 'Reset Password',
    path: '/reset-password',
    element: <ResetPasswordPage />,
    public: true,
    visible: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    name: 'Bookings',
    path: '/bookings',
    element: <BookingsPage />,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    name: 'New Booking',
    path: '/bookings/new',
    element: <NewBookingPage />,
  },
  {
    name: 'Booking Detail',
    path: '/bookings/:id',
    element: <BookingDetailPage />,
  },
  {
    name: 'Resources',
    path: '/resources',
    element: <ResourcesPage />,
  },
  {
    name: 'Users',
    path: '/users',
    element: <UsersPage />,
  },
  {
    name: 'Profile',
    path: '/profile',
    element: <ProfilePage />,
  },
];
