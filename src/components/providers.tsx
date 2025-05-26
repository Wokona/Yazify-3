"use client";

import type { ReactNode } from 'react';

// If you need client-side providers like React Query or a Theme provider, add them here.
// For now, it's a simple pass-through.
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
