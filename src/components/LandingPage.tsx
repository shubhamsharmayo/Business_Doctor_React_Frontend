import React, { useState, useEffect } from "react";

import type { FC } from 'react'; // ✅ Type-only import

import { useUser } from "@clerk/clerk-react";
import TopNavBar from "./TopMenubar";
import { useNavigate } from 'react-router';
import { Sparkles, BarChart3, CheckCircle, ArrowRight, Star, Zap, Brain, TrendingUp, DollarSign, FileText, Shield } from 'lucide-react';

type AnimatedCounterProps = {
  end: number;
  duration?: number; // in ms
};

type FeatureCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  delay?: number; // in ms
};

const features = [
  {
    title: 'Market Research & Analysis',
    description:
      'Access real-time market data, competitor analysis, and industry trends to inform your business strategy.',
    icon: BarChart3
  },
  {
    title: 'Financial Projections',
    description:
      'Generate realistic financial models and cash flow projections based on your business parameters.',
    icon: DollarSign
  },
  {
    title: 'Business Plan Generation',
    description:
      'Create comprehensive, investor-ready business plans with all essential components.',
    icon: FileText
  },
  {
    title: 'Risk Assessment',
    description:
      'Identify potential challenges and develop mitigation strategies before they become problems.',
    icon: Shield
  },
];

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>
);

const AnimatedCounter : FC<AnimatedCounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    let startTime : number | undefined;
    const animate = (currentTime:number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count}</span>;
};

const FeatureCard : FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`group relative bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (isSignedIn) {
      navigate('/client');
    }
  }, [isSignedIn, navigate]);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Entrepreneur",
      content: "Business Doctor helped me validate my SaaS idea in just 2 weeks. The AI insights were incredible!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Restaurant Owner",
      content: "From concept to launch in 30 days. The expert validation gave me the confidence I needed.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "E-commerce Founder",
      content: "The financial modeling feature saved me months of work. Absolutely game-changing!",
      rating: 5
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900">
      <TopNavBar/>
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-100/80 backdrop-blur-sm text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Business Launch Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Launch Your Business
            </span>
            <br />
            <span className="text-gray-900">With AI-Powered</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Expert Guidance
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Our intelligent AI assistant works alongside experienced business coaches to help you develop, validate, and launch your business with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end={1247} />+
              </div>
              <div className="text-gray-600">Businesses Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                <AnimatedCounter end={94} />%
              </div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                <AnimatedCounter end={30} />
              </div>
              <div className="text-gray-600">Days Average Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Business Planning </span>
            Assistant
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
            Our intelligent AI works alongside you to develop your business plan, conduct market research, and prepare for expert validation.
          </p>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">AI Business Assistant</div>
                    <div className="text-sm text-gray-500">Online • Ready to help</div>
                  </div>
                </div>
                <div className="text-left space-y-4">
                  <div className="bg-blue-50 rounded-2xl p-4 ml-16">
                    <p className="text-gray-700">I've analyzed your market and identified 3 key opportunities. Would you like me to create a detailed business plan for the most promising one?</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4 mr-16">
                    <p className="text-gray-700">Yes, let's focus on the SaaS opportunity. Can you also include financial projections?</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 ml-16">
                    <p className="text-gray-700">Perfect! I'm generating a comprehensive 5-year financial model with funding scenarios. This will take about 2 minutes...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-Powered </span>
              Business Planning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with human expertise to give you the best of both worlds.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expert Validation */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <CheckCircle className="w-4 h-4" />
                <span>Expert Validated</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Expert Validation</span>
                <br />Process
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                After your AI-assisted business plan is complete, our subject matter experts review and validate your plan to ensure it's viable and ready for launch.
              </p>
              
              <div className="space-y-6">
                {[
                  "Comprehensive business plan review",
                  "Market opportunity assessment", 
                  "Financial model validation",
                  "Go-to-market strategy refinement",
                  "Risk assessment and mitigation"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format" 
                         alt="Expert" className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold text-gray-900">David Martinez</div>
                      <div className="text-sm text-gray-500">Senior Business Advisor</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold mb-3">1:1 Expert Review Session</h3>
                    <p className="text-gray-600 mb-4">
                      Schedule a session with an industry expert to validate your business plan before launch.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅 60 min session</span>
                      <span>💼 Industry expert</span>
                      <span>✅ Actionable feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Loved by
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Entrepreneurs </span>
            Worldwide
          </h2>
          
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-500">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Launch with
            <span className="text-yellow-300"> Confidence?</span>
          </h2>
          
          <p className="text-xl mb-12 leading-relaxed opacity-90 max-w-2xl mx-auto">
            Start your journey with our AI assistant and get expert validation to ensure you're on the right track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="group relative px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-xl">
              <span>Start Free Today</span>
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="text-sm opacity-75">
            ✨ No credit card required • 🚀 Launch in 30 days • 💯 Expert validation included
          </div>
        </div>
      </section>
    </main>
  );
}