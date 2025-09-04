import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import TopNavBar from "../components/TopMenubar"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingAnimation = {
    transform: `translate(${mousePosition.x * 0.02}px, ${
      mousePosition.y * 0.02
    }px)`,
    transition: "transform 0.2s ease-out",
  };

  return (
    <>
      <TopNavBar />
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-5 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={floatingAnimation}
      >
        {/* 404 Number with glassmorphism effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl -z-10 transform rotate-1"></div>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 animate-bounce" />
            <span className="text-yellow-400 font-semibold tracking-wide">
              PAGE NOT FOUND
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! This page has gone missing
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div
        className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-400 border-opacity-30 rotate-45 animate-spin"
        style={{ animationDuration: "20s" }}
      ></div>
      <div className="absolute top-3/4 right-1/4 w-12 h-12 border-2 border-purple-400 border-opacity-30 rotate-12 animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-pink-400 bg-opacity-20 rounded-full animate-pulse"></div>
    </div>
    </>
  );
}
