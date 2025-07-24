import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useStudent } from '@/contexts/StudentContext';
import { MessageSquare, Send, Search, Plus, Paperclip, User, School } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function MessagesView() {
  const { messages, markMessageAsRead, subjects } = useStudent();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', content: '' });

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case 'teacher':
        return <User className="w-4 h-4" />;
      case 'parent':
        return <User className="w-4 h-4" />;
      case 'school':
        return <School className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSenderBadgeColor = (senderType: string) => {
    switch (senderType) {
      case 'teacher':
        return 'bg-blue-100 text-blue-700';
      case 'parent':
        return 'bg-green-100 text-green-700';
      case 'school':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleMessageClick = (messageId: string) => {
    setSelectedMessage(messageId);
    markMessageAsRead(messageId);
  };

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
          <p className="text-gray-600">Comunicação com professores e escola</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Mensagem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Mensagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Para (Professor)</label>
                <select 
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                >
                  <option value="">Selecione um professor</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.teacher}>
                      {subject.teacher} - {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Assunto</label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Digite o assunto da mensagem"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Mensagem</label>
                <Textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Digite sua mensagem..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Anexar
                </Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Pesquisar mensagens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Caixa de Entrada</h2>
            <Badge variant="secondary">
              {filteredMessages.filter(m => !m.read).length} não lidas
            </Badge>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMessage === message.id ? 'ring-2 ring-blue-500' : ''
                } ${!message.read ? 'bg-blue-50 border-blue-200' : ''}`}
                onClick={() => handleMessageClick(message.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-full ${getSenderBadgeColor(message.senderType)}`}>
                        {getSenderIcon(message.senderType)}
                      </div>
                      <span className="font-medium text-sm truncate">
                        {message.sender}
                      </span>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <h3 className="font-medium text-sm mb-1 truncate">
                    {message.subject}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mb-2">
                    {message.content}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(message.date), 'dd MMM', { locale: ptBR })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessageData ? (
            <Card className="h-fit">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMessageData.subject}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`p-1 rounded-full ${getSenderBadgeColor(selectedMessageData.senderType)}`}>
                        {getSenderIcon(selectedMessageData.senderType)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {selectedMessageData.sender}
                      </span>
                      <span className="text-xs text-gray-400">
                        {format(new Date(selectedMessageData.date), 'dd MMM, yyyy às HH:mm', { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                  <Badge variant={selectedMessageData.senderType === 'teacher' ? 'default' : 'secondary'}>
                    {selectedMessageData.senderType === 'teacher' ? 'Professor' : 
                     selectedMessageData.senderType === 'parent' ? 'Encarregado' : 'Escola'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessageData.content}
                  </p>
                </div>
                
                {selectedMessageData.attachments && selectedMessageData.attachments.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Anexos:</h4>
                    <div className="space-y-2">
                      {selectedMessageData.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t">
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      Responder
                    </Button>
                    <Button variant="outline">
                      Encaminhar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecione uma mensagem para visualizar</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}