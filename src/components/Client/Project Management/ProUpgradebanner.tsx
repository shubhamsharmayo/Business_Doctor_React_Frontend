import { Crown, ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function ProUpgradeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden rounded-xl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          {/* Left content */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-full">
              <Crown className="w-6 h-6 text-yellow-300" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold text-yellow-300 uppercase tracking-wide">
                  Upgrade to Pro
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-1">
                Get AI + Human Coach Support
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                Unlock personalized mentorship alongside AI insights for faster,
                smarter business growth
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="flex items-center gap-4">
            {/* Benefits (hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-200" />
                <span className="text-white/90">1-on-1 Coaching</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-200" />
                <span className="text-white/90">Priority Support</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link to={"/prices"}>
              <button className="group cursor-pointer bg-white text-purple-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/95 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 hover:-translate-y-0.5 flex items-center gap-2">
                Upgrade Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
