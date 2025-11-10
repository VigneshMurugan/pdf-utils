import React, { useState } from 'react';
import axios from 'axios';
import { FileUpload } from './FileUpload';
import { PasswordInput } from './PasswordInput';
import { BuyMeCoffee } from './BuyMeCoffee';
import { SEOHelmet } from './SEOHelmet';
import { HeaderAd, SidebarAd, FooterAd, InContentAd } from './GoogleAds';
import { PageViewTracker, trackPDFUpload, trackPDFUnlock, trackPDFDownload } from './Analytics';
import { Unlock, Download, AlertCircle, CheckCircle, Loader2, Shield } from 'lucide-react';

interface UnlockResponse {
  success: boolean;
  message: string;
  downloadUrl: string;
  fileName: string;
}

export const HomePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<UnlockResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    
    // Track file upload
    trackPDFUpload(file.size);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPassword('');
    setResult(null);
    setError(null);
  };

  const handleUnlockPdf = async () => {
    if (!selectedFile || !password) {
      setError('Please select a PDF file and enter the password');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('pdf', selectedFile);
      formData.append('password', password);

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.post<UnlockResponse>(
        `${apiUrl}/api/unlock-pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResult(response.data);
      
      // Track successful unlock
      trackPDFUnlock(true, selectedFile.size);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to unlock PDF. Please try again.';
      setError(errorMessage);
      
      // Track failed unlock
      trackPDFUnlock(false, selectedFile.size);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.get(
        `${apiUrl}${result.downloadUrl}`,
        {
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Track successful download
      trackPDFDownload(response.data.size || 0);

      // Reset form after download
      handleRemoveFile();
    } catch (err) {
      setError('Failed to download file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SEOHelmet />
      <PageViewTracker title="PDF Utils - Free Online PDF Unlock Tool" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PDF Utils</h1>
              <p className="text-sm text-gray-600">Secure PDF utilities for everyone</p>
            </div>
          </div>
        </div>
        
        {/* Header Ad */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeaderAd />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Unlock className="h-8 w-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">PDF Unlock Tool</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Remove password protection from your PDF files quickly and securely. 
              Your files are processed locally and automatically deleted after download.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Auto File Deletion</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Registration</span>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* File Upload */}
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
                disabled={isProcessing}
              />

              {/* Password Input */}
              {selectedFile && (
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  disabled={isProcessing}
                />
              )}

              {/* Action Button */}
              {selectedFile && password && (
                <div className="card">
                  <button
                    onClick={handleUnlockPdf}
                    disabled={isProcessing}
                    className="btn-primary w-full py-3 text-lg flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Unlocking PDF...</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-5 w-5" />
                        <span>Unlock PDF</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="card bg-red-50 border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {result && (
                <div className="card bg-green-50 border-green-200">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-green-800">Success!</h3>
                        <p className="text-sm text-green-700 mt-1">{result.message}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                    >
                      <Download className="h-5 w-5" />
                      <span>Download Unlocked PDF</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* In-Content Ad */}
              <InContentAd />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Sidebar Ad */}
              <SidebarAd />
              
              <BuyMeCoffee />
              
              {/* Features */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose PDF Utils?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure & Private</p>
                      <p className="text-xs text-gray-600">Files are processed securely and deleted immediately</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Unlock className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Fast Processing</p>
                      <p className="text-xs text-gray-600">Quick PDF unlocking with advanced algorithms</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">No Registration</p>
                      <p className="text-xs text-gray-600">Use all features without creating an account</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Footer Ad */}
          <FooterAd />
          
          {/* SEO Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF Tools</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-primary-600">PDF Unlock</a></li>
                <li><a href="#merge" className="hover:text-primary-600">PDF Merge (Coming Soon)</a></li>
                <li><a href="#split" className="hover:text-primary-600">PDF Split (Coming Soon)</a></li>
                <li><a href="#compress" className="hover:text-primary-600">PDF Compress (Coming Soon)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Free to Use</li>
                <li>✓ No Registration Required</li>
                <li>✓ Secure Processing</li>
                <li>✓ Auto File Deletion</li>
                <li>✓ Fast & Reliable</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#help" className="hover:text-primary-600">Help & FAQ</a></li>
                <li><a href="#contact" className="hover:text-primary-600">Contact Us</a></li>
                <li><a href="/privacy" className="hover:text-primary-600">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; 2024 PDF Utils. Made with ❤️ for the community.</p>
              <p className="mt-2">Your privacy is our priority. Files are never stored on our servers.</p>
              <p className="mt-2">
                <strong>Keywords:</strong> PDF unlock tool, remove PDF password, unlock PDF online, 
                PDF password remover, free PDF tools, secure PDF unlock, online PDF utilities
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
