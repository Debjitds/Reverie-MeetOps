import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { ChatWidget } from '@/components/ai/ChatWidget';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
