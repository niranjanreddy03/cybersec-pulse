import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Cpu, Briefcase, FlaskConical, Heart, DollarSign, Globe } from "lucide-react";

export interface NewsCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  query: string;
  color: string;
}

export const newsCategories: NewsCategory[] = [
  {
    id: 'all',
    name: 'All News',
    description: 'Latest from all categories',
    icon: <Globe className="h-4 w-4" />,
    query: 'cybersecurity OR technology OR business OR science',
    color: 'bg-primary/10 text-primary border-primary/20'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security threats, vulnerabilities, and protection',
    icon: <Shield className="h-4 w-4" />,
    query: 'cybersecurity OR "cyber security" OR hacking OR malware OR ransomware OR "data breach"',
    color: 'bg-red-500/10 text-red-600 border-red-500/20'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'AI, software, hardware, and tech innovations',
    icon: <Cpu className="h-4 w-4" />,
    query: 'technology OR "artificial intelligence" OR AI OR "machine learning" OR software OR hardware',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Startups, investments, and market news',
    icon: <Briefcase className="h-4 w-4" />,
    query: 'business OR startup OR "venture capital" OR IPO OR merger OR acquisition',
    color: 'bg-green-500/10 text-green-600 border-green-500/20'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Research, discoveries, and breakthroughs',
    icon: <FlaskConical className="h-4 w-4" />,
    query: 'science OR research OR discovery OR breakthrough OR innovation OR study',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Medical advances and healthcare tech',
    icon: <Heart className="h-4 w-4" />,
    query: 'health OR medical OR healthcare OR medicine OR pharmaceutical OR "clinical trial"',
    color: 'bg-pink-500/10 text-pink-600 border-pink-500/20'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Fintech, crypto, and financial markets',
    icon: <DollarSign className="h-4 w-4" />,
    query: 'finance OR banking OR cryptocurrency OR bitcoin OR "financial technology" OR fintech',
    color: 'bg-orange-500/10 text-orange-600 border-orange-500/20'
  }
];

interface NewsCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showAsGrid?: boolean;
}

export function NewsCategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  showAsGrid = false 
}: NewsCategoryFilterProps) {
  if (showAsGrid) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {newsCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="flex flex-col items-center gap-2 h-auto py-3 px-2 text-xs"
          >
            {category.icon}
            <span className="text-center leading-tight">{category.name}</span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {newsCategories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedCategory === category.id ? '' : category.color
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.icon}
          <span className="ml-1">{category.name}</span>
        </Badge>
      ))}
    </div>
  );
}

export function NewsCategorySelect({ 
  selectedCategory, 
  onCategoryChange 
}: NewsCategoryFilterProps) {
  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {newsCategories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            <div className="flex items-center gap-2">
              {category.icon}
              <span>{category.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}