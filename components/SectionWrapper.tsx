
import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  overlayOpacity?: string; // Kept in interface to prevent props error, but not used
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  children 
}) => {
  return (
    <section id={id} className="relative min-h-screen w-full flex items-center justify-center py-16 md:py-24 px-6 md:px-12">
      {/* Content */}
      <div className="container mx-auto max-w-6xl z-10 relative">
        {children}
      </div>
    </section>
  );
};
