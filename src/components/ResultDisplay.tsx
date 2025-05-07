import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Scan } from 'lucide-react';

interface ResultDisplayProps {
  isLoading: boolean;
  result: Record<string, string> | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, result }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingState />
        ) : result ? (
          <ResultState result={result} />
        ) : (
          <PlaceholderState />
        )}
      </AnimatePresence>
    </div>
  );
};

const LoadingState = () => (
  <motion.div 
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center space-y-4"
  >
    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
    <p className="text-gray-600 text-center">
      Analyzing your Aadhaar card...<br />
      <span className="text-sm text-gray-500">Extracting details securely</span>
    </p>
  </motion.div>
);

const ResultState = ({ result }: { result: Record<string, string> }) => (
  <motion.div
    key="result"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-md p-6"
  >
    <div className="flex items-center mb-4 space-x-2">
      <CheckCircle2 className="w-6 h-6 text-green-500" />
      <h3 className="text-xl font-bold text-gray-800">
        Extracted Information
      </h3>
    </div>
    {Object.entries(result).map(([key, value]) => (
      <div 
        key={key} 
        className="flex justify-between py-3 border-b last:border-none"
      >
        <span className="font-medium text-gray-600 capitalize">
          {key.replace('_', ' ')}:
        </span>
        <span className="text-gray-800 font-semibold">{value}</span>
      </div>
    ))}
  </motion.div>
);

const PlaceholderState = () => (
  <motion.div
    key="placeholder"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center space-y-4"
  >
    <Scan className="w-16 h-16 text-gray-300" />
    <p className="text-gray-500 text-center">
      Processed data will appear here after upload
    </p>
  </motion.div>
);

export default ResultDisplay;