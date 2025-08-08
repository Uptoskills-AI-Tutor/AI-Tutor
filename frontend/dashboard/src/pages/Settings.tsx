import React from 'react';
import { Bell, Moon, Globe, Lock, User, Mail } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="card p-4">
            <nav>
              <ul className="space-y-1">
                {[
                  { icon: User, label: 'Profile' },
                  { icon: Bell, label: 'Notifications' },
                  { icon: Lock, label: 'Password & Security' },
                  { icon: Moon, label: 'Appearance' },
                  { icon: Globe, label: 'Language' },
                ].map((item, index) => (
                  <li key={index}>
                    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${index === 0 ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}>
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="col-span-3">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            
            <div className="mb-8 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <User size={32} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Profile Photo</h3>
                <div className="flex gap-2">
                  <button className="text-sm text-primary-600 hover:text-primary-700">Upload new photo</button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Remove</button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value="John"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value="Doe"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="flex">
                  <div className="flex-shrink-0 inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value="john.doe@example.com"
                    className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  id="bio"
                  rows={3}
                  placeholder="Write a short bio about yourself..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="btn bg-white border border-gray-300 mr-2">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;