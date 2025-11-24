import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <motion.img 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://www.dropbox.com/scl/fi/h6h4fpn1maosn9n3jwxtt/taranov_logo.png?rlkey=w37pyvyqs6djszprj4rqd0mfl&st=fgrp16kj&raw=1" 
        alt="Taranov Logo" 
        className="h-16 md:h-24 w-auto mb-8 object-contain"
      />
      <div className="w-10 h-10 border-4 border-red-900 border-t-red-600 rounded-full animate-spin" />
    </div>
  );
};