export interface AadhaarResult {
    name?: string;
    dob?: string;
    gender?: string;
    address?: string;
    aadhaar_number?: string;
    [key: string]: string | undefined;
  }
  
  export interface FileUploadResponse {
    success: boolean;
    data?: AadhaarResult;
    message?: string;
  }