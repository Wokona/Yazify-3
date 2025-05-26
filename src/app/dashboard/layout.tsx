
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  Target, 
  BrainCircuit, 
  Settings, 
  Menu, 
  X,
  CalendarDays, 
  FileClock,    
  BedDouble     
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { YazifyLogo } from "@/components/icons/YazifyLogo";

const sidebarNavItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/timetable", label: "Timetable", icon: CalendarDays },
  { href: "/dashboard/scheduler", label: "Scheduler", icon: FileClock },
  { href: "/dashboard/wellness", label: "Wellness", icon: BarChart3 },
  { href: "/dashboard/sleep", label: "Sleep", icon: BedDouble },
  { href: "/dashboard/goals", label: "Goals", icon: Target },
  { href: "/dashboard/insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const NavContent = () => (
    <nav className="flex flex-col gap-2">
      {sidebarNavItems.map((item) => {
        
        let finalIsActive = false;
        if (item.href === "/dashboard") {
          const otherDashboardPages = sidebarNavItems.filter(nav => nav.href !== "/dashboard");
          const isAnyOtherDashboardPageActive = otherDashboardPages.some(nav => pathname.startsWith(nav.href));
          finalIsActive = pathname === "/dashboard" && !isAnyOtherDashboardPageActive;
        } else {
           finalIsActive = pathname.startsWith(item.href);
        }

        return (
          <Link href={item.href} key={item.href} legacyBehavior passHref>
            <Button
              variant={finalIsActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                finalIsActive && "bg-primary/10 text-primary hover:bg-primary/20" 
              )}
              onClick={() => setIsMobileMenuOpen(false)} 
              as="a" // To work with legacyBehavior Link
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );

  if (!isMounted) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <aside className="w-64 bg-sidebar border-r p-6 hidden md:block fixed h-full"> {/* Changed bg-card to bg-sidebar */}
          <div className="flex items-center gap-2 text-2xl font-extrabold text-primary mb-8">
            <YazifyLogo className="h-7 w-7" />
            Yazify
          </div>
          {/* Placeholder for NavContent or simplified version for SSR */}
        </aside>
        <div className="flex-1 flex flex-col md:ml-64">
          <header className="p-4 border-b md:hidden bg-card sticky top-0 z-40"> {/* Changed to bg-card */}
            {/* Placeholder for mobile header */}
          </header>
          <main className="flex-1 p-6 bg-background">{children}</main> {/* Changed bg-muted/40 to bg-background */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background"> {/* Changed bg-muted/30 to bg-background */}
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-sidebar border-r p-6 hidden md:flex flex-col fixed h-full"> {/* Changed bg-card to bg-sidebar */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary mb-8">
          <YazifyLogo className="h-7 w-7" />
          Yazify
        </Link>
        <NavContent />
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header */}
        <header className="p-4 border-b bg-card md:hidden sticky top-0 z-40"> {/* Changed to bg-card */}
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-xl font-extrabold text-primary">
              <YazifyLogo className="h-6 w-6" />
              Yazify
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] p-6 bg-sidebar"> {/* Changed to bg-sidebar */}
                <div className="flex justify-between items-center mb-8">
                   <Link href="/dashboard" className="flex items-center gap-2 text-xl font-extrabold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    <YazifyLogo className="h-6 w-6" />
                    Yazify
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-5 w-5" />
                     </Button>
                  </SheetClose>
                </div>
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 p-6 ">{children}</main>
      </div>
    </div>
  );
}
