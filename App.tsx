
import React, { useState, useEffect } from 'react';
import { UserProfile, AppRoute } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LectureView from './components/LectureView';
import AdminPortal from './components/AdminPortal';
import AIConsultant from './components/AIConsultant';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeRoute, setActiveRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('vu_student_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('vu_student_profile', JSON.stringify(newProfile));
  };

  const handleToggleTask = (taskId: string) => {
    if (!profile) return;
    const isCompleted = profile.completedTaskIds.includes(taskId);
    const updatedTaskIds = isCompleted 
      ? profile.completedTaskIds.filter(id => id !== taskId)
      : [...profile.completedTaskIds, taskId];
    
    const updatedProfile = { 
      ...profile, 
      completedTaskIds: updatedTaskIds,
      // Increase streak if completing a first task of the day (simplified logic)
      streak: !isCompleted && updatedTaskIds.length === 1 ? profile.streak + 1 : profile.streak
    };
    setProfile(updatedProfile);
    localStorage.setItem('vu_student_profile', JSON.stringify(updatedProfile));
  };

  const logout = () => {
    localStorage.removeItem('vu_student_profile');
    setProfile(null);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#58CC02]">
      <div className="w-20 h-20 bg-white rounded-3xl animate-bounce flex items-center justify-center text-[#58CC02] font-black text-3xl shadow-2xl">VU</div>
    </div>
  );

  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout 
      activeRoute={activeRoute} 
      onNavigate={setActiveRoute} 
      streak={profile.streak}
    >
      {activeRoute === AppRoute.DASHBOARD && (
        <Dashboard profile={profile} onToggleTask={handleToggleTask} />
      )}
      
      {(activeRoute === AppRoute.LECTURES || activeRoute === AppRoute.HANDOUTS || activeRoute === AppRoute.QUIZZES) && (
        <LectureView profile={profile} />
      )}

      {activeRoute === AppRoute.PROFILE && (
        <div className="max-w-xl mx-auto space-y-8">
          <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-10 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
               <img src={`https://picsum.photos/seed/${profile.name}/200`} alt="Avatar" />
            </div>
            <h1 className="text-3xl font-black text-gray-800">{profile.name}</h1>
            <p className="text-lg font-bold text-gray-500">{profile.program} - Semester {profile.semester}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-[#DDF4FF] p-4 rounded-2xl border-2 border-[#84D8FF] text-[#1CB0F6]">
                <div className="text-2xl font-black">{profile.streak}</div>
                <div className="text-xs font-bold uppercase">Days Streak</div>
              </div>
              <div className="bg-[#E8F8D9] p-4 rounded-2xl border-2 border-[#B8F28B] text-[#58CC02]">
                <div className="text-2xl font-black">{profile.completedTaskIds.length}</div>
                <div className="text-xs font-bold uppercase">Tasks Done</div>
              </div>
            </div>

            <button 
              onClick={logout}
              className="mt-10 w-full py-4 text-red-500 font-black border-2 border-red-200 rounded-2xl hover:bg-red-50 transition-colors"
            >
              LOG OUT
            </button>
          </div>
        </div>
      )}

      {activeRoute === AppRoute.ADMIN && (
        <AdminPortal />
      )}

      <AIConsultant courseContext={`Course: ${profile.enrolledCourses.join(', ')}. Program: ${profile.program}.`} />
    </Layout>
  );
};

export default App;
