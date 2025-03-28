'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileUp, 
  Scan, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Maximize 
} from 'lucide-react';

const AadhaarUpload = () => {
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fullImageView, setFullImageView] = useState<string | null>(null);
  const frontInputRef = useRef<HTMLInputElement>(null!);
  const backInputRef = useRef<HTMLInputElement>(null!);

  const handleFileChange = useCallback((
    file: File | null, 
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleUpload = async () => {
    // Reset previous state
    setError(null);
    setResult(null);
    setIsLoading(true);

    // Validation checks
    if (!front || !back) {
      setError('Both front and back images are required');
      setIsLoading(false);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(front.type) || !allowedTypes.includes(back.type)) {
      setError('Only JPEG and PNG images are allowed');
      setIsLoading(false);
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (front.size > maxSize || back.size > maxSize) {
      setError('Each file should be less than 5MB');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('front', front);
    formData.append('back', back);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // const response = await fetch('http://localhost:5000/api/ocr/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ocr/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      console.log('daaaaaaaaaa',data)
      setResult(data);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to process images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ImageUploadBox = ({ 
    label, 
    preview, 
    inputRef, 
    onFileChange,
    isDisabled
  }: { 
    label: string, 
    preview: string | null, 
    inputRef: React.RefObject<HTMLInputElement>,
    onFileChange: (file: File | null) => void,
    isDisabled?: boolean
  }) => (
    <motion.div 
      className={`relative w-full border-2 border-dashed rounded-2xl p-4 transition-all duration-300 
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'border-blue-200 hover:border-blue-500 hover:shadow-lg'}
      `}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      <input
        type="file"
        ref={inputRef}
        accept="image/jpeg,image/png,image/jpg"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        disabled={isDisabled}
      />
      {preview ? (
        <>
          <motion.img 
            src={preview} 
            alt={label} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-48 object-cover rounded-xl 
              ${isDisabled ? 'filter grayscale' : 'hover:brightness-90'}`}
          />
          <button 
            onClick={() => setFullImageView(preview)}
            className="absolute top-2 right-2 bg-white/70 rounded-full p-1 z-20 hover:bg-white/90 transition"
          >
            <Maximize className="w-5 h-5 text-blue-600" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 space-y-2">
          <FileUp className={`w-12 h-12 ${isDisabled ? 'text-gray-400' : 'text-blue-500 group-hover:text-blue-600'} transition-colors`} />
          <p className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-600 group-hover:text-blue-600'} transition-colors text-center`}>
            {label}
          </p>
        </div>
      )}
    </motion.div>
  );

  return (
    <>
      <motion.div 
        className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Upload Section */}
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

            {/* Error Handling */}
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

            {/* Image Upload Boxes */}
            <div className="grid grid-cols-2 gap-4">
              <ImageUploadBox 
                label="Front Side" 
                preview={frontPreview}
                inputRef={frontInputRef}
                onFileChange={(file) => handleFileChange(file, setFront, setFrontPreview)}
                isDisabled={isLoading}
              />
              <ImageUploadBox 
                label="Back Side" 
                preview={backPreview}
                inputRef={backInputRef}
                onFileChange={(file) => handleFileChange(file, setBack, setBackPreview)}
                isDisabled={isLoading}
              />
            </div>

            {/* Upload Button */}
            <motion.button
              onClick={handleUpload}
              disabled={!front || !back || isLoading}
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

          {/* Result Section */}
          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
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
              ) : result ? (
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
              ) : (
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
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Full Image View Modal */}
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
    </>
  );
};

export default AadhaarUpload;