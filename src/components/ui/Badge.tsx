import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-beige bg-foam px-2.5 py-0.5 text-xs font-medium text-mocha",
        className,
      )}
    >
      {children}
    </span>
  );
}
