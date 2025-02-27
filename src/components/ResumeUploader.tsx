import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, AlertCircle } from 'lucide-react';

interface ResumeUploaderProps {
  onResumeUpload: (file: File) => void;
  isLoading: boolean;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onResumeUpload, isLoading }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    onResumeUpload(file);
  }, [onResumeUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <FileText className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-1">
          {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
        </p>
        <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
        <p className="text-xs text-gray-400">Supported format: PDF (Max size: 5MB)</p>
        
        {error && (
          <div className="mt-4 flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{error}</span>
          </div>
        )}
        
        {isLoading && (
          <div className="mt-4">
            <div className="animate-pulse flex space-x-2 justify-center">
              <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
              <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
              <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
            </div>
            <p className="text-sm text-indigo-600 mt-2">Analyzing your resume...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;