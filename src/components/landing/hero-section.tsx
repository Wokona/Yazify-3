
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const FloatingElement = ({ className, delay, style }: { className: string; delay: string, style?: React.CSSProperties }) => (
  <div
    className={`absolute rounded-full animate-float ${className}`}
    style={{ animationDelay: delay, ...style }}
  />
);

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render animations on client
  const animationProps = isMounted ? {} : { style: { animation: 'none' } };


  return (
    <section 
      className="relative text-primary-foreground py-20 md:py-32 overflow-hidden bg-cover bg-center hero-gradient" // text-white to text-primary-foreground, added hero-gradient class
      data-ai-hint="abstract green swirl" // Updated hint
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div> {/* Adjusted overlay */}
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        {isMounted && (
          <>
            {/* Adjusted floating element colors to be more theme-neutral or use theme vars if possible */}
            <FloatingElement className="w-20 h-20 bg-gradient-to-br from-green-200/70 to-green-300/70 opacity-70 top-[20%] left-[10%]" delay="0s" />
            <FloatingElement className="w-16 h-16 bg-gradient-to-br from-lime-200/70 to-emerald-300/70 opacity-70 top-[60%] right-[15%]" delay="2s" />
            <FloatingElement className="w-24 h-24 bg-gradient-to-br from-teal-200/70 to-cyan-300/70 opacity-70 bottom-[20%] left-[20%]" delay="4s" />
          </>
        )}
        
        <h1 className="text-4xl md:text-6xl font-bebas font-bold mb-6 animate-fadeInUp" {...animationProps}>
          Your Study Life, Simplified
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 animate-fadeInUp" style={isMounted ? {animationDelay: "0.2s"} : {animation: "none"}}>
          Seamlessly sync your class timetables, create smart study schedules, and track your wellness journey. All in one beautiful app designed for Mubas students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={isMounted ? {animationDelay: "0.4s"} : {animation: "none"}}>
          <Button asChild size="lg" className="cta-gradient text-primary-foreground font-semibold rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1">
            <Link href="/dashboard">
              <span>Access Dashboard</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-border/20 text-primary-foreground hover:bg-background/20 rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1">
            <Link href="#features">
              <span>Learn More</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
