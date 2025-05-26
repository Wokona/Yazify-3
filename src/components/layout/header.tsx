
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { YazifyLogo } from "@/components/icons/YazifyLogo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Fallback for SSR to avoid hydration mismatch if Sheet isn't ready
    return (
      <header className="py-5 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-opacity-80 backdrop-blur-md hero-gradient shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-white">
            <YazifyLogo className="h-7 w-7" />
            Yazify
          </Link>
           <div className="hidden md:flex items-center gap-6">
             {/* Placeholder for nav links or simplified version */}
           </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>
    );
  }
  
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="py-5 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-opacity-80 backdrop-blur-md hero-gradient shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary-foreground"> {/* Changed to primary-foreground for hero-gradient */}
          <YazifyLogo className="h-7 w-7" />
          Yazify
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-primary-foreground/90 hover:text-primary-foreground font-medium px-3 py-2 rounded-md transition-colors hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button className="cta-gradient text-primary-foreground font-semibold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow hover:transform hover:-translate-y-0.5"> {/* Ensured primary-foreground for text on gradient */}
            <Link href="/dashboard">Access Dashboard</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground"> {/* Changed to primary-foreground */}
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-card p-6"> {/* Changed to bg-card for consistency */}
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                     <Link
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className="block w-full text-left text-card-foreground hover:text-primary font-medium text-lg p-2 rounded-md hover:bg-muted"
                      >
                      <span>{link.label}</span>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button className="cta-gradient text-primary-foreground font-semibold rounded-full mt-4 w-full">
                    <Link href="/dashboard">Access Dashboard</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
