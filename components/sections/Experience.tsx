
import React from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { motion } from 'framer-motion';

export const Experience: React.FC = () => {
  return (
    <SectionWrapper 
      id="experience" 
      overlayOpacity="bg-black/80"
    >
      <div className="flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        >
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
             Опыт организации производства{' '}
             <motion.span 
               initial={{ color: "#ffffff" }}
               whileInView={{ color: "#dc2626" }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
             >
               с нуля
             </motion.span>
           </h2>
           <div className="space-y-6">
             <p className="text-lg text-neutral-300 font-light leading-relaxed">
               Я не просто теоретик. Я успешно создал с нуля собственное производство, пройдя путь от пустых стен до отгрузки готовой продукции.
             </p>
             <p className="text-lg text-neutral-300 font-light leading-relaxed">
               Мной была сформирована эффективная команда, отлажены технологические процессы и выстроена цепочка сбыта. Теперь я готов применить этот концентрированный опыт для масштабирования вашего бизнеса и минимизации ваших рисков.
             </p>
           </div>
        </motion.div>

        <div className="w-full md:w-1/2">
          <GlassCard className="relative">
            <div className="space-y-8">
              <div className="border-l-2 border-red-600 pl-6 ml-2">
                 <span className="block text-4xl font-bold text-white mb-1">100%</span>
                 <p className="text-neutral-400 text-sm">Погружение в процессы компании</p>
              </div>
              <div className="border-l-2 border-neutral-700 pl-6 ml-2">
                 <span className="block text-4xl font-bold text-white mb-1">24/7</span>
                 <p className="text-neutral-400 text-sm">Контроль на этапе запуска</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
};