"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  className?: string;
}

export function Tabs({ items, className }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const activeItem = items.find((i) => i.id === active) ?? items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex flex-wrap gap-1 border-b border-primary/10"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(item.id)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted hover:text-charcoal"
              )}
            >
              {item.label}
              {isActive ? (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="pt-6">{activeItem?.content}</div>
    </div>
  );
}
