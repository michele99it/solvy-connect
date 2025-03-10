
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/8be73e61-952d-460c-854e-4fede333b960.png" 
              alt="Solvy Logo" 
              className="w-24 h-24 object-contain" 
            />
          </div>
          <h1 className="text-4xl font-bold text-[#439cf8] font-montserrat">Solvy</h1>
          <p className="text-solvy-gray text-lg">Trova e ripara</p>
          <div className="max-w-sm mx-auto">
            <p className="text-sm text-center text-solvy-gray">
              Un bene a te, un bene a tutti
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="rounded-xl transition-all data-[state=active]:bg-solvy-blue data-[state=active]:text-white">Accedi</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-xl transition-all data-[state=active]:bg-solvy-blue data-[state=active]:text-white">Registrati</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Bentornato</CardTitle>
                <CardDescription className="text-center">Inserisci i tuoi dati per accedere</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nome@esempio.com" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" className="rounded-lg" />
                </div>
                <Button 
                  className="w-full bg-solvy-blue hover:bg-solvy-blue/90 rounded-lg transition-all hover:shadow-md" 
                  onClick={handleContinue}
                >
                  Accedi
                </Button>
                <div className="text-center text-sm text-solvy-gray">
                  <a href="#" className="text-solvy-blue hover:underline">Password dimenticata?</a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Crea un account</CardTitle>
                <CardDescription className="text-center">
                  Registrati per richiedere o offrire aiuto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Mario Rossi" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="nome@esempio.com" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" className="rounded-lg" />
                </div>
                <div className="pt-2">
                  <Button 
                    className="w-full bg-solvy-blue hover:bg-solvy-blue/90 rounded-lg transition-all hover:shadow-md" 
                    onClick={handleContinue}
                  >
                    Crea account
                  </Button>
                </div>
                <div className="text-center text-xs text-solvy-gray">
                  <p>Creando un account, accetti i nostri <a href="#" className="text-solvy-blue hover:underline">Termini di servizio</a> e <a href="#" className="text-solvy-blue hover:underline">Privacy Policy</a></p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center justify-center text-sm text-solvy-gray">
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-solvy-green"></div>
            <span>Tutte le connessioni sono sicure e criptate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
