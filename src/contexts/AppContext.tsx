
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Language = 'it' | 'en';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  // Header and navigation
  'home': { it: 'Home', en: 'Home' },
  'search': { it: 'Cerca', en: 'Search' },
  'chat': { it: 'Chat', en: 'Chat' },
  'profile': { it: 'Profilo', en: 'Profile' },
  'settings': { it: 'Impostazioni', en: 'Settings' },
  
  // Dashboard
  'hello': { it: 'Ciao', en: 'Hello' },
  'yourHomepage': { it: 'la tua homepage', en: 'your homepage' },
  'searchRequests': { it: 'Cerca richieste...', en: 'Search requests...' },
  'nearby': { it: 'Vicino a te', en: 'Nearby' },
  'recent': { it: 'Recenti', en: 'Recent' },
  'popular': { it: 'Popolari', en: 'Popular' },
  'map': { it: 'Mappa', en: 'Map' },
  'helpOffer': { it: 'Offri aiuto', en: 'Offer help' },
  'contactPerson': { it: 'Contatta', en: 'Contact' },
  'viewProfile': { it: 'Vedi profilo', en: 'View profile' },
  'close': { it: 'Chiudi', en: 'Close' },
  'skills': { it: 'Competenze:', en: 'Skills:' },
  'rate': { it: 'Tariffa:', en: 'Rate:' },
  'reviews': { it: 'recensioni', en: 'reviews' },
  'you': { it: 'Tu', en: 'You' },
  
  // Settings
  'customizeExperience': { it: 'Personalizza la tua esperienza su Solvy', en: 'Customize your experience on Solvy' },
  'appearance': { it: 'Aspetto', en: 'Appearance' },
  'darkMode': { it: 'Modalità scura', en: 'Dark mode' },
  'notifications': { it: 'Notifiche', en: 'Notifications' },
  'enableNotifications': { it: 'Abilita notifiche', en: 'Enable notifications' },
  'language': { it: 'Lingua', en: 'Language' },
  'italian': { it: 'Italiano', en: 'Italian' },
  'english': { it: 'English', en: 'English' },
  'saveSettings': { it: 'Salva impostazioni', en: 'Save settings' },
  
  // Notifications
  'notificationTitle': { it: 'Notifiche', en: 'Notifications' },
  'viewAll': { it: 'Visualizza tutte', en: 'View all' },
  'hoursAgo': { it: 'ore fa', en: 'hours ago' },
  'daysAgo': { it: 'giorni fa', en: 'days ago' },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'it';
  });

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  // Apply dark mode class to document
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Get translation based on current language
  const getTranslation = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || key;
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        language,
        setLanguage,
        translations: Object.fromEntries(
          Object.keys(translations).map(key => [key, getTranslation(key)])
        ),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
