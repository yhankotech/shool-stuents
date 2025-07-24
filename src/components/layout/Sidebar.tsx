import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  GraduationCap,
  MessageSquare,
  Calendar,
  CreditCard,
  BookOpen,
  Bot,
  User,
  Bell,
  Menu,
  X,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useStudent } from '@/contexts/StudentContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'grades', label: 'Notas', icon: GraduationCap },
  { id: 'performance', label: 'Desempenho', icon: TrendingUp },
  { id: 'messages', label: 'Mensagens', icon: MessageSquare, hasNotification: true },
  { id: 'calendar', label: 'Calendário', icon: Calendar },
  { id: 'payments', label: 'Pagamentos', icon: CreditCard },
  { id: 'resources', label: 'Recursos', icon: BookOpen },
  { id: 'ai-tutor', label: 'IA Tutora', icon: Bot },
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'notifications', label: 'Notificações', icon: Bell, hasNotification: true },
  { id: 'profile', label: 'Perfil', icon: User }
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { student, unreadMessages, unreadNotifications } = useStudent();

  const getNotificationCount = (itemId: string) => {
    if (itemId === 'messages') return unreadMessages;
    if (itemId === 'notifications') return unreadNotifications;
    return 0;
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">EduPortal</h2>
                    <p className="text-xs text-gray-500">Sistema Escolar</p>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hover:bg-gray-100"
              >
                {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Student Info */}
          {!isCollapsed && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.class}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const notificationCount = getNotificationCount(item.id);

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start relative",
                    isCollapsed ? "px-2" : "px-3",
                    isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  )}
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className={cn("w-5 h-5", isCollapsed ? "mx-auto" : "mr-3")} />
                  {!isCollapsed && <span>{item.label}</span>}
                  
                  {!isCollapsed && notificationCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                  
                  {isCollapsed && notificationCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                      {notificationCount}
                    </div>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {!isCollapsed && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Ano Letivo</p>
                <p className="text-sm font-medium text-gray-900">{student.year}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}