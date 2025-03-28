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
          
          {/* Optional Navigation or Additional Actions */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="flex items-center space-x-4">
              <motion.li 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  Home
                </a>
              </motion.li>
              <motion.li 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  About
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        </div>
      </header>
    );
  }