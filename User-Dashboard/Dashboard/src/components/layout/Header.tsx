import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { availableSubjects } from '../../data/mockData';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectSubject = (subject: string) => {
    setSelectedSubject(subject);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm h-16 pl-64 flex items-center z-10 sticky top-0">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors duration-200"
          >
            {selectedSubject}
            <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-64 z-20 animate-slide-in">
              {availableSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => selectSubject(subject)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedSubject === subject ? 'bg-blue-50' : ''
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">
              <User size={20} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;