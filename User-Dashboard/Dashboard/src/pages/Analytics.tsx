import React from 'react';
import { Clock, Target, Award, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const statsData = [
    { icon: Clock, title: 'Study Time', value: '26 hours', change: '+2.5 hours', positive: true },
    { icon: Target, title: 'Completion Rate', value: '84%', change: '+6%', positive: true },
    { icon: Award, title: 'Average Score', value: '87%', change: '+3%', positive: true },
    { icon: Calendar, title: 'Attendance', value: '92%', change: '-2%', positive: false },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Learning Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                <stat.icon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{stat.value}</h2>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </div>
            <div className={`mt-3 text-sm ${stat.positive ? 'text-success-600' : 'text-error-600'}`}>
              {stat.change} this month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Weekly Study Hours</h2>
          <div className="h-64 flex items-end justify-between px-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-10 ${i === 2 ? 'bg-primary-600' : 'bg-primary-200'} rounded-t-md`}
                  style={{ height: `${[30, 45, 80, 60, 50, 20, 40][i]}%` }}
                ></div>
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Performance by Subject</h2>
          <div className="space-y-4">
            {[
              { subject: 'React', score: 92 },
              { subject: 'JavaScript', score: 85 },
              { subject: 'CSS & HTML', score: 78 },
              { subject: 'TypeScript', score: 88 },
            ].map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.subject}</span>
                  <span className="text-sm text-gray-500">{item.score}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-value ${
                      item.score >= 90 ? 'bg-success-500' :
                      item.score >= 80 ? 'bg-primary-500' :
                      item.score >= 70 ? 'bg-warning-500' : 'bg-error-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;