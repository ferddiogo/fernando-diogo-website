'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function ScrollReveal({ children, delay = 0, y = 16, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
