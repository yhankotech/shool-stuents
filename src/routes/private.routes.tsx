import { Dashboard } from '@/pages/dashboard/Dashboard';
import { AITutorView } from '@/pages/ai-tutor/AITutorView';
import { CalendarView } from '@/pages/calendar/CalendarView';
import { GradesView } from '@/pages/grades/GradesView';
import { MessagesView } from '@/pages/messages/MessagesView';
import { NotificationsView } from '@/pages/notifications/NotificationsView';
import { PaymentsView } from '@/pages/payments/PaymentsView';
import { PerformanceView } from '@/pages/performance/PerformanceView';
import { ProfileView } from "@/pages/profile/ProfileView";
import { ResourcesView } from "@/pages/resources/ResourcesView";

export const privateRoutes = [
    { path: "dashboard", element: (
        <Dashboard />
    ) },
    
    { path: "perfil", element: (
        <ProfileView />
    ) },
    { path: "assistente", element: (
        <AITutorView />
    ) },

    { path: "notificacoes", element: (
        <NotificationsView />
    ) },

    { path: "calendario", element: (
        <CalendarView />
    ) },

    { path: "chat", element: (
        <MessagesView />
    ) },

    { path: "performance", element: (
        <PerformanceView />
    ) },

    { path: "notas", element: (
        <GradesView />
    ) },

    { path: "pagamentos", element: (
        <PaymentsView />
    ) },

    { path: "recursos", element: (
        <ResourcesView />
    ) },
];