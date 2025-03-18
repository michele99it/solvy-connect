
import React from 'react';
import { cn } from '@/lib/utils';
import { CategoryIcon, CategoryType } from './CategoryIcon';

export interface CategorySelectProps {
  categories: string[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  className?: string;
  darkMode?: boolean;
}

export function CategorySelect({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  className,
  darkMode = false
}: CategorySelectProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        return (
          <div key={category} className="relative">
            <button
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isSelected 
                  ? "text-blue-600 dark:text-blue-400" 
                  : darkMode 
                    ? "text-gray-400 hover:text-gray-200" 
                    : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => onSelectCategory(category as CategoryType)}
            >
              <CategoryIcon category={category as CategoryType} className={isSelected ? "text-blue-600 dark:text-blue-400" : ""} />
              <span>{category}</span>
            </button>
            {isSelected && (
              <div 
                className="absolute -bottom-1 left-0 bg-blue-100 dark:bg-blue-900/30 h-1 rounded-full"
                style={{ width: `${category.length * 8 + 36}px` }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
