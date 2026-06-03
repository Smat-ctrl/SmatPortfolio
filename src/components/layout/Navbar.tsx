"use client";

import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "@/lib/animations";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-beige/80 bg-cream/90 shadow-warm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="#"
          className="font-serif text-lg font-medium text-espresso transition-colors hover:text-caramel"
          onClick={closeMenu}
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-mocha transition-colors hover:text-caramel-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button href={siteConfig.resumeUrl} variant="primary" external>
              Resume
            </Button>
          </li>
        </ul>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-beige bg-steamed md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-full bg-espresso transition-all duration-300",
                isOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-espresso transition-all duration-300",
                isOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-espresso transition-all duration-300",
                isOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-sm md:hidden"
          >
            <ul className="flex h-full flex-col items-center justify-center gap-8">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-serif text-2xl text-espresso transition-colors hover:text-caramel"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  href={siteConfig.resumeUrl}
                  variant="primary"
                  external
                  onClick={closeMenu}
                >
                  Resume
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
