import { useEffect } from 'react';

declare global {
  interface Window {
    replainSettings: {
      id: string;
    };
  }
}

export const ChatWidget = () => {
  useEffect(() => {
    // Configure Re:plain settings
    window.replainSettings = { id: '81f90db2-dde4-4d04-9f3c-b861c20fa81a' };

    // Load Re:plain script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://widget.replain.cc/dist/client.js';
    document.getElementsByTagName('script')[0].parentNode?.insertBefore(script, document.getElementsByTagName('script')[0]);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const existingScript = document.querySelector('script[src="https://widget.replain.cc/dist/client.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};