import React, { useEffect, useState } from 'react';
import { Clock, Target, Award, Calendar } from 'lucide-react';

const userId = 'USER_1'; // Replace with actual user ID from context if needed

const ICONS = [Clock, Target, Award, Calendar];
const TITLES = ['Study Time', 'Completion Rate', 'Average Score', 'Attendance'];

const AnalyticsActivities = () => {
  const [stats, setStats] = useState([
    { value: '...', change: '', positive: true },
    { value: '...', change: '', positive: true },
    { value: '...', change: '', positive: true },
    { value: '...', change: '', positive: true },
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/analytics/${userId}`);
        const data = await res.json();

        const weekly = data.weeklyStudy || [0, 0, 0, 0, 0, 0, 0];
        const subjects = data.subjects || [];

        const totalHours = weekly.reduce((a, b) => a + b, 0);
        const avgScore =
          subjects.length > 0
            ? subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length
            : 0;
        const completedCount = subjects.filter((s) => s.score >= 70).length;
        const attendanceDays = weekly.filter((h) => h > 0).length;

        setStats([
          {
            value: `${totalHours} mins`,
            change: totalHours > 250 ? '+10%' : '-5%',
            positive: totalHours > 250,
          },
          {
            value: `${Math.round((completedCount / (subjects.length || 1)) * 100)}%`,
            change: completedCount > 2 ? '+5%' : '-3%',
            positive: completedCount > 2,
          },
          {
            value: `${Math.round(avgScore)}%`,
            change: avgScore > 85 ? '+4%' : '-2%',
            positive: avgScore > 85,
          },
          {
            value: `${Math.round((attendanceDays / 7) * 100)}%`,
            change: attendanceDays >= 6 ? '+2%' : '-4%',
            positive: attendanceDays >= 6,
          },
        ]);
      } catch (err) {
        console.error('Failed to load analytics summary:', err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = ICONS[idx];
        return (
          <div key={idx} className="rounded-xl border p-4 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                <Icon size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">{TITLES[idx]}</div>
                <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                <div className={`text-xs mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsActivities;
