
import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/contexts/AppContext';

interface Solver {
  id: number;
  name: string;
  position: { x: number; y: number };
  rating: number;
  reviews: number;
  skills: string[];
  price: string;
  image: string;
}

interface FakeMapProps {
  solvers: Solver[];
  onSolverClick: (solver: Solver) => void;
}

const FakeMap = ({ solvers, onSolverClick }: FakeMapProps) => {
  const [hoveredSolver, setHoveredSolver] = useState<number | null>(null);
  const [selectedSolver, setSelectedSolver] = useState<number | null>(null);
  const { darkMode, translations } = useAppContext();

  const handleSolverClick = (solver: Solver) => {
    setSelectedSolver(solver.id);
    onSolverClick(solver);
  };

  return (
    <div className={cn(
      "relative w-full h-[400px] rounded-lg overflow-hidden",
      darkMode ? "bg-gray-800" : "bg-blue-50"
    )}>
      {/* Mappa di sfondo stilizzata */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M 20 0 L 0 0 0 20" 
                fill="none" 
                stroke={darkMode ? "#2D3748" : "#E2E8F0"} 
                strokeWidth="0.5" 
              />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path 
                d="M 100 0 L 0 0 0 100" 
                fill="none" 
                stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
                strokeWidth="1" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Strade simulate */}
          <line 
            x1="0" y1="200" x2="400" y2="200" 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
            strokeWidth="6" 
          />
          <line 
            x1="100" y1="0" x2="100" y2="400" 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
            strokeWidth="4" 
          />
          <line 
            x1="250" y1="50" x2="350" y2="300" 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
            strokeWidth="3" 
          />
          <line 
            x1="50" y1="350" x2="300" y2="280" 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
            strokeWidth="3" 
          />
          
          {/* Aree simulate */}
          <rect 
            x="20" y="20" width="120" height="80" rx="3" 
            fill={darkMode ? "#2D3748" : "#E2E8F0"} 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
          />
          <rect 
            x="280" y="180" width="100" height="120" rx="3" 
            fill={darkMode ? "#2D3748" : "#E2E8F0"} 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
          />
          <rect 
            x="150" y="250" width="80" height="100" rx="3" 
            fill={darkMode ? "#2D3748" : "#E2E8F0"} 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
          />
          <circle 
            cx="50" cy="250" r="30" 
            fill={darkMode ? "#2D3748" : "#E2E8F0"} 
            stroke={darkMode ? "#4A5568" : "#CBD5E1"} 
          />
        </svg>
      </div>
      
      {/* Posizione utente */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-white",
            darkMode ? "bg-blue-500" : "bg-solvy-blue"
          )}>
            <Navigation size={14} />
          </div>
          <div className={cn(
            "absolute -top-1 -right-1 -left-1 -bottom-1 rounded-full animate-ping",
            darkMode ? "bg-blue-500/30" : "bg-solvy-blue/30"
          )} />
          <span className={cn(
            "absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium py-0.5 px-2 rounded-full shadow-sm whitespace-nowrap",
            darkMode 
              ? "bg-gray-700 text-blue-400" 
              : "bg-white text-solvy-blue"
          )}>
            {translations.you}
          </span>
        </div>
      </div>
      
      {/* Solver pins */}
      {solvers.map((solver) => {
        const isSelected = selectedSolver === solver.id;
        const isHovered = hoveredSolver === solver.id;
        
        return (
          <div 
            key={solver.id}
            className={cn(
              "absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
              isSelected ? "z-30" : "z-10"
            )}
            style={{ 
              left: `${solver.position.x}%`, 
              top: `${solver.position.y}%`, 
            }}
            onClick={() => handleSolverClick(solver)}
            onMouseEnter={() => setHoveredSolver(solver.id)}
            onMouseLeave={() => setHoveredSolver(null)}
          >
            <div className={cn(
              "flex flex-col items-center",
              (isHovered || isSelected) && "scale-110 drop-shadow-md"
            )}>
              <MapPin 
                size={32} 
                className={cn(
                  "fill-white transition-colors",
                  (isHovered || isSelected)
                    ? darkMode ? "text-red-400 fill-red-900/30" : "text-red-600 fill-red-100"
                    : "text-red-500"
                )} 
              />
              {!isSelected && (
                <div className={cn(
                  "absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center",
                  isHovered 
                    ? darkMode ? "bg-red-900/30" : "bg-red-100"
                    : darkMode ? "bg-gray-700" : "bg-white"
                )}>
                  <span className={cn(
                    "text-[10px] font-bold",
                    darkMode ? "text-red-400" : "text-red-500"
                  )}>
                    {solver.id}
                  </span>
                </div>
              )}
              
              {(isHovered || isSelected) && (
                <div className={cn(
                  "absolute -bottom-12 left-1/2 transform -translate-x-1/2 rounded-lg shadow-md p-1.5 min-w-28 text-center",
                  darkMode ? "bg-gray-700" : "bg-white"
                )}>
                  <p className={cn(
                    "text-xs font-medium",
                    darkMode ? "text-gray-200" : ""
                  )}>
                    {solver.name}
                  </p>
                  <p className={cn(
                    "text-[10px]",
                    darkMode ? "text-gray-400" : "text-solvy-gray"
                  )}>
                    {solver.skills[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Controlli mappa */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button className={cn(
          "w-8 h-8 rounded-md shadow-md flex items-center justify-center",
          darkMode ? "bg-gray-700 text-gray-200" : "bg-white"
        )}>
          <span className="text-lg font-medium">+</span>
        </button>
        <button className={cn(
          "w-8 h-8 rounded-md shadow-md flex items-center justify-center",
          darkMode ? "bg-gray-700 text-gray-200" : "bg-white"
        )}>
          <span className="text-lg font-medium">−</span>
        </button>
      </div>
    </div>
  );
};

export default FakeMap;
