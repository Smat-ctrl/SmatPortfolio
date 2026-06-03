import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-caramel text-steamed hover:bg-caramel-deep shadow-warm border border-caramel",
  secondary:
    "bg-transparent text-espresso border border-beige hover:border-caramel hover:text-caramel-deep",
  ghost: "bg-transparent text-mocha hover:text-caramel-deep border border-transparent",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  external,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
    variants[variant],
    className,
  );

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "cursor-not-allowed opacity-60")}
    >
      {children}
    </button>
  );
}
