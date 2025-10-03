import { DollarSign, Trophy, Zap } from "lucide-react";
import { Button } from "./button";

interface CategoryPillsProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function CategoryPills({ activeCategory = "all", onCategoryChange }: CategoryPillsProps) {
  const categories = [
    { label: "All", value: "all", icon: null },
    { label: "Finance", value: "finance", icon: DollarSign },
    { label: "Sport", value: "sport", icon: Trophy },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.value;
        
        return (
          <Button
            key={category.value}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange?.(category.value)}
            className={`rounded-full px-4 whitespace-nowrap ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "bg-background border-border"
            }`}
          >
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}
