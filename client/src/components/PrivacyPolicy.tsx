import React from 'react';
import { SEOHelmet } from './SEOHelmet';
import { Shield, Eye, Cookie, Database, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SEOHelmet
        title="Privacy Policy - PDF Utils"
        description="Learn how PDF Utils protects your privacy and handles your data. We prioritize user privacy and data security."
        noIndex={false}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-sm text-gray-600">How we protect your privacy</p>
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
                  <Eye className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Introduction</h2>
                </div>
                <p className="text-gray-700">
                  PDF Utils ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit our 
                  website and use our PDF processing services.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Database className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">Files You Upload</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>PDF files you upload for processing</li>
                  <li>Passwords you provide for PDF unlocking</li>
                  <li>File metadata (size, type, upload time)</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referral source and exit pages</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2">Cookies and Tracking</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Google Analytics cookies for usage statistics</li>
                  <li>Google AdSense cookies for advertising</li>
                  <li>Session cookies for functionality</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>File Processing:</strong> To unlock, merge, split, or compress your PDF files</li>
                  <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our services</li>
                  <li><strong>Security:</strong> To detect and prevent abuse, spam, and malicious activity</li>
                  <li><strong>Analytics:</strong> To understand user behavior and optimize our website</li>
                  <li><strong>Advertising:</strong> To display relevant ads through Google AdSense</li>
                </ul>
              </section>

              {/* File Security & Deletion */}
              <section>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h2 className="text-xl font-semibold text-green-800 mb-2">🔒 Your Files Are Secure</h2>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li><strong>Automatic Deletion:</strong> All uploaded files are deleted immediately after download</li>
                    <li><strong>No Storage:</strong> We do not store your files on our servers permanently</li>
                    <li><strong>Cleanup:</strong> Any temporary files are automatically deleted within 1 hour</li>
                    <li><strong>Encryption:</strong> All file transfers use HTTPS encryption</li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Services */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Cookie className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-gray-700 mb-4">
                  We use Google Analytics to understand how visitors use our site. Google Analytics 
                  collects information anonymously and reports website trends without identifying 
                  individual visitors.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-2">Google AdSense</h3>
                <p className="text-gray-700 mb-4">
                  We use Google AdSense to display advertisements. Google may use cookies to serve 
                  ads based on your prior visits to our website or other websites. You can opt out 
                  of personalized advertising by visiting Google's Ads Settings.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-2">Buy Me a Coffee</h3>
                <p className="text-gray-700">
                  If you choose to support us through Buy Me a Coffee, their privacy policy applies 
                  to any information you provide during the donation process.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Your Privacy Rights</h2>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Access:</strong> You can request information about data we have collected</li>
                  <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> You can disable cookies in your browser settings</li>
                  <li><strong>Ad Preferences:</strong> You can control ad personalization through Google</li>
                </ul>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Uploaded Files:</strong> Deleted immediately after processing/download</li>
                  <li><strong>Analytics Data:</strong> Retained by Google Analytics for 26 months</li>
                  <li><strong>Server Logs:</strong> Retained for 30 days for security purposes</li>
                </ul>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
                </div>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-gray-700">
                    <strong>Contact Form:</strong> <a href="/contact" className="text-primary-600 hover:underline">Submit a Privacy Request</a><br />
                    <strong>Website:</strong> https://pdfutils.com<br />
                    <strong>Response Time:</strong> Within 48 hours
                  </p>
                </div>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the "Last updated" 
                  date at the top of this policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
