// src/components/icons/YazifyLogo.tsx
import type { SVGProps } from 'react';

export function YazifyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props} // Spread className, width, height etc.
    >
      <defs>
        <linearGradient id="yazifyAppLogoGradient" x1="1" y1="0" x2="0" y2="1"> {/* 135deg gradient from top-right to bottom-left */}
          <stop offset="0%" stopColor="#667eea" /> {/* Color from HTML example .app-logo */}
          <stop offset="100%" stopColor="#764ba2" /> {/* Color from HTML example .app-logo */}
        </linearGradient>
      </defs>
      <rect
        width="100"
        height="100"
        rx="25" // (30/120)*100, approximating border-radius: 30px on a 120px element
        fill="url(#yazifyAppLogoGradient)"
      />
      <text
        x="50%"
        y="50%"
        dy=".3em" // Adjust vertical alignment for better centering
        textAnchor="middle"
        fill="white" // Text color from HTML example
        fontSize="50" // Adjusted font size for visibility within a 100x100 viewbox
        fontWeight="bold" // Font weight from HTML example
        fontFamily="var(--font-geist-sans), system-ui, sans-serif" // Use app's primary sans font
      >
        Y
      </text>
    </svg>
  );
}
