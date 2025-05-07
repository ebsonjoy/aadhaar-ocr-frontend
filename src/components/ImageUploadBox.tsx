import { motion } from 'framer-motion';
import { FileUp, Maximize } from 'lucide-react';

interface ImageUploadBoxProps {
  label: string;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (file: File | null) => void;
  isDisabled?: boolean;
  setFullImageView: (url: string | null) => void;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ 
  label, 
  preview, 
  inputRef, 
  onFileChange,
  isDisabled,
  setFullImageView
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFullImageView(preview);
          }}
          className="absolute top-2 right-2 bg-white/70 rounded-full p-1 z-20 hover:bg-white/90 transition"
        >
          <Maximize className="w-5 h-5 text-blue-600" />
        </button>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-48 space-y-2">
        <FileUp className={`w-12 h-12 ${isDisabled ? 'text-gray-400' : 'text-blue-500'} transition-colors`} />
        <p className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-600'} transition-colors text-center`}>
          {label}
        </p>
      </div>
    )}
  </motion.div>
);

export default ImageUploadBox;