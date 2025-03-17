
import React from "react";
import { cn } from "@/lib/utils";
import {
  Laptop,
  Home,
  Wrench,
  BookOpen,
  Briefcase,
  ShoppingBag,
  Car,
  Utensils,
  Dog,
  Music,
  Palette,
  LayoutGrid
} from "lucide-react";

type CategoryType =
  | "technology"
  | "home"
  | "maintenance"
  | "education"
  | "professional"
  | "shopping"
  | "transport"
  | "food"
  | "pets"
  | "music"
  | "art"
  | "other";

interface CategoryIconProps {
  category: CategoryType;
  size?: number;
  className?: string;
  bgClassName?: string;
}

export const CategoryIcon = ({ 
  category, 
  size = 16, 
  className = "",
  bgClassName = "w-7 h-7"
}: CategoryIconProps) => {
  const getIcon = () => {
    switch (category) {
      case "technology":
        return <Laptop size={size} />;
      case "home":
        return <Home size={size} />;
      case "maintenance":
        return <Wrench size={size} />;
      case "education":
        return <BookOpen size={size} />;
      case "professional":
        return <Briefcase size={size} />;
      case "shopping":
        return <ShoppingBag size={size} />;
      case "transport":
        return <Car size={size} />;
      case "food":
        return <Utensils size={size} />;
      case "pets":
        return <Dog size={size} />;
      case "music":
        return <Music size={size} />;
      case "art":
        return <Palette size={size} />;
      default:
        return <LayoutGrid size={size} />;
    }
  };

  const getBgColor = () => {
    switch (category) {
      case "technology":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "home":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "maintenance":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      case "education":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "professional":
        return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "shopping":
        return "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400";
      case "transport":
        return "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400";
      case "food":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "pets":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      case "music":
        return "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400";
      case "art":
        return "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full", 
      getBgColor(),
      bgClassName
    )}>
      <div className={className}>{getIcon()}</div>
    </div>
  );
};

export type { CategoryType };
