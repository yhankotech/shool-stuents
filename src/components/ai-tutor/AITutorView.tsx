import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudent } from '@/contexts/StudentContext';
import { Bot, Send, MessageSquare, Lightbulb, BookOpen, TrendingDown, Star } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  subject?: string;
}

export function AITutorView() {
  const { subjects, grades } = useStudent();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Olá! Sou a sua IA tutora personalizada. Estou aqui para ajudar com os seus estudos. Analisei o seu desempenho e vejo que pode precisar de ajuda em Física. Como posso ajudar hoje?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  // Identificar disciplinas com desempenho mais baixo
  const subjectPerformance = subjects.map(subject => {
    const subjectGrades = grades.filter(g => g.subject === subject.name);
    const average = subjectGrades.length > 0 
      ? subjectGrades.reduce((acc, grade) => acc + grade.grade, 0) / subjectGrades.length 
      : 0;
    return { ...subject, average };
  }).sort((a, b) => a.average - b.average);

  const weakSubjects = subjectPerformance.filter(s => s.average < 14);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString(),
      subject: selectedSubject || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage, selectedSubject);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        subject: selectedSubject || undefined
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string, subject?: string) => {
    const responses = [
      `Excelente pergunta sobre ${subject || 'este tópico'}! Vou explicar de forma simples e clara.`,
      `Com base no seu desempenho em ${subject || 'esta disciplina'}, recomendo que foque nestes pontos principais:`,
      `Entendo a sua dúvida. Vamos resolver isso passo a passo:`,
      `Esta é uma área importante! Deixe-me ajudar com uma explicação detalhada:`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + ` 

Para ${subject || 'esta matéria'}, sugiro:
1. Revisar os conceitos básicos primeiro
2. Praticar exercícios semelhantes 
3. Fazer resumos dos pontos principais
4. Agendar uma sessão de revisão comigo

Precisa de mais esclarecimentos sobre algum ponto específico?`;
  };

  const quickQuestions = [
    "Como posso melhorar em Matemática?",
    "Explica-me as derivadas",
    "Dicas de estudo para Física",
    "Como organizar o meu tempo de estudo?",
    "Exercícios para praticar"
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-600" />
            IA Tutora Personalizada
          </h1>
          <p className="text-gray-600">Assistente inteligente para melhorar o seu desempenho</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Analysis Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                Áreas de Melhoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weakSubjects.length > 0 ? (
                weakSubjects.map(subject => (
                  <div key={subject.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-orange-900">{subject.name}</span>
                      <Badge variant="secondary">{subject.average.toFixed(1)}</Badge>
                    </div>
                    <p className="text-sm text-orange-700">{subject.teacher}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-green-700">Bom desempenho geral!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Sugestões Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-2 text-xs"
                    onClick={() => setCurrentMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-96 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Chat com IA Tutora
                </CardTitle>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Escolher disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Geral</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0">
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.type === 'ai' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="w-4 h-4" />
                          <span className="text-xs font-medium">IA Tutora</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {format(new Date(message.timestamp), 'HH:mm', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-medium">IA Tutora</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder={`Faça uma pergunta${selectedSubject ? ` sobre ${selectedSubject}` : ''}...`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Study Recommendations */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Recomendações Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Plano de Estudo Semanal</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Com base no seu desempenho, recomendo dedicar mais tempo a estas áreas:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {weakSubjects.slice(0, 3).map(subject => (
                      <li key={subject.id}>• {subject.name} - 2h por semana</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Técnicas de Estudo</h4>
                  <p className="text-sm text-green-700 mb-3">
                    Métodos recomendados para o seu perfil de aprendizagem:
                  </p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Técnica Pomodoro (25min focado)</li>
                    <li>• Mapas mentais para revisão</li>
                    <li>• Prática ativa com exercícios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}