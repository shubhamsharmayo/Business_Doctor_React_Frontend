import {
  Lock,
  Crown,
  Zap,
  BarChart3,
  Headphones,
  Puzzle,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

const PlanComparisonCard = () => {
  const basicFeatures = [
    {
      name: "AI Chat – Discuss various business plans with AI",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  const proFeatures = [
    {
      name: "AI Chat – Discuss various business plans with AI",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      name: "1-on-1 Coach Guidance – Hire a coach for expert advice",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    { name: "Priority 24/7 support", icon: <Headphones className="w-4 h-4" /> },
    {
      name: "Personalized growth strategies",
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: "Real-world validation & feedback",
      icon: <Puzzle className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="max-w-4xl w-full  bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500  relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-indigo-400/30"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 p-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Upgrade Plan
            </h1>
            <p className="text-slate-300 text-lg">
              Current plan:{" "}
              <span className="font-semibold text-white">Basic</span>
            </p>
          </div>
        </div>

        {/* Side by Side Plans */}
        <div className="flex ">
          {/* Basic Plan Section */}
          <div className="flex-1 p-8 border-r border-purple-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4 border border-purple-200">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Basic Plan
              </h2>
              <div className="flex items-center justify-center">
                <span className="bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full font-semibold border border-purple-200">
                  CURRENT PLAN
                </span>
              </div>
              <div className="mt-4">
                {/* <span className="text-3xl font-bold text-slate-900">Free</span> */}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide mb-4">
                Features Included
              </h3>
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-center group ">
                  <div className="flex-shrink-0  w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-100 transition-colors">
                    <span className="text-slate-500">{feature.icon}</span>
                  </div>
                  <span className="text-sm text-slate-700  font-medium">
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan Section */}
          <div className="flex-1 p-8 bg-gradient-to-br from-purple-50/50 to-blue-50/50 relative">
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide flex items-center shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                RECOMMENDED
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl mb-4 border border-purple-200">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Pro Plan
              </h2>
              <div className="flex items-center justify-center mb-4">
                <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm px-4 py-2 rounded-full font-semibold border border-purple-200">
                  UPGRADE NOW
                </span>
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl font-bold text-slate-900">$200</span>
                {/* <span className="text-lg text-slate-600 ml-1">/month</span> */}
              </div>
              {/* <div className="mt-2 text-sm text-emerald-600 font-medium">
                Save 25% with annual billing
              </div> */}
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide mb-4">
                Everything in Basic, plus:
              </h3>
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center mr-4 group-hover:from-purple-100 group-hover:to-blue-100 transition-all border border-purple-100">
                    <span className="text-purple-600">{feature.icon}</span>
                  </div>
                  <span className="text-sm text-slate-800 font-semibold">
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link to={"/prices"}>
              <button className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-700 hover:via-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center group mb-4 cursor-pointer">
                <Crown className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Upgrade
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <div className="text-center text-xs text-slate-500 space-y-1">
              <p>No credit card required • Cancel anytime</p>
              <p className="text-purple-600 font-medium">
                Join 50,000+ professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanComparisonCard;
