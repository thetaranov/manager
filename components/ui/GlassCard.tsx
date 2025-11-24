
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth tilt effect
  const rotateX = useSpring(x, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    // Calculate rotation: 
    // Move mouse Down (positive Y) -> Rotate X negative (tilt back)
    // Move mouse Right (positive X) -> Rotate Y positive
    const rX = (mouseYFromCenter / height) * -10; // Max tilt 5deg
    const rY = (mouseXFromCenter / width) * 10;

    x.set(rX);
    y.set(rY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl p-8 md:p-12 overflow-hidden [perspective:1000px] ${className}`}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neutral-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Content wrapper with translateZ for depth */}
      <div className="relative z-10 [transform:translateZ(20px)]">
        {children}
      </div>
    </motion.div>
  );
};
