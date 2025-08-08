import React from 'react';
import { User } from '../../types';

interface WelcomeMessageProps {
  user: User;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ user }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
      <p className="text-gray-600">Here's an overview of your learning progress</p>
    </div>
  );
};

export default WelcomeMessage;