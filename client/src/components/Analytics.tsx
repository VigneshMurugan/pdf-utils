import React from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Google Analytics tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title,
      page_location,
    });
  }
};

// Specific tracking functions for PDF Utils
export const trackPDFUpload = (fileSize: number) => {
  trackEvent('file_upload', 'PDF', 'upload_started', fileSize);
};

export const trackPDFUnlock = (success: boolean, fileSize?: number) => {
  trackEvent(
    success ? 'unlock_success' : 'unlock_failed',
    'PDF',
    success ? 'unlock_completed' : 'unlock_error',
    fileSize
  );
};

export const trackPDFDownload = (fileSize: number) => {
  trackEvent('file_download', 'PDF', 'download_completed', fileSize);
};

export const trackAdClick = (adPosition: string) => {
  trackEvent('ad_click', 'Monetization', adPosition);
};

export const trackCoffeeClick = () => {
  trackEvent('coffee_click', 'Monetization', 'buy_me_coffee');
};

// Component for tracking page views
export const PageViewTracker: React.FC<{ title: string }> = ({ title }) => {
  React.useEffect(() => {
    trackPageView(title, window.location.href);
  }, [title]);

  return null;
};
