import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useStudent } from '@/contexts/StudentContext';
import { CreditCard, Download, Search, AlertTriangle, CheckCircle, Clock, Euro, Calendar, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function PaymentsView() {
  const { payments } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const filteredPayments = payments.filter(payment => {
    const searchMatch = payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || payment.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((acc, p) => acc + p.amount, 0);

  const overduePayments = payments.filter(p => 
    p.status === 'pending' && new Date(p.dueDate) < new Date()
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string, dueDate: string) => {
    if (status === 'paid') return <Badge variant="success">Pago</Badge>;
    if (status === 'pending' && new Date(dueDate) < new Date()) {
      return <Badge variant="destructive">Em Atraso</Badge>;
    }
    if (status === 'pending') return <Badge variant="secondary">Pendente</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'tuition':
        return 'Propina';
      case 'fee':
        return 'Taxa';
      case 'material':
        return 'Material';
      case 'transport':
        return 'Transporte';
      default:
        return type;
    }
  };

  const selectedPaymentData = payments.find(p => p.id === selectedPayment);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pagamentos</h1>
          <p className="text-gray-600">Gerir propinas e outros pagamentos escolares</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-red-100 rounded-lg mr-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pendente</p>
              <p className="text-2xl font-bold text-gray-900">€{totalPending.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pago Este Ano</p>
              <p className="text-2xl font-bold text-gray-900">€{totalPaid.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-orange-100 rounded-lg mr-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Em Atraso</p>
              <p className="text-2xl font-bold text-gray-900">{overduePayments.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pagamentos</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Payments Alert */}
      {overduePayments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">
                  Atenção: {overduePayments.length} pagamento(s) em atraso
                </h3>
                <div className="space-y-2">
                  {overduePayments.map(payment => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-900">{payment.description}</p>
                        <p className="text-sm text-red-700">
                          Venceu em {format(new Date(payment.dueDate), 'dd MMM, yyyy', { locale: ptBR })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-900">€{payment.amount.toFixed(2)}</p>
                        <Button size="sm" className="mt-1">
                          Pagar Agora
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pesquisar pagamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="overdue">Em Atraso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map(payment => {
              const isOverdue = payment.status === 'pending' && new Date(payment.dueDate) < new Date();
              
              return (
                <div key={payment.id} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        payment.status === 'paid' ? 'bg-green-100' :
                        isOverdue ? 'bg-red-100' : 'bg-orange-100'
                      }`}>
                        {getStatusIcon(payment.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{payment.description}</h3>
                          {getStatusBadge(payment.status, payment.dueDate)}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Euro className="w-4 h-4" />
                            <span>€{payment.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Vence: {format(new Date(payment.dueDate), 'dd MMM, yyyy', { locale: ptBR })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>{getPaymentTypeLabel(payment.type)}</span>
                          </div>
                        </div>
                        {payment.paidDate && (
                          <p className="text-sm text-green-600 mt-2">
                            Pago em {format(new Date(payment.paidDate), 'dd MMM, yyyy', { locale: ptBR })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {payment.status === 'pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => setSelectedPayment(payment.id)}>
                              Pagar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Efetuar Pagamento</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">{payment.description}</h4>
                                <p className="text-2xl font-bold text-blue-600">€{payment.amount.toFixed(2)}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  Vencimento: {format(new Date(payment.dueDate), 'dd MMM, yyyy', { locale: ptBR })}
                                </p>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Método de Pagamento</label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o método" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="card">Cartão de Crédito</SelectItem>
                                      <SelectItem value="debit">Cartão de Débito</SelectItem>
                                      <SelectItem value="transfer">Transferência Bancária</SelectItem>
                                      <SelectItem value="mbway">MB WAY</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex gap-3">
                                  <Button className="flex-1">
                                    Confirmar Pagamento
                                  </Button>
                                  <Button variant="outline">
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      {payment.status === 'paid' && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Recibo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}