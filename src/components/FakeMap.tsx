
import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Helper {
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
  helpers: Helper[];
  onHelperClick: (helper: Helper) => void;
}

const FakeMap = ({ helpers, onHelperClick }: FakeMapProps) => {
  const [hoveredHelper, setHoveredHelper] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[400px] bg-blue-50 rounded-lg overflow-hidden">
      {/* Mappa di sfondo stilizzata */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#CBD5E1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Strade simulate */}
          <line x1="0" y1="200" x2="400" y2="200" stroke="#CBD5E1" strokeWidth="6" />
          <line x1="100" y1="0" x2="100" y2="400" stroke="#CBD5E1" strokeWidth="4" />
          <line x1="250" y1="50" x2="350" y2="300" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="50" y1="350" x2="300" y2="280" stroke="#CBD5E1" strokeWidth="3" />
          
          {/* Aree simulate */}
          <rect x="20" y="20" width="120" height="80" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
          <rect x="280" y="180" width="100" height="120" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
          <rect x="150" y="250" width="80" height="100" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
          <circle cx="50" cy="250" r="30" fill="#E2E8F0" stroke="#CBD5E1" />
        </svg>
      </div>
      
      {/* Posizione utente */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-solvy-blue flex items-center justify-center text-white">
            <Navigation size={14} />
          </div>
          <div className="absolute -top-1 -right-1 -left-1 -bottom-1 rounded-full bg-solvy-blue/30 animate-ping" />
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-solvy-blue text-xs font-medium py-0.5 px-2 rounded-full shadow-sm whitespace-nowrap">
            Tu
          </span>
        </div>
      </div>
      
      {/* Helper pins */}
      {helpers.map((helper) => (
        <div 
          key={helper.id}
          className="absolute cursor-pointer z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
          style={{ 
            left: `${helper.position.x}%`, 
            top: `${helper.position.y}%`, 
          }}
          onClick={() => onHelperClick(helper)}
          onMouseEnter={() => setHoveredHelper(helper.id)}
          onMouseLeave={() => setHoveredHelper(null)}
        >
          <div className={cn(
            "flex flex-col items-center",
            hoveredHelper === helper.id && "scale-110 drop-shadow-md"
          )}>
            <MapPin 
              size={32} 
              className={cn(
                "text-red-500 fill-white transition-colors",
                hoveredHelper === helper.id && "text-red-600 fill-red-100"
              )} 
            />
            <div className={cn(
              "absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full flex items-center justify-center",
              hoveredHelper === helper.id && "bg-red-100"
            )}>
              <span className="text-[10px] font-bold text-red-500">{helper.id}</span>
            </div>
            
            {hoveredHelper === helper.id && (
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-1.5 min-w-28 text-center">
                <p className="text-xs font-medium">{helper.name}</p>
                <p className="text-[10px] text-solvy-gray">{helper.skills[0]}</p>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Controlli mappa */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center">
          <span className="text-lg font-medium">+</span>
        </button>
        <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center">
          <span className="text-lg font-medium">−</span>
        </button>
      </div>
    </div>
  );
};

export default FakeMap;
