import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StudentProvider } from '@/contexts/StudentContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { GradesView } from '@/components/grades/GradesView';
import { PerformanceView } from '@/components/performance/PerformanceView';
import { MessagesView } from '@/components/messages/MessagesView';
import { CalendarView } from '@/components/calendar/CalendarView';
import { PaymentsView } from '@/components/payments/PaymentsView';
import { ResourcesView } from '@/components/resources/ResourcesView';
import { AITutorView } from '@/components/ai-tutor/AITutorView';
import { NotificationsView } from '@/components/notifications/NotificationsView';
import { ProfileView } from '@/components/profile/ProfileView';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'grades':
        return <GradesView />;
      case 'performance':
        return <PerformanceView />;
      case 'messages':
        return <MessagesView />;
      case 'calendar':
        return <CalendarView />;
      case 'payments':
        return <PaymentsView />;
      case 'resources':
        return <ResourcesView />;
      case 'ai-tutor':
        return <AITutorView />;
      case 'documents':
        return <div className="p-6">Página de Documentos (Em desenvolvimento)</div>;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <StudentProvider>
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {renderCurrentPage()}
          </main>
        </div>
        <Toaster />
      </div>
    </StudentProvider>
  );
}

export default App;