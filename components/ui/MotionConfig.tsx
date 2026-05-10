'use client';

import { MotionConfig, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AppMotionConfig({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>;
}
