import  { useState } from "react";
import { Check } from "lucide-react";

const PriceCard = ({
  title = "Professional",
  price = 49,
  originalPrice = 79,
  currency = "$",
  period = "month",
  features = ["50 members", "Unlimited projects", "Priority support"],
  isPopular = true,
  badge = null,
  buttonText = "Get Started",
  onSelect = () => console.log("[]"),
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const savings = originalPrice - price;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div
      className={`
      relative bg-white rounded-lg border-2 transition-all duration-300 w-72
      ${
        isPopular
          ? "border-blue-500 shadow-lg"
          : "border-gray-200 hover:border-blue-300"
      }
      ${isHovered ? "shadow-xl" : "shadow-md hover:shadow-lg"}
    `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Popular
          </div>
        </div>
      )}

      {/* Custom Badge */}
      {badge && !isPopular && (
        <div className="absolute -top-2 right-3">
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {badge}
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        </div>

        {/* Pricing */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            {originalPrice > price && (
              <span className="text-sm text-gray-400 line-through">
                {currency}
                {originalPrice}
              </span>
            )}
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                {currency}
                {price}
              </span>
              <span className="text-gray-600 text-sm">/{period}</span>
            </div>
          </div>

          {originalPrice > price && (
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              Save {savingsPercent}%
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-4">
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className={`
            w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200
            ${
              isPopular
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }
          `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PriceCard;
