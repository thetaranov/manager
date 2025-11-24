
import React from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { Settings, TrendingUp, Cpu, PenTool, Layout, BarChart3, Factory, Globe, ClipboardCheck, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const technicalSkills = [
  { icon: BarChart3, text: "Анализ и агрегация спроса" },
  { icon: Cpu, text: "Инженерное 3D-моделирование" },
  { icon: Layout, text: "Картирование проектов" },
  { icon: Factory, text: "Запуск линий" },
  { icon: Settings, text: "Наладка техпроцессов" },
  { icon: ClipboardCheck, text: "Контроль качества (OTK)" },
];

const marketingSkills = [
  { icon: Globe, text: "Digital-упаковка продукта" },
  { icon: TrendingUp, text: "Стратегия продвижения" },
  { icon: PenTool, text: "Развитие продуктовой матрицы" },
  { icon: Search, text: "Поиск точек роста и рисков" },
];

export const Competencies: React.FC = () => {
  return (
    <SectionWrapper 
      id="competencies" 
      overlayOpacity="bg-black/80"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Закрываю{' '}
          <motion.span 
            initial={{ color: "#ffffff" }}
            whileInView={{ color: "#dc2626" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            все этапы проекта
          </motion.span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Системный подход: от чертежа до стабильных продаж.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical Column - Red Accent */}
        <GlassCard className="h-full border-l-2 border-l-red-600 !p-6 md:!p-8" delay={0.2}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-600/10 rounded-lg border border-red-600/20">
              <Settings className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-white">Технический блок</h3>
          </div>
          
          <div className="space-y-4">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600/50 group-hover:bg-red-500 transition-colors shrink-0" />
                <p className="text-neutral-300 text-base font-light group-hover:text-white transition-colors">{skill.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Marketing Column - Red Accent */}
        <GlassCard className="h-full border-l-2 border-l-red-600 !p-6 md:!p-8" delay={0.4}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-600/10 rounded-lg border border-red-600/20">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-white">Маркетинг и Развитие</h3>
          </div>
          
          <div className="space-y-4">
            {marketingSkills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600/50 group-hover:bg-red-500 transition-colors shrink-0" />
                <p className="text-neutral-300 text-base font-light group-hover:text-white transition-colors">{skill.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
