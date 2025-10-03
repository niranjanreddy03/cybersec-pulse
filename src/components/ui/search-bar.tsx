import { Search } from "lucide-react";
import { Input } from "./input";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({ placeholder = "Search", onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10 bg-muted/50 border-0"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}
