import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  MessageCircle,
  Send,
  Search,
  GraduationCap,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';

interface Conversa {
  id: string;
  nome: string;
  tipo: 'professor' | 'escola';
  disciplina?: string;
  avatar?: string;
  ultimaMensagem: string;
  hora: string;
  naoLidas: number;
  online: boolean;
}

interface Mensagem {
  id: string;
  remetente: string;
  conteudo: string;
  hora: string;
  minha: boolean;
}

const conversas: Conversa[] = [
  {
    id: '1',
    nome: 'Prof. Maria Silva',
    tipo: 'professor',
    disciplina: 'Matemática',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    ultimaMensagem: 'O João está indo muito bem nas aulas!',
    hora: '14:30',
    naoLidas: 1,
    online: true
  },
  {
    id: '2',
    nome: 'Prof. Carlos Mendes',
    tipo: 'professor',
    disciplina: 'Física',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    ultimaMensagem: 'Gostaria de conversar sobre o desempenho da Maria',
    hora: '12:15',
    naoLidas: 0,
    online: false
  },
  {
    id: '3',
    nome: 'Secretaria Acadêmica',
    tipo: 'escola',
    ultimaMensagem: 'Documentos de matrícula disponíveis para retirada',
    hora: '11:45',
    naoLidas: 0,
    online: true
  },
  {
    id: '4',
    nome: 'Prof. Isabel Costa',
    tipo: 'professor',
    disciplina: 'Português',
    ultimaMensagem: 'Reunião de pais marcada para sexta-feira',
    hora: 'Ontem',
    naoLidas: 0,
    online: false
  }
];

const mensagensExemplo: Mensagem[] = [
  {
    id: '1',
    remetente: 'Prof. Maria Silva',
    conteudo: 'Boa tarde! Como está?',
    hora: '14:25',
    minha: false
  },
  {
    id: '2',
    remetente: 'Você',
    conteudo: 'Boa tarde, professora! Tudo bem, obrigada. Como está o João nas aulas?',
    hora: '14:26',
    minha: true
  },
  {
    id: '3',
    remetente: 'Prof. Maria Silva',
    conteudo: 'O João está indo muito bem! Ele tem mostrado grande interesse pela matemática e suas notas têm melhorado consistentemente.',
    hora: '14:27',
    minha: false
  },
  {
    id: '4',
    remetente: 'Você',
    conteudo: 'Que bom saber! Em casa ele sempre fala das suas aulas com entusiasmo.',
    hora: '14:28',
    minha: true
  },
  {
    id: '5',
    remetente: 'Prof. Maria Silva',
    conteudo: 'Fico muito feliz em ouvir isso! Continue incentivando-o em casa.',
    hora: '14:30',
    minha: false
  }
];

export function MessagesView () {
  const [conversaSelecionada, setConversaSelecionada] = useState<Conversa>(conversas[0]);
  const [mensagens, setMensagens] = useState<Mensagem[]>(mensagensExemplo);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [busca, setBusca] = useState('');

  const getTipoLabel = (tipo: string, disciplina?: string) => {
    if (tipo === 'professor') {
      return disciplina ? `Prof. ${disciplina}` : 'Professor';
    }
    return 'Escola';
  };

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return;

    const mensagem: Mensagem = {
      id: Date.now().toString(),
      remetente: 'Você',
      conteudo: novaMensagem,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      minha: true
    };

    setMensagens([...mensagens, mensagem]);
    setNovaMensagem('');
  };

  const conversasFiltradas = conversas.filter(conversa =>
    conversa.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (conversa.disciplina && conversa.disciplina.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <MessageCircle className="mr-3 h-8 w-8" />
            Mensagens
          </h1>
          <p className="text-muted-foreground">Comunicação direta com professores e escola</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Lista de Conversas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Conversas
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {conversasFiltradas.map((conversa) => (
                <div
                  key={conversa.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    conversaSelecionada.id === conversa.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setConversaSelecionada(conversa)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversa.avatar} alt={conversa.nome} />
                        <AvatarFallback>
                          {conversa.tipo === 'professor' ? (
                            <GraduationCap className="h-5 w-5" />
                          ) : (
                            conversa.nome.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {conversa.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversa.nome}</p>
                        <div className="flex items-center space-x-2">
                          {conversa.naoLidas > 0 && (
                            <Badge variant="destructive" className="rounded-full">
                              {conversa.naoLidas}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversa.ultimaMensagem}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {getTipoLabel(conversa.tipo, conversa.disciplina)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Área de Conversa */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversaSelecionada.avatar} alt={conversaSelecionada.nome} />
                    <AvatarFallback>
                      {conversaSelecionada.tipo === 'professor' ? (
                        <GraduationCap className="h-5 w-5" />
                      ) : (
                        conversaSelecionada.nome.split(' ').map(n => n[0]).join('')
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {conversaSelecionada.online && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{conversaSelecionada.nome}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Badge variant="outline" className="text-xs mr-2">
                      {getTipoLabel(conversaSelecionada.tipo, conversaSelecionada.disciplina)}
                    </Badge>
                    {conversaSelecionada.online ? (
                      <span className="text-green-600 text-sm">Online</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">Offline</span>
                    )}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`flex ${mensagem.minha ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        mensagem.minha
                          ? 'bg-blue-600 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{mensagem.conteudo}</p>
                      <p className={`text-xs mt-1 ${
                        mensagem.minha ? 'text-blue-100' : 'text-muted-foreground'
                      }`}>
                        {mensagem.hora}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  className="flex-1"
                />
                <Button onClick={enviarMensagem} className='bg-green-500 hover:bg-green-600'>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}