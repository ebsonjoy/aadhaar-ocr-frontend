'use client'
import { Scan } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    return (
      <header className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Scan className="mr-3 text-white" size={28} strokeWidth={2} />
            </motion.div>
            <h1 className="text-xl font-bold text-white tracking-wider">
              OCR Insight
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/90 text-sm font-medium">
              Extract text from images instantly
            </p>
          </motion.div>
        </div>
      </header>
    );
}