
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import { StarIcon, ShieldCheckIcon, HandIcon, SparklesIcon } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { darkMode, language } = useAppContext();

  const title = language === 'it' 
    ? 'Connetti solver con chi ha bisogno di aiuto' 
    : 'Connect solvers with those who need help';
  
  const subtitle = language === 'it'
    ? 'Trova esperti qualificati per risolvere i tuoi problemi quotidiani o diventa un solver e metti a disposizione le tue competenze'
    : 'Find qualified experts to solve your everyday problems or become a solver and share your expertise';

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl px-6 py-10 md:py-16 text-center",
      darkMode 
        ? "bg-gradient-to-br from-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-white to-blue-50 border border-blue-100",
      className
    )}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <span className="mr-1 animate-pulse text-blue-600 dark:text-blue-400">✦</span>
            {language === 'it' ? 'La piattaforma per risolvere problemi' : 'The platform for problem solving'}
          </div>
        </div>

        <h1 className="mt-6 animate-fade-in bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
          {title}
        </h1>
        
        <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="connect" size="lg" className="gap-2">
            <SparklesIcon className="h-5 w-5" />
            {language === 'it' ? 'Trova un Solver' : 'Find a Solver'}
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            {language === 'it' ? 'Diventa Solver' : 'Become a Solver'}
          </Button>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-gray-800/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <StarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mt-3 font-medium text-gray-900 dark:text-white">
              {language === 'it' ? 'Solver di qualità' : 'Quality Solvers'}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {language === 'it' 
                ? 'Esperti verificati in vari campi' 
                : 'Verified experts in various fields'}
            </p>
          </div>
          
          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-gray-800/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
              <ShieldCheckIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mt-3 font-medium text-gray-900 dark:text-white">
              {language === 'it' ? 'Pagamenti sicuri' : 'Secure Payments'}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {language === 'it' 
                ? 'Transazioni protette e trasparenti' 
                : 'Protected and transparent transactions'}
            </p>
          </div>
          
          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-gray-800/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <HandIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mt-3 font-medium text-gray-900 dark:text-white">
              {language === 'it' ? 'Supporto garantito' : 'Guaranteed Support'}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {language === 'it' 
                ? 'Assistenza fino alla risoluzione' 
                : 'Support until resolution'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
