'use client';

import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function CountUp({ value }: { value: string }) {
  const targetMatch = value.match(/^(\d+)(.*)$/);
  const target = targetMatch ? Number(targetMatch[1]) : 0;
  const suffix = targetMatch ? targetMatch[2] : '';

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motion = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView || !targetMatch) return;
    const controls = animate(motion, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, motion, target, targetMatch]);

  if (!targetMatch) return <>{value}</>;

  return <span ref={ref}>{display}{suffix}</span>;
}
