import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Search,
  Home,
  User,
  Bell,
  Settings,
  Plus,
  Star,
  BookOpen,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Languages,
  HelpCircle,
  Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/AppContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import SolvyLogo from "./SolvyLogo";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { darkMode, toggleDarkMode, language, setLanguage, translations, logout } = useAppContext();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn("flex flex-col min-h-screen", 
      darkMode ? "bg-gray-900" : "bg-gradient-to-b from-white to-blue-50"
    )}>
      <header className={cn(
        "sticky top-0 z-30 backdrop-blur-md transition-all duration-300", 
        darkMode 
          ? "bg-gray-800/90 border-b border-gray-700" 
          : "bg-white/80 border-b border-gray-200"
      )}>
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <div className="relative">
                <img 
                  src="/lovable-uploads/8be73e61-952d-460c-854e-4fede333b960.png" 
                  alt="Solvy Logo" 
                  className="w-8 h-8 object-contain" 
                />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#439cf8] to-purple-500 font-montserrat">Solvy</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative transition-transform duration-200 hover:scale-110">
                  <Bell size={20} />
                  <span className={cn(
                    "absolute top-1 right-1 w-2 h-2 rounded-full",
                    darkMode ? "bg-green-400" : "bg-solvy-green"
                  )}></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className={cn(
                "w-80 p-0 rounded-xl", 
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
              )}>
                <div className={cn(
                  "p-4 border-b", 
                  darkMode ? "border-gray-700" : "border-gray-200"
                )}>
                  <h3 className="font-medium">{translations.notificationTitle}</h3>
                </div>
                <div className="max-h-80 overflow-auto">
                  <div className={cn(
                    "p-4 border-b cursor-pointer transition-colors",
                    darkMode 
                      ? "border-gray-700 hover:bg-gray-700/50" 
                      : "border-gray-200 hover:bg-muted/50"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                        darkMode 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-solvy-blue/10 text-solvy-blue"
                      )}>
                        <User size={18} />
                      </div>
                      <div>
                        <p className={cn(
                          "text-sm font-medium",
                          darkMode ? "text-gray-100" : ""
                        )}>
                          {language === 'it' 
                            ? 'Marco B. ha accettato la tua richiesta' 
                            : 'Marco B. accepted your request'}
                        </p>
                        <p className={cn(
                          "text-xs mt-1",
                          darkMode ? "text-gray-400" : "text-muted-foreground"
                        )}>
                          2 {translations.hoursAgo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "p-4 border-b cursor-pointer transition-colors",
                    darkMode 
                      ? "border-gray-700 hover:bg-gray-700/50" 
                      : "border-gray-200 hover:bg-muted/50"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                        darkMode 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-solvy-blue/10 text-solvy-blue"
                      )}>
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <p className={cn(
                          "text-sm font-medium",
                          darkMode ? "text-gray-100" : ""
                        )}>
                          {language === 'it' 
                            ? 'Nuovo messaggio da Giulia V.' 
                            : 'New message from Giulia V.'}
                        </p>
                        <p className={cn(
                          "text-xs mt-1",
                          darkMode ? "text-gray-400" : "text-muted-foreground"
                        )}>
                          5 {translations.hoursAgo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "p-4 cursor-pointer transition-colors",
                    darkMode 
                      ? "hover:bg-gray-700/50" 
                      : "hover:bg-muted/50"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                        darkMode 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-solvy-blue/10 text-solvy-blue"
                      )}>
                        <Bell size={18} />
                      </div>
                      <div>
                        <p className={cn(
                          "text-sm font-medium",
                          darkMode ? "text-gray-100" : ""
                        )}>
                          {language === 'it' 
                            ? 'Promemoria: Appuntamento domani' 
                            : 'Reminder: Appointment tomorrow'}
                        </p>
                        <p className={cn(
                          "text-xs mt-1",
                          darkMode ? "text-gray-400" : "text-muted-foreground"
                        )}>
                          1 {language === 'it' ? 'giorno fa' : 'day ago'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "p-2 border-t text-center",
                  darkMode ? "border-gray-700" : "border-gray-200"
                )}>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full text-sm",
                      darkMode ? "text-blue-400" : "text-solvy-blue"
                    )}
                  >
                    {translations.viewAll}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative transition-transform duration-200 hover:scale-110">
                  <Avatar className="h-8 w-8 border-2 border-blue-100 dark:border-blue-900">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                      MR
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={cn(
                "w-56 p-2 rounded-xl", 
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              )}>
                <div className="px-2 pt-1 pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        MR
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className={cn("font-medium", darkMode ? "text-white" : "")}>Mario Rossi</p>
                      <p className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>mario.rossi@example.com</p>
                    </div>
                  </div>
                </div>
                
                <DropdownMenuSeparator className={darkMode ? "bg-gray-700" : ""} />
                
                <DropdownMenuItem 
                  className={cn(
                    "flex items-center gap-2 cursor-pointer rounded-md",
                    darkMode ? "hover:bg-gray-700" : ""
                  )}
                  onClick={() => navigate("/profile")}
                >
                  <User size={16} />
                  <span>{language === "it" ? "Profilo" : "Profile"}</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className={cn(
                    "flex items-center gap-2 cursor-pointer rounded-md",
                    darkMode ? "hover:bg-gray-700" : ""
                  )}
                >
                  <Star size={16} />
                  <span>{language === "it" ? "Abbonamento" : "Subscription"}</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className={darkMode ? "bg-gray-700" : ""} />
                
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Moon size={16} className={darkMode ? "text-blue-400" : ""} />
                      <span className={darkMode ? "text-gray-200" : ""}>
                        {language === "it" ? "Modalità scura" : "Dark mode"}
                      </span>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages size={16} className={darkMode ? "text-blue-400" : ""} />
                      <span className={darkMode ? "text-gray-200" : ""}>
                        {language === "it" ? "Lingua" : "Language"}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="xs"
                      onClick={() => setLanguage(language === "it" ? "en" : "it")}
                      className="text-xs font-normal"
                    >
                      {language === "it" ? "EN" : "IT"}
                    </Button>
                  </div>
                </div>
                
                <DropdownMenuSeparator className={darkMode ? "bg-gray-700" : ""} />
                
                <DropdownMenuItem 
                  className={cn(
                    "flex items-center gap-2 cursor-pointer rounded-md text-red-500",
                    darkMode ? "hover:bg-gray-700" : ""
                  )}
                >
                  <LogOut size={16} />
                  <span>{language === "it" ? "Disconnetti" : "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8 relative">
        {children}
      </main>
      
      <div className={cn(
        "sticky bottom-0 z-40 transition-all duration-300",
        darkMode 
          ? "bg-gray-800/95 border-t border-gray-700" 
          : "bg-white/95 backdrop-blur-md border-t border-gray-200"
      )}>
        <div className="container mx-auto px-4">
          <nav className={cn(
            "flex justify-around py-2 rounded-t-xl",
            darkMode ? "bg-gray-800/70" : "bg-white/70"
          )}>
            <Link 
              to="/dashboard" 
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                isActive("/dashboard") 
                  ? darkMode 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-50 text-solvy-blue" 
                  : darkMode 
                    ? "text-gray-400 hover:text-blue-400" 
                    : "text-solvy-gray hover:text-solvy-blue"
              )}
            >
              <Home 
                size={22} 
                className={cn(
                  "transition-all",
                  isActive("/dashboard") ? "text-current" : "text-current"
                )} 
              />
              <span className="text-xs mt-1 font-medium">{translations.home}</span>
            </Link>
            
            <Link 
              to="/search" 
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                isActive("/search") 
                  ? darkMode 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-50 text-solvy-blue" 
                  : darkMode 
                    ? "text-gray-400 hover:text-blue-400" 
                    : "text-solvy-gray hover:text-solvy-blue"
              )}
            >
              <Search 
                size={22}
                className="transition-all"
              />
              <span className="text-xs mt-1 font-medium">{translations.search}</span>
            </Link>
            
            <Link 
              to="/new" 
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                isActive("/new") 
                  ? darkMode 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-50 text-solvy-blue" 
                  : darkMode 
                    ? "text-gray-400 hover:text-blue-400" 
                    : "text-solvy-gray hover:text-solvy-blue"
              )}
            >
              <div className="relative">
                <SolvyLogo 
                  size={22}
                  className={cn(
                    "transition-all",
                    isActive("/new") 
                      ? darkMode ? "text-blue-400" : "text-solvy-blue" 
                      : darkMode ? "text-gray-400" : "text-solvy-gray"
                  )}
                />
              </div>
              <span className="text-xs mt-1 font-medium">{translations.create || "New"}</span>
            </Link>
            
            <Link 
              to="/chat" 
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                isActive("/chat") 
                  ? darkMode 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-50 text-solvy-blue" 
                  : darkMode 
                    ? "text-gray-400 hover:text-blue-400" 
                    : "text-solvy-gray hover:text-solvy-blue"
              )}
            >
              <MessageSquare 
                size={22}
                className="transition-all"
              />
              <span className="text-xs mt-1 font-medium">{translations.chat}</span>
            </Link>
            
            <Link 
              to="/tutorial" 
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                isActive("/tutorial") 
                  ? darkMode 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-50 text-solvy-blue" 
                  : darkMode 
                    ? "text-gray-400 hover:text-blue-400" 
                    : "text-solvy-gray hover:text-solvy-blue"
              )}
            >
              <BookOpen 
                size={22}
                className="transition-all"
              />
              <span className="text-xs mt-1 font-medium">{language === "it" ? "Tutorial" : "Tutorials"}</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Layout;
