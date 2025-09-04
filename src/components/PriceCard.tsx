import { useState } from "react";
import { Check, Star, Zap } from "lucide-react";

const PriceCard = ({
  title = "Professional",
  price = 49,
  originalPrice = 79,
  currency = "$",
  period = "month",
  features = [
    "50 team members",
    "Unlimited projects",
    "Priority support",
    "Advanced analytics",
  ],
  isPopular = true,
  badge = null,
  buttonText = "Get Started",
  onSelect = () => console.log("Selected"),
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const savings = originalPrice - price;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div
      className={`
        relative group w-80 h-[480px] bg-gradient-to-br from-white via-gray-50/50 to-white 
        backdrop-blur-sm border border-gray-200/60 rounded-2xl 
        transition-all duration-700 ease-out
        ${
          isHovered
            ? "shadow-2xl shadow-black-500/10 -translate-y-2 scale-[1.02]"
            : "shadow-lg shadow-gray-200/50"
        }
        ${
          isPopular
            ? "ring-2 ring-blue-500/20 border-blue-200/40"
            : "hover:border-gray-300/60"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/20 to-pink-100/20 rounded-full blur-2xl translate-y-12 -translate-x-12" />

      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-50">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg">
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-current" />
                Most Popular
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-50 -z-10" />
          </div>
        </div>
      )}

      {/* Custom Badge */}
      {badge && !isPopular && (
        <div className="absolute -top-2 right-4 z-10">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {badge}
            </div>
          </div>
        </div>
      )}

      <div className="relative p-8 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
            {title}
          </h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Pricing */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            {originalPrice > price && (
              <div className="relative">
                <span className="text-lg text-gray-400 font-medium">
                  {currency}
                  {originalPrice}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-400 rotate-12 rounded-full" />
                </div>
              </div>
            )}
            <div className="flex items-baseline">
              <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {currency}
                {price}
              </span>
              <span className="text-gray-500 text-base font-medium ml-1">
                /{period}
              </span>
            </div>
          </div>

          {originalPrice > price && (
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Save {savingsPercent}% today
            </div>
          )}
        </div>

        {/* Features */}
        <div
          className="flex-grow mb-8 max-h-64 overflow-y-auto
            [scrollbar-width:thin] [scrollbar-color:rgba(107,114,128,0.5)_transparent] 
            [&::-webkit-scrollbar]:w-[1px] 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-transparent"
        >
          <ul className="space-y-4 pr-2">
            {features.slice(0, 4).map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm group/item"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 text-white stroke-2" />
                  </div>
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur-sm opacity-0 group-hover/item:opacity-30 transition-opacity duration-300" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className={`
            relative group/button w-full py-4 px-6 rounded-xl font-semibold text-sm
            transition-all duration-300 ease-out transform overflow-hidden cursor-pointer z-500
            ${
              isPopular
                ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-md hover:shadow-lg"
            }
            hover:scale-[1.02] active:scale-[0.98]
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000 " />
          <span className="relative z-10 flex items-center justify-center gap-2 ">
            {buttonText}
            {/* <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full opacity-0 group-hover/button:opacity-100 group-hover/button:animate-spin transition-opacity duration-300" /> */}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PriceCard;
