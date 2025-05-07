import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
  <AnimatePresence>
    {error && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
      >
        <XCircle className="w-5 h-5 inline-block mr-2 -mt-1" />
        {error}
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorDisplay;