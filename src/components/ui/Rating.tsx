import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Rating({ value, size = 14, showValue = false, count, className }: RatingProps) {
  const filled = Math.round(value);
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center" aria-label={`${value} out of 5 stars`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={cn(
              "fill-current",
              i < filled ? "text-gold" : "text-primary/20"
            )}
          />
        ))}
      </div>
      {showValue ? (
        <span className="text-xs text-muted">
          {value.toFixed(1)}
          {typeof count === "number" ? ` (${count})` : ""}
        </span>
      ) : null}
    </div>
  );
}
