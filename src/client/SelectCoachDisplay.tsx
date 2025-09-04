
// this component shows the information about the types of coach that are avaliable for clients
//when user has not selected a coach only then this will be shown in meeting component 




import  { useState, useEffect } from 'react';
import { Users, Award, Target, Clock,  Star } from 'lucide-react';

export default function SelectCoachDisplay() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:text-white dark:bg-gray-700 from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6 my-13">
      <div className="max-w-4xl mx-auto text-center dark:text-white">
        {/* Main Content Container */}
        <div className={`transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Icon Container */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500  to-indigo-600 rounded-full flex items-center justify-center shadow-xl">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl dark:text-white lg:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
            Select Coach
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl dark:text-white text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Choose from our network of professional coaches to guide your journey towards success
          </p>

          {/* Description Text */}
          <div className="bg-white rounded-2xl  dark:bg-gray-700 p-8 shadow-xl dark:shadow-black border border-slate-200 mb-8 text-left max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center dark:text-white">
              Find Your Perfect Coaching Match
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-4 dark:text-white dark:bg-gray-700">
              Our carefully curated selection of professional coaches are here to help you unlock your potential 
              and achieve your goals. Each coach brings unique expertise, proven methodologies, and a commitment 
              to your success.
            </p>
            
            <p className="text-slate-600 leading-relaxed mb-4 dark:text-white dark:bg-gray-700">
              Whether you're looking to advance your career, improve your leadership skills, enhance work-life 
              balance, or navigate significant life transitions, we have the right coach for you. Our matching 
              process ensures you connect with someone who understands your specific needs and challenges.
            </p>
            
            <p className="text-slate-600 leading-relaxed dark:text-white dark:bg-gray-700">
              Take the first step towards transformation by selecting a coach who aligns with your goals, 
              schedule, and preferred coaching style. Your journey to personal and professional excellence 
              starts with the right guidance.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 dark:text-white dark:bg-gray-700">
            <div className="bg-white rounded-xl dark:text-white dark:bg-gray-700 p-6 shadow-lg dark:shadow-black border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 dark:text-white dark:bg-gray-700 ">Certified Professionals</h3>
              <p className="text-sm text-slate-600 dark:text-white dark:bg-gray-700">All coaches are certified and experienced</p>
            </div>
            
            <div className="bg-white dark:shadow-black rounded-xl p-6 shadow-lg dark:text-white dark:bg-gray-700 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12  bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 dark:text-white dark:bg-gray-700">Goal-Oriented</h3>
              <p className="text-sm text-slate-600 dark:text-white dark:bg-gray-700">Focused on achieving your specific objectives</p>
            </div>
            
            <div className="bg-white dark:shadow-black rounded-xl p-6 shadow-lg dark:text-white dark:bg-gray-700 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 dark:text-white dark:bg-gray-700">Proven Results</h3>
              <p className="text-sm text-slate-600 dark:text-white dark:bg-gray-700">Track record of successful client outcomes</p>
            </div>
            
            <div className="bg-white dark:shadow-black rounded-xl p-6 shadow-lg dark:text-white dark:bg-gray-700 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 dark:text-white dark:bg-gray-700">Flexible Scheduling</h3>
              <p className="text-sm text-slate-600 dark:text-white dark:bg-gray-700">Sessions that fit your busy lifestyle</p>
            </div>
          </div>

          {/* Call to Action */}
          {/* <div className="space-y-4">
            <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              Browse Available Coaches
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <p className="text-slate-500 text-sm">
              Ready to start your transformation journey?
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}