import { useState } from "react";

interface Tab {
  label: string;
  value: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (value: string) => void;
}

export function TabNavigation({ tabs, defaultTab, onTabChange }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <div className="flex items-center gap-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`pb-3 px-1 text-base font-semibold transition-colors relative ${
            activeTab === tab.value
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {tab.label}
          {activeTab === tab.value && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
