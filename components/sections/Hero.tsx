
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SectionWrapper } from '../SectionWrapper';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionWrapper 
      id="hero" 
      overlayOpacity="bg-black/20"
    >
      <div className="flex flex-col items-center justify-center text-center h-[80vh]">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block relative z-30"
        >
          <span className="px-4 py-1.5 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-xs md:text-sm font-semibold tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            Доступен для новых проектов
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,1)] relative z-30"
        >
          Управляю полным циклом <br className="hidden md:block" />
          <motion.span 
            initial={{ color: "#ffffff" }}
            animate={{ color: "#dc2626" }}
            transition={{ duration: 1, delay: 1 }}
            className="drop-shadow-sm"
          >
            запуска производства
          </motion.span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-30"
        >
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-10 font-light drop-shadow-[0_4px_8px_rgba(0,0,0,1)] mx-auto font-medium">
            Проектный менеджер. Кризис-менеджер. Стратег.
            <br />
            <span className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Ваш единый центр контроля</span> для сложных промышленных проектов — от чертежа до рынка.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-red-500 transition-all duration-200 bg-neutral-800/40 backdrop-blur-md border border-red-600 rounded-lg hover:bg-red-600 hover:text-white shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] tracking-wide cursor-pointer z-40"
            >
              Обсудить сотрудничество
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="#competencies"
              onClick={(e) => scrollToSection(e, '#competencies')}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-black/40 border border-white/10 rounded-lg hover:bg-black/60 hover:border-white/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer z-40"
            >
              Изучить компетенции
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </SectionWrapper>
  );
};
