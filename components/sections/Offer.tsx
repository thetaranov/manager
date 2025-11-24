
import React from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { TrendingUp, Users, Wallet, Warehouse } from 'lucide-react';
import { motion } from 'framer-motion';

export const Offer: React.FC = () => {
  return (
    <SectionWrapper 
      id="offer" 
      overlayOpacity="bg-black/80"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Что я ищу для{' '}
            <motion.span 
              initial={{ color: "#ffffff" }}
              whileInView={{ color: "#dc2626" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              взаимного успеха
            </motion.span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Прозрачные условия для достижения максимальной эффективности.
          </p>
        </motion.div>

        <GlassCard className="border-t-4 border-t-red-600 !p-6 md:!p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900/50 flex items-center justify-center mb-4 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Вознаграждение</h3>
              <p className="text-neutral-300 text-sm">Ставка от <br/><span className="text-xl font-bold text-red-600">200 000 ₽</span><br/> в месяц + KPI</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900/50 flex items-center justify-center mb-4 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                <Warehouse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ресурсы</h3>
              <p className="text-neutral-300 text-sm">Выделение площади под <span className="text-white font-medium">экспериментальный цех</span> с необходимыми мощностями и персоналом.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900/50 flex items-center justify-center mb-4 text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Команда</h3>
              <p className="text-neutral-300 text-sm">Возможность привлечения моей <span className="text-white font-medium">готовой команды</span> экспертов.</p>
            </div>

          </div>

          <div className="mt-8 p-6 bg-red-900/10 border border-red-600/20 rounded-xl">
             <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-red-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Ориентир на финансовый результат</h4>
                  <p className="text-neutral-300 text-base leading-relaxed">
                    Я зарабатываю на том, что помогаю вам зарабатывать больше. Моя задача — выстроить процессы так, чтобы минимизировать издержки и увеличить маржинальность вашего продукта.
                  </p>
                </div>
             </div>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
