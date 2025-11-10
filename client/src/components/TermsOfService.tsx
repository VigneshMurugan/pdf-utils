import React from 'react';
import { SEOHelmet } from './SEOHelmet';
import { FileText, AlertTriangle, Scale, Users } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SEOHelmet
        title="Terms of Service - PDF Utils"
        description="Read our Terms of Service to understand the rules and guidelines for using PDF Utils services."
        noIndex={false}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-sm text-gray-600">Rules and guidelines for using our service</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> November 10, 2024
            </p>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Agreement to Terms</h2>
                </div>
                <p className="text-gray-700">
                  By accessing and using PDF Utils ("Service"), you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the 
                  above, please do not use this service.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Service Description</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  PDF Utils provides online PDF processing tools including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>PDF password removal and unlocking</li>
                  <li>PDF merging and splitting (coming soon)</li>
                  <li>PDF compression (coming soon)</li>
                  <li>Other PDF manipulation tools</li>
                </ul>
              </section>

              {/* Acceptable Use */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Scale className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Acceptable Use Policy</h2>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">You May:</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Use the service for legitimate PDF processing needs</li>
                  <li>Upload PDF files that you own or have permission to modify</li>
                  <li>Use the service for personal, educational, or commercial purposes</li>
                  <li>Share the service with others</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2">You May NOT:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Upload copyrighted material without permission</li>
                  <li>Upload malicious files, viruses, or malware</li>
                  <li>Attempt to hack, reverse engineer, or compromise the service</li>
                  <li>Use automated tools to abuse the service</li>
                  <li>Upload illegal, harmful, or offensive content</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              {/* File Security */}
              <section>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">🔐 File Security & Privacy</h2>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>All files are processed securely using HTTPS encryption</li>
                    <li>Files are automatically deleted immediately after download</li>
                    <li>We do not store, access, or retain your files</li>
                    <li>Temporary files are cleaned up within 1 hour maximum</li>
                    <li>You are responsible for the content of files you upload</li>
                  </ul>
                </div>
              </section>

              {/* Limitations */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Service Limitations</h2>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>File Size:</strong> Maximum upload size is 50MB per file</li>
                  <li><strong>Rate Limiting:</strong> 10 requests per 15 minutes per IP address</li>
                  <li><strong>File Types:</strong> Only PDF files are accepted</li>
                  <li><strong>Availability:</strong> Service provided "as is" without uptime guarantees</li>
                  <li><strong>Processing Time:</strong> Large files may take longer to process</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>You retain all rights to files you upload and process</li>
                  <li>PDF Utils retains rights to the service, code, and branding</li>
                  <li>You grant us temporary rights to process your files as requested</li>
                  <li>You are responsible for ensuring you have rights to modify uploaded files</li>
                </ul>
              </section>

              {/* Disclaimers */}
              <section>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h2 className="text-xl font-semibold text-yellow-800 mb-2">⚠️ Disclaimers</h2>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>Service is provided "as is" without warranties of any kind</li>
                    <li>We do not guarantee uninterrupted or error-free service</li>
                    <li>We are not responsible for data loss or corruption</li>
                    <li>Users should backup important files before processing</li>
                    <li>We do not guarantee successful processing of all PDF files</li>
                  </ul>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700">
                  In no event shall PDF Utils be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including without limitation, loss of profits, 
                  data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy</h2>
                <p className="text-gray-700">
                  Your privacy is important to us. Please review our Privacy Policy, which also 
                  governs your use of the service, to understand our practices.
                </p>
              </section>

              {/* Advertising */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Advertising</h2>
                <p className="text-gray-700">
                  Our service is supported by advertising. By using the service, you agree to the 
                  display of advertisements. We use Google AdSense and other advertising partners 
                  to show relevant ads.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Termination</h2>
                <p className="text-gray-700">
                  We may terminate or suspend your access immediately, without prior notice or 
                  liability, for any reason whatsoever, including without limitation if you breach 
                  the Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be interpreted and governed by the laws of [Your Country/State], 
                  without regard to conflict of law provisions.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify or replace these Terms at any time. If a revision 
                  is material, we will try to provide at least 30 days notice prior to any new 
                  terms taking effect.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Contact Form:</strong> <a href="/contact" className="text-primary-600 hover:underline">Submit a Legal Inquiry</a><br />
                    <strong>Website:</strong> https://pdfutils.com<br />
                    <strong>Business:</strong> PDF Utils (Online Service)
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
