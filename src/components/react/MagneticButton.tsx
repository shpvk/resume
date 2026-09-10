import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useRef } from 'react';

interface Props {
  href: string;
  label: string;
  variant?: 'solid' | 'ghost';

  external?: boolean;

  download?: boolean;
  icon?: ReactNode;

  strength?: number;
}

export default function MagneticButton({
  href,
  label,
  variant = 'solid',
  external = false,
  download = false,
  icon,
  strength = 10,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 250, damping: 18, mass: 0.4 };
  const x = useSpring(
    useTransform(px, (v) => v * strength * 2),
    spring,
  );
  const y = useSpring(
    useTransform(py, (v) => v * strength * 2),
    spring,
  );

  const labelX = useSpring(
    useTransform(px, (v) => v * strength),
    spring,
  );
  const labelY = useSpring(
    useTransform(py, (v) => v * strength),
    spring,
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced) return;
      const rect = event.currentTarget.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [px, py, reduced],
  );

  const onPointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  const base =
    'group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-mono text-sm transition-colors';
  let styles: string;
  if (variant === 'solid') {
    styles = 'bg-accent text-canvas hover:bg-accent-strong';
  } else {
    styles = 'bg-subtle text-ink hover:bg-accent-soft hover:text-accent';
  }
  let target: '_blank' | undefined;
  let rel: string | undefined;
  if (external) {
    target = '_blank';
    rel = 'noreferrer noopener';
  } else {
    target = undefined;
    rel = undefined;
  }

  let buttonStyle;
  let labelStyle;
  let tapAnimation;
  if (reduced) {
    buttonStyle = undefined;
    labelStyle = undefined;
    tapAnimation = undefined;
  } else {
    buttonStyle = { x, y };
    labelStyle = { x: labelX, y: labelY };
    tapAnimation = { scale: 0.97 };
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      target={target}
      rel={rel}
      className={`${base} ${styles}`}
      style={buttonStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileTap={tapAnimation}
    >
      {variant === 'solid' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
        />
      )}

      <motion.span className="relative flex items-center gap-2" style={labelStyle}>
        {label}
        {icon}
      </motion.span>
    </motion.a>
  );
}
