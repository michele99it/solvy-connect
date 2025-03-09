
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, User, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [userType, setUserType] = useState<"helper" | "requester" | null>(null);
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-solvy-blue text-white font-bold text-xl">
              S
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Solvy</h1>
          <p className="text-solvy-gray">Connetti con chi può aiutarti</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Accedi</TabsTrigger>
            <TabsTrigger value="signup">Registrati</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Bentornato</CardTitle>
                <CardDescription>Inserisci i tuoi dati per accedere</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nome@esempio.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full bg-solvy-blue hover:bg-solvy-blue/90" onClick={handleContinue}>
                  Accedi
                </Button>
                <div className="text-center text-sm text-solvy-gray">
                  <a href="#" className="underline">Password dimenticata?</a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Crea un account</CardTitle>
                <CardDescription>
                  {userType 
                    ? `Ti stai registrando come ${userType === 'helper' ? 'helper' : 'richiedente'}`
                    : "Scegli il tipo di account"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!userType ? (
                  <div className="space-y-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-solvy-blue hover:bg-blue-50`}
                      onClick={() => setUserType("requester")}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-solvy-blue/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-solvy-blue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Richiedente</h3>
                          <p className="text-sm text-solvy-gray">Cerca persone che possano aiutarti</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-solvy-blue hover:bg-blue-50`}
                      onClick={() => setUserType("helper")}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-solvy-blue/10 flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-solvy-blue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Helper</h3>
                          <p className="text-sm text-solvy-gray">Offri il tuo aiuto e guadagna</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4 text-solvy-green">
                      <Check size={18} />
                      <span className="text-sm font-medium">
                        {userType === 'helper' ? 'Helper' : 'Richiedente'} selezionato
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Mario Rossi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="nome@esempio.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" />
                    </div>
                    <Button className="w-full bg-solvy-blue hover:bg-solvy-blue/90" onClick={handleContinue}>
                      Crea account
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setUserType(null)}
                    >
                      Torna indietro
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OnboardingPage;
