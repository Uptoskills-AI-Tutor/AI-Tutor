import React, { useEffect, useState } from 'react';
import { Clock, Target, Award, Calendar, Save, Plus, Trash2 } from 'lucide-react';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const userId = 'USER_1'; // Replace with actual logged-in user ID

const defaultSubjects = [
  { subject: 'React', score: 80 },
  { subject: 'JavaScript', score: 75 },
  { subject: 'HTML & CSS', score: 85 },
  { subject: 'TypeScript', score: 70 }
];

const getScoreColor = (score) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-amber-500';
  return 'bg-red-500';
};

const Analytics = () => {
  const [weeklyHeights, setWeeklyHeights] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [subjectScores, setSubjectScores] = useState([]);
  const [statsData, setStatsData] = useState([
    { icon: Clock, title: 'Study Time', value: '', change: '', positive: true },
    { icon: Target, title: 'Completion Rate', value: '', change: '', positive: true },
    { icon: Award, title: 'Average Score', value: '', change: '', positive: true },
    { icon: Calendar, title: 'Attendance', value: '', change: '', positive: true },
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/analytics/${userId}`);
        const data = await res.json();
        if (data) {
          setWeeklyHeights(data.weeklyStudy || [0, 0, 0, 0, 0, 0, 0]);
          setSubjectScores(data.subjects?.length ? data.subjects : defaultSubjects);
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    const totalHours = weeklyHeights.reduce((a, b) => a + b, 0);
    const avgScore =
      subjectScores.length > 0
        ? subjectScores.reduce((sum, s) => sum + s.score, 0) / subjectScores.length
        : 0;
    const completedCount = subjectScores.filter((s) => s.score >= 70).length;
    const attendanceDays = weeklyHeights.filter((h) => h > 0).length;

    const updated = [...statsData];
    updated[0].value = `${totalHours} mins`;
    updated[0].change = totalHours > 250 ? '+10%' : '-5%';
    updated[0].positive = totalHours > 250;

    updated[1].value = `${Math.round((completedCount / (subjectScores.length || 1)) * 100)}%`;
    updated[1].change = completedCount > 2 ? '+5%' : '-3%';
    updated[1].positive = completedCount > 2;

    updated[2].value = `${Math.round(avgScore)}%`;
    updated[2].change = avgScore > 85 ? '+4%' : '-2%';
    updated[2].positive = avgScore > 85;

    updated[3].value = `${Math.round((attendanceDays / 7) * 100)}%`;
    updated[3].change = attendanceDays >= 6 ? '+2%' : '-4%';
    updated[3].positive = attendanceDays >= 6;

    setStatsData(updated);
  }, [weeklyHeights, subjectScores]);

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          weeklyStudy: weeklyHeights,
          subjects: subjectScores,
        }),
      });

      const result = await res.json();
      alert("Analytics saved successfully!");
    } catch (err) {
      console.error("Failed to save analytics:", err);
      alert("Failed to save analytics");
    }
  };

  const handleWeeklyChange = (i, value) => {
    const updated = [...weeklyHeights];
    updated[i] = Number(value);
    setWeeklyHeights(updated);
  };

  const handleSubjectChange = (i, key, value) => {
    const updated = [...subjectScores];
    updated[i][key] = key === 'score' ? Number(value) : value;
    setSubjectScores(updated);
  };

  const handleAddSubject = () => {
    setSubjectScores([...subjectScores, { subject: '', score: 0 }]);
  };

  const handleDeleteSubject = (index) => {
    const updated = subjectScores.filter((_, i) => i !== index);
    setSubjectScores(updated);
  };

  return (
    <div className="p-4 md:p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Learning Analytics</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          <Save size={18} />
          <span>Save</span>
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="rounded-lg border bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-700">{stat.title}</div>
              </div>
            </div>
            <div className={`mt-3 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Weekly Study Hours</h2>
          <div className="h-64 flex items-end justify-between px-2">
            {weekDays.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 bg-blue-400 rounded-t-md`}
                  style={{ height: `${weeklyHeights[i]}%` }}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weeklyHeights[i]}
                  onChange={(e) => handleWeeklyChange(i, e.target.value)}
                  className="w-12 text-xs text-center border border-gray-300 rounded text-gray-900"
                />
                <span className="text-xs text-gray-700">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Performance by Subject</h2>
          <div className="space-y-4">
            {subjectScores.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1 gap-2">
                  <input
                    type="text"
                    value={item.subject}
                    onChange={(e) => handleSubjectChange(i, 'subject', e.target.value)}
                    className="text-sm font-medium border-b border-gray-300 text-gray-900 flex-1"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={item.score}
                    onChange={(e) => handleSubjectChange(i, 'score', e.target.value)}
                    className="text-sm text-gray-700 border-b border-gray-300 w-16 text-right"
                  />
                  <button
                    onClick={() => handleDeleteSubject(i)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(item.score)} transition-all duration-300`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={handleAddSubject}
              className="flex items-center gap-2 mt-4 text-sm text-blue-700 hover:text-blue-900"
            >
              <Plus size={16} />
              Add Subject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;



