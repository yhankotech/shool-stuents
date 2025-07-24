import { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Subject, Grade, Message, Event, Payment, Notification } from '@/types';
import {
  mockStudent,
  mockSubjects,
  mockGrades,
  mockMessages,
  mockEvents,
  mockPayments,
  mockNotifications
} from '@/lib/mock-data';

interface StudentContextType {
  student: Student;
  subjects: Subject[];
  grades: Grade[];
  messages: Message[];
  events: Event[];
  payments: Payment[];
  notifications: Notification[];
  unreadMessages: number;
  unreadNotifications: number;
  markMessageAsRead: (messageId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student] = useState<Student>(mockStudent);
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [grades] = useState<Grade[]>(mockGrades);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [events] = useState<Event[]>(mockEvents);
  const [payments] = useState<Payment[]>(mockPayments);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadMessages = messages.filter(m => !m.read).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  return (
    <StudentContext.Provider value={{
      student,
      subjects,
      grades,
      messages,
      events,
      payments,
      notifications,
      unreadMessages,
      unreadNotifications,
      markMessageAsRead,
      markNotificationAsRead
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}