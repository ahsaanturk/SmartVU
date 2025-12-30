
import React from 'react';
import { Task } from '../types';
import { CheckCircle2, Circle, Clock, HelpCircle, FileText, BookOpen } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isCompleted, onToggle }) => {
  const getIcon = () => {
    switch (task.type) {
      case 'quiz': return <HelpCircle className="w-8 h-8 text-[#FFC800]" />;
      case 'assignment': return <FileText className="w-8 h-8 text-[#1CB0F6]" />;
      case 'lecture': return <BookOpen className="w-8 h-8 text-[#58CC02]" />;
    }
  };

  const getThemeClass = () => {
    if (isCompleted) return 'bg-gray-100 border-gray-300 text-gray-400 grayscale opacity-70';
    switch (task.type) {
      case 'quiz': return 'bg-[#FFF9E6] border-[#FFC800]';
      case 'assignment': return 'bg-[#EBF7FF] border-[#1CB0F6]';
      case 'lecture': return 'bg-[#E8F8D9] border-[#58CC02]';
    }
  };

  const deadlineDate = new Date(task.deadline);
  const isUrgent = !isCompleted && (deadlineDate.getTime() - new Date().getTime() < 86400000);

  return (
    <div className={`relative flex items-center p-4 md:p-6 rounded-3xl border-2 duo-card ${getThemeClass()} transition-all`}>
      <div className="mr-4 md:mr-6 flex-shrink-0">
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border-2 border-gray-100`}>
          {getIcon()}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center space-x-2">
           <span className="text-xs font-black uppercase tracking-widest opacity-60">{task.courseCode}</span>
           {isUrgent && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">URGENT</span>}
        </div>
        <h3 className="text-lg md:text-xl font-black text-gray-800 leading-tight">{task.title}</h3>
        <p className="text-sm font-bold opacity-70 mt-1 line-clamp-1">{task.description}</p>
        
        {!isCompleted && (
          <div className="flex items-center mt-2 text-xs font-black text-gray-500 uppercase">
            <Clock className="w-3 h-3 mr-1" />
            Ends {deadlineDate.toLocaleDateString()} at {deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      <button
        onClick={() => onToggle(task.id)}
        className={`ml-4 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted 
            ? 'bg-[#58CC02] border-[#46A302] text-white' 
            : 'bg-white border-gray-200 text-gray-300 hover:border-[#58CC02]'
        }`}
      >
        {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
      </button>

      {isCompleted && (
        <div className="absolute top-2 right-4 text-[10px] font-black text-[#58CC02]">DONE!</div>
      )}
    </div>
  );
};

export default TaskCard;
