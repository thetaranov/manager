
import React, { createContext, useContext, useEffect } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

interface MouseContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export const useMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMouse must be used within a MouseProvider');
  }
  return context;
};

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mouseX = useMotionValue(0); // Range: -0.5 to 0.5
  const mouseY = useMotionValue(0); // Range: -0.5 to 0.5

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (-0.5 to 0.5)
      // Doing this calculation once here is much more efficient than in every component
      const xPct = (e.clientX / window.innerWidth) - 0.5;
      const yPct = (e.clientY / window.innerHeight) - 0.5;
      
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      {children}
    </MouseContext.Provider>
  );
};
