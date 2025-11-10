import React, { useEffect } from 'react';

interface GoogleAdsProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAds: React.FC<GoogleAdsProps> = ({
  adSlot,
  adFormat = 'auto',
  style = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't show ads in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 p-4 text-center text-gray-500 ${className}`}>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

// Specific ad components for different placements
export const HeaderAd: React.FC = () => (
  <GoogleAds
    adSlot="1234567890" // Replace with your header ad slot
    adFormat="horizontal"
    className="mb-4"
    style={{ display: 'block', height: '90px' }}
  />
);

export const SidebarAd: React.FC = () => (
  <GoogleAds
    adSlot="2345678901" // Replace with your sidebar ad slot
    adFormat="vertical"
    className="mb-6"
    style={{ display: 'block', width: '300px', height: '250px' }}
  />
);

export const FooterAd: React.FC = () => (
  <GoogleAds
    adSlot="3456789012" // Replace with your footer ad slot
    adFormat="horizontal"
    className="mt-8 mb-4"
    style={{ display: 'block', height: '90px' }}
  />
);

export const InContentAd: React.FC = () => (
  <GoogleAds
    adSlot="4567890123" // Replace with your in-content ad slot
    adFormat="rectangle"
    className="my-6 mx-auto"
    style={{ display: 'block', width: '336px', height: '280px' }}
  />
);
