
"use client";
import { useEffect, useState } from "react";

const ScreenCircle = ({ className }: { className: string }) => (
  <div className={`absolute w-16 h-16 rounded-full bg-primary-foreground/30 ${className}`} /> // Changed to primary-foreground/30 for better contrast on gradient
);

export default function PhoneMockupSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render animations on client
  const animationProps = isMounted ? {} : { style: { animation: 'none' } };

  return (
    <section id="about" className="py-16 md:py-24 hero-gradient"> {/* Using hero-gradient for consistency */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block animate-phoneFloat" {...animationProps}>
          <div className="w-[300px] h-[600px] bg-neutral-800 rounded-[40px] p-5 shadow-2xl mx-auto">
            <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-secondary rounded-[30px] flex flex-col items-center justify-center relative overflow-hidden"> {/* Themed gradient */}
              {isMounted && (
                <>
                  <ScreenCircle className="top-[20%] left-[20%]" />
                  <ScreenCircle className="top-[40%] right-[15%]" />
                  <ScreenCircle className="bottom-[30%] left-[25%]" />
                </>
              )}
              <div className="relative z-10 text-primary-foreground"> {/* Text color for on-gradient screen */}
                <h3 className="text-2xl font-bold mb-2">Beautiful Design</h3>
                <p className="text-sm">Inspired by the apps you love</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
