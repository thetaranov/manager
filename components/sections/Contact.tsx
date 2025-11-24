
import React from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { Send, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <SectionWrapper 
      id="contact" 
      overlayOpacity="bg-black/80"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <motion.span 
              initial={{ color: "#ffffff" }}
              whileInView={{ color: "#dc2626" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              Свяжитесь
            </motion.span>{' '}
            со мной
          </h2>
          
          <div className="mb-4">
             <h3 className="text-xl md:text-2xl text-white font-medium tracking-wide">
               Таранов Филипп Сергеевич
             </h3>
          </div>

          <p className="text-neutral-400">Открыт к предложениям и новым проектам</p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          
           {/* Telegram */}
           <a 
             href="https://t.me/thetaranov" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group"
           >
             <div className="bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl py-5 px-8 flex items-center gap-6 transition-all duration-300 hover:bg-neutral-800/60 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] min-w-[300px]">
                <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 border border-red-600/20">
                    <Send className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">Telegram</span>
                    <span className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">@thetaranov</span>
                </div>
             </div>
           </a>

           {/* Phone */}
           <a 
             href="tel:+79939099309" 
             className="group"
           >
             <div className="bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl py-5 px-8 flex items-center gap-6 transition-all duration-300 hover:bg-neutral-800/60 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] min-w-[300px]">
                <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 border border-red-600/20">
                    <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">Телефон</span>
                    <span className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">8 993 909 93 09</span>
                </div>
             </div>
           </a>

        </div>
      </div>
    </SectionWrapper>
  );
};
