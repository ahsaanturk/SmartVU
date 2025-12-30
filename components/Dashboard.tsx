
import React from 'react';
import { UserProfile, Task } from '../types';
import TaskCard from './TaskCard';
import { MOCK_TASKS } from '../constants';
import { Sparkles, Trophy } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  onToggleTask: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onToggleTask }) => {
  const filteredTasks = MOCK_TASKS.filter(t => profile.enrolledCourses.includes(t.courseCode));
  const completedCount = filteredTasks.filter(t => profile.completedTaskIds.includes(t.id)).length;
  const progressPercent = Math.round((completedCount / filteredTasks.length) * 100) || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">Welcome back, {profile.name}!</h1>
          <p className="text-gray-500 font-bold text-lg">You have {filteredTasks.length - completedCount} tasks pending today.</p>
        </div>
        
        <div className="bg-white p-5 rounded-3xl border-2 duo-card border-gray-200 flex items-center space-x-6 min-w-[200px]">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
              <circle 
                cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * progressPercent) / 100}
                className="text-[#58CC02]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-[#58CC02]">{progressPercent}%</div>
          </div>
          <div>
            <div className="font-black text-gray-800 text-xl">Daily Goal</div>
            <div className="text-sm font-bold text-gray-500">{completedCount}/{filteredTasks.length} Units Complete</div>
          </div>
        </div>
      </div>

      {/* Main Task List */}
      <div className="grid gap-6">
        <div className="flex items-center space-x-2 px-2">
          <Trophy className="w-6 h-6 text-[#FFC800]" />
          <h2 className="text-xl font-black text-gray-700 uppercase tracking-wider">Today's Challenges</h2>
        </div>
        
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isCompleted={profile.completedTaskIds.includes(task.id)}
            onToggle={onToggleTask}
          />
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-300">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-bold">No tasks found for your enrolled courses yet.</p>
          </div>
        )}
      </div>

      {/* Gamification footer */}
      <div className="bg-[#1CB0F6] p-8 rounded-3xl border-b-4 border-[#1899D6] text-white flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-black">Keep it up!</h3>
          <p className="text-lg font-bold opacity-90">Completing all tasks today will increase your streak to {profile.streak + 1} days.</p>
        </div>
        <button className="md:ml-auto px-8 py-3 bg-white text-[#1CB0F6] rounded-2xl font-black shadow-lg hover:scale-105 transition-transform">
          VIEW LEADERBOARD
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
