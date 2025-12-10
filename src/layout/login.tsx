import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Lock, Eye, EyeOff, GraduationCap } from "../lib/icons";
import { useNavigate } from "react-router-dom";
//import { toast } from "sonner";
//import { emailLoginSchema, phoneLoginSchema } from "@/services/schema/auth";

export function Login() {
  const [showPassword] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div className="w-[90vw] min-h-screen flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md relative z-10 shadow-lg border-border/50 backdrop-blur-sm bg-card/80">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Gestão Escolar</CardTitle>
            <CardDescription className="mt-2">
              Entre na sua conta para acessar o painel
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800">
                <Phone className="w-4 h-4" />
                Telemóvel
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                    />
                  </div>
                  
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 pr-10"

                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 border-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                </div>
                
                <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                    onClick={() => navigate("dashboard")}
                >
                  Entrar
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="phone">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de Telemóvel</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+244 9XX XXX XXX"
                      className="pl-10"
                    />
                  </div>
                  
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 border-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                    onChange={() => navigate("/dashboard")}
                >
                   Entrar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};