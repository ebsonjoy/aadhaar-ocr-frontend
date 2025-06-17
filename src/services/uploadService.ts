import { FileUploadResponse } from '../types';

export async function uploadAadhaarImages(
  front: File, 
  back: File
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append('front', front);
  formData.append('back', back);

  try {
    const response = await fetch('http://localhost:5000/api/ocr/upload', {
      method: 'POST',
      body: formData,
    });
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ocr/upload`, {
      //   method: 'POST',
      //   body: formData,
      // });
    if (!response.ok) {
      return await response.json()
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading files:', error);
    return {
      success: false,
      message: 'Failed to process images. Please try again.'
    };
  }
}

export function validateFiles(front: File | null, back: File | null): { isValid: boolean; error?: string } {
  if (!front || !back) {
    return { isValid: false, error: 'Both front and back images are required' };
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(front.type) || !allowedTypes.includes(back.type)) {
    return { isValid: false, error: 'Only JPEG and PNG images are allowed' };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (front.size > maxSize || back.size > maxSize) {
    return { isValid: false, error: 'Each file should be less than 5MB' };
  }

  return { isValid: true };
}