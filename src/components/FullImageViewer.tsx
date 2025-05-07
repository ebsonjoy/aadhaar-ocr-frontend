import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface FullImageViewerProps {
  fullImageView: string | null;
  setFullImageView: (url: string | null) => void;
}

const FullImageViewer: React.FC<FullImageViewerProps> = ({ 
  fullImageView, 
  setFullImageView 
}) => {
  return (
    <AnimatePresence>
      {fullImageView && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFullImageView(null)}
        >
          <motion.img 
            src={fullImageView} 
            alt="Full Image View"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-full max-h-full object-contain"
          />
          <button 
            onClick={() => setFullImageView(null)}
            className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition"
          >
            <XCircle className="w-8 h-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullImageViewer;