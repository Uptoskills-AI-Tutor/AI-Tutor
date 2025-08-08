import React from 'react';
import { BookOpen, FileCheck, Zap } from 'lucide-react';
import { Activity } from '../../types';

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <Zap size={18} />;
      case 'lesson':
        return <BookOpen size={18} />;
      case 'assignment':
        return <FileCheck size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  const getActivityBackground = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-primary-500';
      case 'lesson':
        return 'bg-success-500';
      case 'assignment':
        return 'bg-warning-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <p className="text-sm text-gray-500">Your latest learning activities</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`activity-icon ${getActivityBackground(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-gray-500">
                {activity.date}, {activity.time}
              </p>
            </div>
            {activity.score !== undefined && (
              <div className={`text-sm font-medium px-2 py-1 rounded ${
                activity.score >= 90 ? 'bg-success-100 text-success-800' :
                activity.score >= 70 ? 'bg-primary-100 text-primary-800' :
                'bg-warning-100 text-warning-800'
              }`}>
                {activity.score}%
              </div>
            )}
            {activity.status === 'completed' && (
              <div className="text-sm font-medium px-2 py-1 rounded bg-success-100 text-success-800">
                Completed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;