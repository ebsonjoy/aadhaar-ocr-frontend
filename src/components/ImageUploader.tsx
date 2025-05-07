import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Scan, Loader2, } from 'lucide-react';
import ImageUploadBox from './ImageUploadBox';
import ErrorDisplay from './ErrorDisplay';

interface ImageUploaderProps {
  frontPreview: string | null;
  backPreview: string | null;
  error: string | null;
  isLoading: boolean;
  handleFileChange: (
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => void;
  handleUpload: () => Promise<void>;
  setFront: React.Dispatch<React.SetStateAction<File | null>>;
  setBack: React.Dispatch<React.SetStateAction<File | null>>;
  setFrontPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setBackPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setFullImageView: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  frontPreview,
  backPreview,
  error,
  isLoading,
  handleFileChange,
  handleUpload,
  setFront,
  setBack,
  setFrontPreview,
  setBackPreview,
  setFullImageView
}) => {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.h2 
          className="text-4xl font-bold text-blue-900 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Aadhaar OCR
        </motion.h2>
        <p className="text-gray-600 max-w-xs mx-auto">
          Securely upload and extract information from your Aadhaar card
        </p>
      </div>

      <ErrorDisplay error={error} />
      <div className="grid grid-cols-2 gap-4">
        <ImageUploadBox 
          label="Front Side" 
          preview={frontPreview}
          inputRef={frontInputRef}
          onFileChange={(file) => handleFileChange(file, setFront, setFrontPreview)}
          isDisabled={isLoading}
          setFullImageView={setFullImageView}
        />
        <ImageUploadBox 
          label="Back Side" 
          preview={backPreview}
          inputRef={backInputRef}
          onFileChange={(file) => handleFileChange(file, setBack, setBackPreview)}
          isDisabled={isLoading}
          setFullImageView={setFullImageView}
        />
      </div>
      <motion.button
        onClick={handleUpload}
        disabled={!frontPreview || !backPreview || isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 
          rounded-xl hover:bg-blue-700 transition duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center space-x-2 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Scan className="w-5 h-5 mr-2" />
        )}
        <span>{isLoading ? 'Processing...' : 'Scan Aadhaar'}</span>
      </motion.button>
    </div>
  );
};

export default ImageUploader;