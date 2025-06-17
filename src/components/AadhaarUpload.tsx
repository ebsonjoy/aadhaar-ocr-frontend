'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import FullImageViewer from './FullImageViewer';
import { uploadAadhaarImages, validateFiles } from '../services/uploadService';
import { AadhaarResult } from '../types';
import ErrorDisplay from './ErrorDisplay';

const AadhaarUpload = () => {
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AadhaarResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fullImageView, setFullImageView] = useState<string | null>(null);

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
    setError(null);
    setResult(null);
    setIsLoading(true);
    
    const validation = validateFiles(front, back);
    if (!validation.isValid) {
      setError(validation.error || 'Validation failed');
      setIsLoading(false);
      return;
    }

    try {
      const response = await uploadAadhaarImages(front!, back!);
      console.log('res', response);

      if (!response.success) {
        throw new Error(response.message || 'Upload failed');
      }

      setResult(response.data || null);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(error instanceof Error ? error.message : 'Failed to process images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadAnother = () => {
    setFront(null);
    setBack(null);
    setFrontPreview(null);
    setBackPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <>
      <motion.div 
        className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          
          <ImageUploader 
            frontPreview={frontPreview}
            backPreview={backPreview}
            isLoading={isLoading}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            setFront={setFront}
            setBack={setBack}
            setFrontPreview={setFrontPreview}
            setBackPreview={setBackPreview}
            setFullImageView={setFullImageView}
          />
          
          <ResultDisplay 
            isLoading={isLoading}
            result={
              result 
                ? Object.fromEntries(
                    Object.entries(result).map(([key, value]) => [key, value || ''])
                  ) 
                : null
            }
          />
        </div>

        <div className="px-8 pb-4">
          <ErrorDisplay error={error} />
        </div>

        {result && (
          <motion.div 
            className="w-full flex justify-center pb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.button
              onClick={handleUploadAnother}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Another Aadhaar Card
            </motion.button>
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="w-full flex justify-center pb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.button
              onClick={handleUploadAnother}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Re-upload Aadhaar Card
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <FullImageViewer 
        fullImageView={fullImageView} 
        setFullImageView={setFullImageView} 
      />
    </>
  );
};

export default AadhaarUpload;
