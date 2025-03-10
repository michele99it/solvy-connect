
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Search,
  Home,
  User,
  Bell,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("it");
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-solvy-light">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/8be73e61-952d-460c-854e-4fede333b960.png" 
                alt="Solvy Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-lg font-bold text-solvy-dark font-montserrat">Solvy</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-solvy-green rounded-full"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Notifiche</h3>
                </div>
                <div className="max-h-80 overflow-auto">
                  <div className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-solvy-blue/10 flex items-center justify-center text-solvy-blue shrink-0">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Marco B. ha accettato la tua richiesta</p>
                        <p className="text-xs text-muted-foreground mt-1">2 ore fa</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-solvy-blue/10 flex items-center justify-center text-solvy-blue shrink-0">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nuovo messaggio da Giulia V.</p>
                        <p className="text-xs text-muted-foreground mt-1">5 ore fa</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-solvy-blue/10 flex items-center justify-center text-solvy-blue shrink-0">
                        <Bell size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Promemoria: Appuntamento domani</p>
                        <p className="text-xs text-muted-foreground mt-1">1 giorno fa</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" className="w-full text-sm text-solvy-blue">
                    Visualizza tutte
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Impostazioni</SheetTitle>
                  <SheetDescription>
                    Personalizza la tua esperienza su Solvy
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Aspetto</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="darkMode" className="flex items-center gap-2">
                        Modalità scura
                      </Label>
                      <Switch 
                        id="darkMode" 
                        checked={darkMode} 
                        onCheckedChange={setDarkMode} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Notifiche</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications" className="flex items-center gap-2">
                        Abilita notifiche
                      </Label>
                      <Switch 
                        id="notifications" 
                        checked={notifications} 
                        onCheckedChange={setNotifications} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Lingua</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={language === "it" ? "default" : "outline"} 
                        className="w-full"
                        onClick={() => setLanguage("it")}
                      >
                        Italiano
                      </Button>
                      <Button 
                        variant={language === "en" ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setLanguage("en")}
                      >
                        English
                      </Button>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button className="w-full">Salva impostazioni</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      
      <div className="sticky bottom-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around h-14">
          <Link 
            to="/dashboard" 
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
              isActive("/dashboard") 
                ? "text-solvy-blue transform scale-110" 
                : "text-solvy-gray hover:text-solvy-blue"
            )}
          >
            <Home 
              size={20} 
              className={cn(
                "transition-all duration-300",
                isActive("/dashboard") && "animate-bounce" 
              )} 
            />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            to="/search" 
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
              isActive("/search") 
                ? "text-solvy-blue transform scale-110" 
                : "text-solvy-gray hover:text-solvy-blue"
            )}
          >
            <Search 
              size={20}
              className={cn(
                "transition-all duration-300",
                isActive("/search") && "animate-bounce"
              )}
            />
            <span className="text-xs mt-1">Cerca</span>
          </Link>
          <Link 
            to="/new" 
            className={cn(
              "flex md:hidden flex-col items-center justify-center flex-1 h-full transition-all duration-300",
              isActive("/new") && "transform scale-110"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full bg-solvy-blue text-white transition-all duration-300 hover:scale-110",
              isActive("/new") && "animate-pulse"
            )}>
              <span className="text-lg font-bold">+</span>
            </div>
          </Link>
          <Link 
            to="/chat" 
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
              isActive("/chat") 
                ? "text-solvy-blue transform scale-110" 
                : "text-solvy-gray hover:text-solvy-blue"
            )}
          >
            <MessageSquare 
              size={20}
              className={cn(
                "transition-all duration-300",
                isActive("/chat") && "animate-bounce"
              )}
            />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link 
            to="/profile" 
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
              isActive("/profile") 
                ? "text-solvy-blue transform scale-110" 
                : "text-solvy-gray hover:text-solvy-blue"
            )}
          >
            <User 
              size={20}
              className={cn(
                "transition-all duration-300",
                isActive("/profile") && "animate-bounce"
              )}
            />
            <span className="text-xs mt-1">Profilo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
