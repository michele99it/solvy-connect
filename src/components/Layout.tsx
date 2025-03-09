
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Search,
  Home,
  User,
  Bell,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-solvy-light">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Link to="/" className="flex items-center gap-2">
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
            <Button className="hidden md:flex bg-solvy-blue hover:bg-solvy-blue/90">
              Nuova Richiesta
            </Button>
          </div>
        </div>
      </header>
      
      <div 
        className={cn(
          "fixed inset-0 z-20 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden",
          navOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className={cn(
          "fixed top-16 left-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl p-4 transition-transform duration-300",
          navOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="flex flex-col gap-2">
            <Link 
              to="/" 
              className="flex items-center gap-3 p-3 rounded-md hover:bg-solvy-blue/10"
              onClick={() => setNavOpen(false)}
            >
              <Home size={20} className="text-solvy-blue" />
              <span>Home</span>
            </Link>
            <Link 
              to="/search" 
              className="flex items-center gap-3 p-3 rounded-md hover:bg-solvy-blue/10"
              onClick={() => setNavOpen(false)}
            >
              <Search size={20} className="text-solvy-blue" />
              <span>Cerca</span>
            </Link>
            <Link 
              to="/chat" 
              className="flex items-center gap-3 p-3 rounded-md hover:bg-solvy-blue/10"
              onClick={() => setNavOpen(false)}
            >
              <MessageSquare size={20} className="text-solvy-blue" />
              <span>Chat</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-3 p-3 rounded-md hover:bg-solvy-blue/10"
              onClick={() => setNavOpen(false)}
            >
              <User size={20} className="text-solvy-blue" />
              <span>Profilo</span>
            </Link>
            <Link 
              to="/new" 
              className="mt-4"
              onClick={() => setNavOpen(false)}
            >
              <Button className="w-full bg-solvy-blue hover:bg-solvy-blue/90">
                Nuova Richiesta
              </Button>
            </Link>
          </nav>
        </div>
      </div>
      
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      
      <div className="sticky bottom-0 md:hidden bg-white border-t shadow-lg">
        <div className="flex items-center justify-around h-14">
          <Link to="/" className="flex flex-col items-center justify-center flex-1 h-full text-solvy-gray hover:text-solvy-blue">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center justify-center flex-1 h-full text-solvy-gray hover:text-solvy-blue">
            <Search size={20} />
            <span className="text-xs mt-1">Cerca</span>
          </Link>
          <Link to="/new" className="flex flex-col items-center justify-center flex-1 h-full">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-solvy-blue text-white">
              <span className="text-lg font-bold">+</span>
            </div>
          </Link>
          <Link to="/chat" className="flex flex-col items-center justify-center flex-1 h-full text-solvy-gray hover:text-solvy-blue">
            <MessageSquare size={20} />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center flex-1 h-full text-solvy-gray hover:text-solvy-blue">
            <User size={20} />
            <span className="text-xs mt-1">Profilo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
