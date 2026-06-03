import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-beige bg-steamed p-6 shadow-warm",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
