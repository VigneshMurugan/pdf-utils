import React, { useState, useEffect } from 'react';
import { Coffee, Heart, Loader2 } from 'lucide-react';
import { trackCoffeeClick } from './Analytics';

interface DonationInfo {
  url: string;
  platform: string;
}

export const BuyMeCoffee: React.FC = () => {
  const [donationInfo, setDonationInfo] = useState<DonationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonationLink = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await fetch(`${apiUrl}/api/donation-link`);
        const data = await response.json();
        setDonationInfo(data);
      } catch (error) {
        console.error('Failed to fetch donation link:', error);
        // Fallback - but this could still be modified
        setDonationInfo({
          url: 'https://www.buymeacoffee.com/vignesh328g',
          platform: 'buymeacoffee'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonationLink();
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

  return (
    <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Coffee className="h-6 w-6 text-yellow-600" />
          <Heart className="h-4 w-4 text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Enjoying PDF Utils?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Support the development of this free tool by buying me a coffee!
          </p>
          {donationInfo && (
            <a
              href={donationInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCoffeeClick}
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Coffee className="h-4 w-4" />
              <span>Buy me a coffee</span>
            </a>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Your support helps keep this service free and ad-free
        </p>
      </div>
    </div>
  );
};
