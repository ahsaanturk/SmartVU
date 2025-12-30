
import React, { useState, useEffect } from 'react';
import { Program, UserProfile } from '../types';
import { PROGRAMS, MOCK_COURSES } from '../constants';
import { CheckCircle2, Mail, Phone, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // User Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [program, setProgram] = useState<Program | null>(null);
  const [semester, setSemester] = useState<number>(1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Verification Logic
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  // Requirement: Strictly contain only the domain @vu.edu.pk
  const validateEmail = (email: string) => {
    const emailLower = email.toLowerCase().trim();
    return emailLower.endsWith('@vu.edu.pk') && emailLower.length > 10;
  };

  const startVerification = (type: 'email' | 'whatsapp') => {
    if (type === 'email' && !validateEmail(email)) {
      setError('Invalid email. You must use your official @vu.edu.pk address.');
      return;
    }

    if (type === 'whatsapp' && whatsapp.length < 10) {
      setError('Please enter a valid WhatsApp number.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate Backend Integration (AWS RDS/SNS/SES simulation)
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setLoading(false);
      setStep(step + 1);
      
      // Simulation: Display the code for demo purposes as per platform constraints
      console.log(`[SmartVU AUTH] Verification code for ${type}: ${code}`);
      alert(`SMARTVU VERIFICATION\nYour code is: ${code}\n(Simulating secure delivery to ${type === 'email' ? email : whatsapp})`);
    }, 1200);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setError('');
      setOtp('');
      setStep(step + 1);
    } else {
      setError('Verification code is incorrect. Please check and try again.');
    }
  };

  const handleToggleCourse = (code: string) => {
    setSelectedCourses(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleFinish = () => {
    if (!name || !program || selectedCourses.length === 0) return;
    onComplete({
      name,
      email,
      whatsapp,
      program,
      semester,
      enrolledCourses: selectedCourses,
      streak: 1,
      lastLoginDate: new Date().toISOString(),
      completedTaskIds: []
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 md:mt-20 px-4 pb-12">
      {/* Visual Progress Header */}
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="flex-1 flex justify-between mr-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 mx-1 rounded-full transition-all duration-500 ${
                step >= i * 1.1 ? 'bg-[#58CC02]' : 'bg-gray-200'
              }`} 
            />
          ))}
        </div>
        <div className="flex items-center text-[#58CC02]">
           <ShieldCheck className="w-5 h-5 mr-1" />
           <span className="text-[10px] font-black uppercase tracking-tighter">Secure Onboarding</span>
        </div>
      </div>

      {/* Step 1: Initial Login Page */}
      {step === 1 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-24 h-24 bg-[#58CC02] rounded-3xl mx-auto flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
            <span className="text-white text-4xl font-black">VU</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Login to SmartVU</h1>
            <p className="text-gray-500 font-bold text-lg">Enter your student name to begin.</p>
          </div>
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-5 text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#58CC02] focus:bg-white transition-all text-center"
            />
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!name.trim()}
            className="w-full py-5 bg-[#58CC02] duo-button border-b-[#46A302] text-white text-xl font-black rounded-2xl disabled:opacity-50 flex items-center justify-center space-x-2 shadow-xl shadow-green-100"
          >
            <span>NEXT</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Securely stored on AWS RDS</p>
        </div>
      )}

      {/* Step 2: VU Email Verification */}
      {step === 2 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Mail className="w-8 h-8 text-[#1CB0F6]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-800 leading-tight">University Email</h1>
              <p className="text-sm font-bold text-gray-400">Strictly @vu.edu.pk required</p>
            </div>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="bc123456789@vu.edu.pk"
              className="w-full p-5 text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all"
            />
            {error && <p className="text-red-500 font-bold text-sm bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
          </div>
          <button
            onClick={() => startVerification('email')}
            disabled={!email || loading}
            className="w-full py-5 bg-[#1CB0F6] duo-button border-b-[#1899D6] text-white text-xl font-black rounded-2xl disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'GENERATE CODE'}
          </button>
          <button onClick={() => setStep(1)} className="w-full text-gray-400 font-black text-xs uppercase tracking-widest">Back</button>
        </div>
      )}

      {/* Step 3: Email OTP Verification */}
      {step === 3 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-100">
              <Lock className="w-8 h-8 text-[#1CB0F6]" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">Verify Email</h1>
            <p className="text-gray-500 font-bold mt-2">Enter the 6-digit code sent to:<br/><span className="text-[#1CB0F6]">{email}</span></p>
          </div>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full p-5 text-3xl tracking-[0.5em] text-center font-black bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#1CB0F6] focus:bg-white"
          />
          {error && <p className="text-red-500 font-bold text-center text-sm">{error}</p>}
          <button
            onClick={verifyOtp}
            disabled={otp.length !== 6}
            className="w-full py-5 bg-[#58CC02] duo-button border-b-[#46A302] text-white text-xl font-black rounded-2xl disabled:opacity-50 shadow-lg shadow-green-100"
          >
            CONTINUE
          </button>
          <button onClick={() => setStep(2)} className="w-full text-gray-400 font-black text-xs uppercase tracking-widest">Incorrect Email? Try again</button>
        </div>
      )}

      {/* Step 4: WhatsApp Verification Input */}
      {step === 4 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <Phone className="w-8 h-8 text-[#58CC02]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-800 leading-tight">WhatsApp Alerts</h1>
              <p className="text-sm font-bold text-gray-400">For instant task notifications</p>
            </div>
          </div>
          <p className="text-gray-500 font-bold">Please enter your active WhatsApp number.</p>
          <div className="space-y-4">
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value); setError(''); }}
              placeholder="+92 300 1234567"
              className="w-full p-5 text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#58CC02] focus:bg-white transition-all"
            />
            {error && <p className="text-red-500 font-bold text-sm bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
          </div>
          <button
            onClick={() => startVerification('whatsapp')}
            disabled={!whatsapp || loading}
            className="w-full py-5 bg-[#58CC02] duo-button border-b-[#46A302] text-white text-xl font-black rounded-2xl disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'GENERATE WHATSAPP CODE'}
          </button>
        </div>
      )}

      {/* Step 5: WhatsApp OTP Verification */}
      {step === 5 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
              <Lock className="w-8 h-8 text-[#58CC02]" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">Verify WhatsApp</h1>
            <p className="text-gray-500 font-bold mt-2">Enter the code sent to your mobile</p>
          </div>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full p-5 text-3xl tracking-[0.5em] text-center font-black bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#58CC02] focus:bg-white"
          />
          {error && <p className="text-red-500 font-bold text-center text-sm">{error}</p>}
          <button
            onClick={verifyOtp}
            disabled={otp.length !== 6}
            className="w-full py-5 bg-[#1CB0F6] duo-button border-b-[#1899D6] text-white text-xl font-black rounded-2xl disabled:opacity-50 shadow-lg shadow-blue-100"
          >
            VERIFY & PROCEED
          </button>
          <button onClick={() => setStep(4)} className="w-full text-gray-400 font-black text-xs uppercase tracking-widest">Wrong Number? Go Back</button>
        </div>
      )}

      {/* Step 6: Program Select (Preserved existing functionality) */}
      {step === 6 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-gray-800 leading-tight">Almost there!</h1>
            <p className="text-gray-500 font-bold">What are you studying at VU?</p>
          </div>
          <div className="space-y-4">
            <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Select Program</p>
            <div className="grid grid-cols-3 gap-4">
              {PROGRAMS.map(p => (
                <button
                  key={p}
                  onClick={() => setProgram(p)}
                  className={`py-5 rounded-2xl border-2 font-black transition-all ${
                    program === p ? 'bg-[#DDF4FF] border-[#1CB0F6] text-[#1CB0F6]' : 'bg-white border-gray-200 text-gray-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Current Semester</p>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full p-5 text-lg font-bold bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <button
            onClick={() => setStep(7)}
            disabled={!program}
            className="w-full py-5 bg-[#58CC02] duo-button border-b-[#46A302] text-white text-xl font-black rounded-2xl disabled:opacity-50 shadow-lg shadow-green-100"
          >
            CONTINUE
          </button>
        </div>
      )}

      {/* Step 7: Course Selection (Preserved existing functionality) */}
      {step === 7 && (
        <div className="bg-white duo-card border-2 border-gray-200 rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-gray-800 leading-tight">Your Courses</h1>
            <p className="text-gray-500 font-bold">Pick your active courses for this semester.</p>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_COURSES.filter(c => program && c.program.includes(program) && c.semester === semester).map(course => (
              <button
                key={course.code}
                onClick={() => handleToggleCourse(course.code)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 font-bold transition-all ${
                  selectedCourses.includes(course.code)
                    ? 'bg-[#DDF4FF] border-[#1CB0F6] text-[#1CB0F6]'
                    : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
              >
                <div className="text-left">
                  <div className="text-xs font-black opacity-60 uppercase tracking-widest">{course.code}</div>
                  <div className="text-lg">{course.name}</div>
                </div>
                {selectedCourses.includes(course.code) ? (
                  <CheckCircle2 className="w-6 h-6 text-[#1CB0F6]" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                )}
              </button>
            ))}
          </div>
          <div className="flex space-x-4 pt-4">
            <button onClick={() => setStep(6)} className="w-1/3 py-4 bg-white duo-button border-b-gray-300 border-2 border-gray-200 text-gray-500 text-xl font-black rounded-2xl">BACK</button>
            <button
              onClick={handleFinish}
              disabled={selectedCourses.length === 0}
              className="flex-1 py-5 bg-[#58CC02] duo-button border-b-[#46A302] text-white text-xl font-black rounded-2xl disabled:opacity-50 shadow-lg shadow-green-100"
            >
              FINISH SETUP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
