
import React from 'react';
import { UserProfile } from '../types';
import { MOCK_COURSES } from '../constants';
import { Play, Download, ExternalLink, Book } from 'lucide-react';

interface LectureViewProps {
  profile: UserProfile;
}

const LectureView: React.FC<LectureViewProps> = ({ profile }) => {
  const filteredCourses = MOCK_COURSES.filter(c => profile.enrolledCourses.includes(c.code));

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <h1 className="text-3xl font-black text-gray-800">Your Study Materials</h1>

      {filteredCourses.map(course => (
        <div key={course.code} className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1CB0F6] rounded-xl flex items-center justify-center text-white">
              <Book className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-700">{course.code}: {course.name}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Videos Section */}
            <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-6 space-y-4">
              <h3 className="font-black text-gray-400 uppercase tracking-widest text-xs">Video Lectures</h3>
              {course.videos.map(video => (
                <a 
                  key={video.id} 
                  href={`https://youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 hover:border-[#FFC800] transition-all group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 group-hover:bg-[#FFF9E6]">
                    <Play className="w-6 h-6 text-[#FFC800] fill-[#FFC800]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 leading-snug">{video.title}</div>
                    <div className="text-xs font-black text-[#FFC800]">WATCH ON YOUTUBE</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300" />
                </a>
              ))}
            </div>

            {/* Handouts Section */}
            <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-6 space-y-4">
              <h3 className="font-black text-gray-400 uppercase tracking-widest text-xs">Downloads & Handouts</h3>
              {course.handouts.map(handout => (
                <a 
                  key={handout.id} 
                  href={handout.url}
                  className="flex items-center p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 hover:border-[#1CB0F6] transition-all group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 group-hover:bg-[#EBF7FF]">
                    <Download className="w-6 h-6 text-[#1CB0F6]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 leading-snug">{handout.title}</div>
                    <div className="text-xs font-black text-[#1CB0F6]">PDF DOCUMENT</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LectureView;
