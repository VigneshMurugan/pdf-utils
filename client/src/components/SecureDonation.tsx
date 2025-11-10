import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const SecureDonation: React.FC = () => {
  const [buttonHtml, setButtonHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSecureButton = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/donation-button');
        if (response.ok) {
          const html = await response.text();
          setButtonHtml(html);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch secure donation button:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSecureButton();
  }, []);

  if (loading) {
    return (
      <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="text-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-yellow-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">Support options temporarily unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: buttonHtml }}
      onClick={(e) => {
        // Track analytics if the click is on the donation link
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.closest('a')) {
          // Add analytics tracking here if needed
          console.log('Donation link clicked');
        }
      }}
    />
  );
};
