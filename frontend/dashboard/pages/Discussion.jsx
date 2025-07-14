import React from 'react';
import { MessageCircle, Search, Filter } from 'lucide-react';

const Discussion.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discussion</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <MessageCircle size={16} />
          <span>New Thread</span>
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search discussions..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus-none focus-2 focus-primary-500 focus-transparent"
          />
        </div>
        <button className="btn bg-white border border-gray-300 flex items-center gap-2">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Discussions</h2>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-gray-100 rounded-lg hover-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Help with React Hooks assignment</h3>
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">React</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                I'm having trouble understanding how to use useEffect for data fetching. Can someone explain?
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <span className="text-xs text-gray-500">John Doe • 2 hours ago</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {3 + i}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discussion;