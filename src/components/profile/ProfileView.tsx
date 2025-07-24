import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useStudent } from '@/contexts/StudentContext';
import { User, Mail, Calendar, GraduationCap, Hash, Camera, Lock, Edit, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ProfileView() {
  const { student } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: student.name,
    email: student.email
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the profile
    console.log('Saving profile:', editedData);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // In a real app, this would make an API call to change the password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As palavras-passe não coincidem');
      return;
    }
    console.log('Changing password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Calculate age from a mock birth date
  const birthDate = new Date('2006-03-15'); // Mock birth date
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perfil do Aluno</h1>
          <p className="text-gray-600">Gerir informações pessoais e configurações da conta</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo and Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mx-auto">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                  variant="secondary"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h2>
              <p className="text-gray-600 mb-2">{student.class}</p>
              <p className="text-sm text-gray-500">Nº {student.enrollmentNumber}</p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ano Letivo</span>
                <span className="font-medium">{student.year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Turma</span>
                <span className="font-medium">{student.class}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Idade</span>
                <span className="font-medium">{age} anos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Matrícula</span>
                <span className="font-medium">{student.enrollmentNumber}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informações Pessoais
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{student.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedData.email}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{student.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Data de Nascimento</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{format(birthDate, 'dd MMMM, yyyy', { locale: ptBR })}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Idade</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{age} anos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Informações Acadêmicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Número de Estudante</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Hash className="w-4 h-4 text-gray-500" />
                    <span>{student.studentId}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Número de Matrícula</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Hash className="w-4 h-4 text-gray-500" />
                    <span>{student.enrollmentNumber}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Turma</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <span>{student.class}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ano Letivo</Label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{student.year}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Palavra-passe</h4>
                    <p className="text-sm text-gray-600">Última alteração há 30 dias</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Lock className="w-4 h-4 mr-2" />
                        Alterar Palavra-passe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Alterar Palavra-passe</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Palavra-passe Atual</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Nova Palavra-passe</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmar Nova Palavra-passe</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={handleChangePassword} className="flex-1">
                            Alterar Palavra-passe
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Sessões Ativas</h4>
                    <p className="text-sm text-gray-600">1 sessão ativa neste dispositivo</p>
                  </div>
                  <Button variant="outline">
                    Ver Sessões
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}