import { Student, Grade, Subject, Message, Event, Payment, Notification, Resource } from '@/types';

export const mockStudent: Student = {
  id: '1',
  name: 'Romenia',
  email: 'romenia.cajamba@escola.pt',
  studentId: 'EST2024001',
  class: '12º A',
  year: '2024/2025',
  enrollmentNumber: '20240001',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
};

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Matemática',
    teacher: 'Prof. João Santos',
    teacherId: '101',
    code: 'MAT12',
    color: '#3B82F6',
    description: 'Matemática A - 12º Ano',
    currentGrade: 16.5,
    attendance: 95
  },
  {
    id: '2',
    name: 'Português',
    teacher: 'Prof. Maria Costa',
    teacherId: '102',
    code: 'POR12',
    color: '#10B981',
    description: 'Português - 12º Ano',
    currentGrade: 14.2,
    attendance: 92
  },
  {
    id: '3',
    name: 'Física',
    teacher: 'Prof. Carlos Pereira',
    teacherId: '103',
    code: 'FIS12',
    color: '#F59E0B',
    description: 'Física e Química A - 12º Ano',
    currentGrade: 12.8,
    attendance: 88
  },
  {
    id: '4',
    name: 'História',
    teacher: 'Prof. Isabel Rodrigues',
    teacherId: '104',
    code: 'HIS12',
    color: '#8B5CF6',
    description: 'História A - 12º Ano',
    currentGrade: 15.3,
    attendance: 97
  }
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    subject: 'Matemática',
    grade: 17,
    maxGrade: 20,
    type: 'test',
    date: '2024-01-15',
    teacher: 'Prof. João Santos',
    period: '1º Período'
  },
  {
    id: '2',
    subject: 'Português',
    grade: 15,
    maxGrade: 20,
    type: 'exam',
    date: '2024-01-20',
    teacher: 'Prof. Maria Costa',
    period: '1º Período'
  },
  {
    id: '3',
    subject: 'Física',
    grade: 13,
    maxGrade: 20,
    type: 'assignment',
    date: '2024-01-10',
    teacher: 'Prof. Carlos Pereira',
    period: '1º Período'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Prof. João Santos',
    senderType: 'teacher',
    subject: 'Resultados do Teste de Matemática',
    content: 'Parabéns pelo excelente resultado no teste! Continue assim.',
    date: '2024-01-22',
    read: false
  },
  {
    id: '2',
    sender: 'Encarregado de Educação',
    senderType: 'parent',
    subject: 'Reunião de Pais',
    content: 'Lembra-te da reunião de pais na sexta-feira às 18h.',
    date: '2024-01-21',
    read: true
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Teste de Matemática',
    description: 'Teste sobre derivadas e integrais',
    date: '2024-01-25',
    time: '10:00',
    type: 'exam',
    subject: 'Matemática',
    location: 'Sala 201'
  },
  {
    id: '2',
    title: 'Feira de Ciências',
    description: 'Apresentação de projetos científicos',
    date: '2024-02-01',
    time: '14:00',
    type: 'event',
    location: 'Auditório Principal'
  },
  {
    id: '3',
    title: 'Reunião de Pais',
    description: 'Reunião trimestral com encarregados de educação',
    date: '2024-02-05',
    time: '18:00',
    type: 'meeting',
    location: 'Sala de Professores'
  },
  {
    id: '4',
    title: 'Entrega de Trabalho de História',
    description: 'Prazo final para entrega do trabalho sobre Segunda Guerra Mundial',
    date: '2024-02-08',
    time: '23:59',
    type: 'deadline',
    subject: 'História'
  },
  {
    id: '5',
    title: 'Feriado - Carnaval',
    description: 'Não há aulas - Feriado de Carnaval',
    date: '2024-02-12',
    time: '00:00',
    type: 'holiday'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    description: 'Propina - Janeiro 2024',
    amount: 150.00,
    dueDate: '2024-01-31',
    status: 'paid',
    type: 'tuition',
    paidDate: '2024-01-28'
  },
  {
    id: '2',
    description: 'Material Escolar',
    amount: 45.50,
    dueDate: '2024-02-15',
    status: 'pending',
    type: 'material'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nova Nota Disponível',
    message: 'A nota do teste de Matemática já está disponível.',
    type: 'success',
    date: '2024-01-22',
    read: false
  },
  {
    id: '2',
    title: 'Pagamento em Atraso',
    message: 'Tem um pagamento pendente que vence em 3 dias.',
    type: 'warning',
    date: '2024-01-21',
    read: false
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Manual de Matemática - Capítulo 5',
    type: 'pdf',
    subject: 'Matemática',
    url: '#',
    description: 'Material sobre derivadas e suas aplicações',
    uploadDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Jogo de Matemática - Derivadas',
    type: 'game',
    subject: 'Matemática',
    url: '#',
    description: 'Jogo interativo para praticar cálculo de derivadas',
    uploadDate: '2024-01-18'
  }
];