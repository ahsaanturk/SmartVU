
import React, { useState } from 'react';
import { MOCK_COURSES } from '../constants';
import { Upload, Plus, FileText, Video } from 'lucide-react';

const AdminPortal: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(MOCK_COURSES[0].code);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState<'handout' | 'video'>('handout');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Content Uploaded Successfully!\nCourse: ${selectedCourse}\nType: ${type}\nTitle: ${title}`);
    setTitle('');
    setLink('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-800">Admin Content Manager</h1>
        <div className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full font-black text-xs">EXPERIMENTAL</div>
      </div>

      <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-black text-gray-500 uppercase text-xs">Course</label>
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-2xl font-bold focus:outline-none"
              >
                {MOCK_COURSES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="font-black text-gray-500 uppercase text-xs">Content Type</label>
              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => setType('handout')}
                  className={`flex-1 py-4 rounded-2xl border-2 font-black flex items-center justify-center space-x-2 ${type === 'handout' ? 'bg-[#DDF4FF] border-[#1CB0F6] text-[#1CB0F6]' : 'bg-white text-gray-400 border-gray-200'}`}
                >
                  <FileText className="w-5 h-5" />
                  <span>PDF</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setType('video')}
                  className={`flex-1 py-4 rounded-2xl border-2 font-black flex items-center justify-center space-x-2 ${type === 'video' ? 'bg-[#FFF9E6] border-[#FFC800] text-[#FFC800]' : 'bg-white text-gray-400 border-gray-200'}`}
                >
                  <Video className="w-5 h-5" />
                  <span>VIDEO</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-black text-gray-500 uppercase text-xs">Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Week 1: Lecture Slides"
              className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-2xl font-bold focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-black text-gray-500 uppercase text-xs">{type === 'handout' ? 'PDF URL' : 'YouTube ID/URL'}</label>
            <input 
              type="text" 
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={type === 'handout' ? 'https://example.com/handout.pdf' : 'YouTube ID like: dQw4w9WgXcQ'}
              className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-2xl font-bold focus:outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-[#58CC02] duo-button border-b-[#46A302] text-white text-xl font-black rounded-3xl flex items-center justify-center space-x-3"
          >
            <Upload className="w-6 h-6" />
            <span>UPLOAD CONTENT</span>
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-200 text-center">
          <div className="font-black text-3xl text-green-600">42</div>
          <div className="text-sm font-black text-green-700 uppercase">Files Uploaded</div>
        </div>
        <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-200 text-center">
          <div className="font-black text-3xl text-blue-600">12</div>
          <div className="text-sm font-black text-blue-700 uppercase">Courses Managed</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-200 text-center">
          <div className="font-black text-3xl text-orange-600">1,240</div>
          <div className="text-sm font-black text-orange-700 uppercase">Active Students</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
