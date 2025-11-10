import React from 'react';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

export const AdOnlyRevenue: React.FC = () => {
  return (
    <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <DollarSign className="h-4 w-4 text-green-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            100% Free Service
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            This service is completely free and supported by ads. No donations needed!
          </p>
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
              <Users className="h-4 w-4" />
              <span>Serving the community since 2024</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Revenue from ads helps maintain and improve this service
        </p>
      </div>
    </div>
  );
};
