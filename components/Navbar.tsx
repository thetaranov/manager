
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Главная', href: '#hero', id: 'hero' },
  { label: 'Компетенции', href: '#competencies', id: 'competencies' },
  { label: 'Условия', href: '#offer', id: 'offer' },
  { label: 'Опыт', href: '#experience', id: 'experience' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-white/5 py-4 transition-all duration-500"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="flex items-center group">
          {/* Logo Image */}
          <img 
            src="https://www.dropbox.com/scl/fi/h6h4fpn1maosn9n3jwxtt/taranov_logo.png?rlkey=w37pyvyqs6djszprj4rqd0mfl&st=fgrp16kj&raw=1" 
            alt="Taranov Logo" 
            className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-sm font-medium transition-colors uppercase tracking-wider relative
                ${activeSection === item.id ? 'text-red-500' : 'text-neutral-400 hover:text-white'}
              `}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 rounded-full" />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-6 py-2.5 text-sm font-bold text-red-500 bg-neutral-800/40 backdrop-blur-md border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] tracking-wide"
          >
            СВЯЗАТЬСЯ
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-neutral-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-lg py-2 border-b border-white/5 uppercase tracking-wider
                ${activeSection === item.id ? 'text-red-500' : 'text-neutral-300'}
              `}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="mt-4 w-full text-center py-4 font-bold text-red-500 bg-neutral-800/40 backdrop-blur-md border border-red-600 rounded-lg hover:bg-red-600 hover:text-white uppercase tracking-widest transition-colors"
          >
            Связаться
          </a>
        </div>
      )}
    </nav>
  );
};