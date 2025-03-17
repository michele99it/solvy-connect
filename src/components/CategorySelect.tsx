
import React from "react";
import { cn } from "@/lib/utils";
import { CategoryIcon, type CategoryType } from "./CategoryIcon";
import { useAppContext } from "@/contexts/AppContext";

interface CategorySelectProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { darkMode, language } = useAppContext();
  
  const categories: { id: CategoryType; name: string }[] = [
    { id: "technology", name: language === "it" ? "Tecnologia" : "Technology" },
    { id: "home", name: language === "it" ? "Casa" : "Home" },
    { id: "maintenance", name: language === "it" ? "Manutenzione" : "Maintenance" },
    { id: "education", name: language === "it" ? "Educazione" : "Education" },
    { id: "professional", name: language === "it" ? "Professionale" : "Professional" },
    { id: "shopping", name: language === "it" ? "Shopping" : "Shopping" },
    { id: "transport", name: language === "it" ? "Trasporti" : "Transport" },
    { id: "food", name: language === "it" ? "Cibo" : "Food" },
    { id: "pets", name: language === "it" ? "Animali" : "Pets" },
    { id: "music", name: language === "it" ? "Musica" : "Music" },
    { id: "art", name: language === "it" ? "Arte" : "Art" },
    { id: "other", name: language === "it" ? "Altro" : "Other" },
  ];

  return (
    <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all",
            selectedCategory === category.id
              ? darkMode
                ? "bg-blue-900/30 border border-blue-500/50"
                : "bg-blue-50 border border-blue-200"
              : darkMode
              ? "hover:bg-gray-800 border border-gray-700"
              : "hover:bg-gray-50 border border-gray-100"
          )}
        >
          <CategoryIcon 
            category={category.id} 
            size={18} 
            bgClassName="w-9 h-9"
          />
          <span className={cn(
            "text-xs font-medium text-center",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategorySelect;
