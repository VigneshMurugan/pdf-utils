import React, { useState } from 'react';
import { Bitcoin, Copy, Check } from 'lucide-react';

export const CryptoDonation: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  // REPLACE THESE WITH YOUR ACTUAL WALLET ADDRESSES
  const wallets = {
    bitcoin: 'YOUR_BITCOIN_ADDRESS_HERE',
    ethereum: 'YOUR_ETHEREUM_ADDRESS_HERE',
  };

  const copyToClipboard = (address: string, type: string) => {
    navigator.clipboard.writeText(address);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Bitcoin className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Support with Crypto
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Donate cryptocurrency to support development
          </p>
          
          <div className="space-y-3">
            {/* Bitcoin */}
            <div className="bg-white rounded-lg p-3 border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Bitcoin</span>
                <button
                  onClick={() => copyToClipboard(wallets.bitcoin, 'bitcoin')}
                  className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  {copied === 'bitcoin' ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-mono break-all">
                {wallets.bitcoin}
              </p>
            </div>

            {/* Ethereum */}
            <div className="bg-white rounded-lg p-3 border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Ethereum</span>
                <button
                  onClick={() => copyToClipboard(wallets.ethereum, 'ethereum')}
                  className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  {copied === 'ethereum' ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-mono break-all">
                {wallets.ethereum}
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Crypto donations help maintain server costs
        </p>
      </div>
    </div>
  );
};
