
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
  Star
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
import { useAppContext } from "@/contexts/AppContext";
import { useMediaQuery } from "@/hooks/use-media-query";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { darkMode, toggleDarkMode, language, setLanguage, translations } = useAppContext();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn("flex flex-col min-h-screen", 
      darkMode ? "bg-gray-900" : "bg-gradient-to-b from-white to-blue-50"
    )}>
      {/* Header */}
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
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="transition-transform duration-200 hover:scale-110">
                  <Settings size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent className={darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""}>
                <SheetHeader>
                  <SheetTitle className={darkMode ? "text-gray-100" : ""}>
                    {translations.settings}
                  </SheetTitle>
                  <SheetDescription className={darkMode ? "text-gray-400" : ""}>
                    {translations.customizeExperience}
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <h4 className={cn(
                      "text-sm font-semibold",
                      darkMode ? "text-gray-300" : ""
                    )}>
                      {translations.appearance}
                    </h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="darkMode" className={cn(
                        "flex items-center gap-2",
                        darkMode ? "text-gray-200" : ""
                      )}>
                        {translations.darkMode}
                      </Label>
                      <Switch 
                        id="darkMode" 
                        checked={darkMode} 
                        onCheckedChange={toggleDarkMode} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className={cn(
                      "text-sm font-semibold",
                      darkMode ? "text-gray-300" : ""
                    )}>
                      {translations.notifications}
                    </h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications" className={cn(
                        "flex items-center gap-2",
                        darkMode ? "text-gray-200" : ""
                      )}>
                        {translations.enableNotifications}
                      </Label>
                      <Switch 
                        id="notifications" 
                        checked={true} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className={cn(
                      "text-sm font-semibold",
                      darkMode ? "text-gray-300" : ""
                    )}>
                      {translations.language}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={language === "it" ? "default" : "outline"} 
                        className="w-full"
                        onClick={() => setLanguage("it")}
                      >
                        {translations.italian}
                      </Button>
                      <Button 
                        variant={language === "en" ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setLanguage("en")}
                      >
                        {translations.english}
                      </Button>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button className="w-full">
                      {translations.saveSettings}
                    </Button>
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
      
      {/* Bottom Navigation Bar - Modern Version with Glass Effect */}
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
              <Plus 
                size={22}
                className="transition-all"
              />
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
              to="/profile" 
              className={cn(
                "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
                isActive("/profile") 
                  ? darkMode 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-50 text-solvy-blue" 
                  : darkMode 
                    ? "text-gray-400 hover:text-blue-400" 
                    : "text-solvy-gray hover:text-solvy-blue"
              )}
            >
              <User 
                size={22}
                className="transition-all"
              />
              <span className="text-xs mt-1 font-medium">{translations.profile}</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Layout;
