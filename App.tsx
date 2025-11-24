
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { FixedBackground } from './components/FixedBackground';
import { Hero } from './components/sections/Hero';
import { Competencies } from './components/sections/Competencies';
import { Offer } from './components/sections/Offer';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { MouseProvider } from './context/MouseContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoReady = () => {
    // Artificial delay to ensure smooth transition even if video loads instantly
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <MouseProvider>
      <div className="bg-black min-h-screen text-neutral-200 selection:bg-red-600/30 selection:text-white overflow-x-hidden">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="fixed inset-0 z-[100]"
            >
              <LoadingScreen />
            </motion.div>
          )}
        </AnimatePresence>

        <FixedBackground onReady={handleVideoReady} />
        <Navbar />
        
        {/* z-20 ensures content is above the background (z-0) but below Navbar (z-50) */}
        <main className="relative z-20 flex flex-col">
          <Hero />
          <Competencies />
          <Offer />
          <Experience />
          <Contact />
        </main>
        
        <footer className="relative z-20 py-8 bg-black border-t border-white/5 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} Taranov Project Management. All rights reserved.</p>
        </footer>
      </div>
    </MouseProvider>
  );
}

export default App;
