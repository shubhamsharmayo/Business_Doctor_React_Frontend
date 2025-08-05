import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from "react-icons/fa";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
       <div
     onClick={toggleTheme}
     className="relative w-20 h-8 flex items-center
     bg-gray-300 dark:bg-gray-500
     rounded-full p-1 cursor-pointer
     transition-all duration-300 ease-in-out"
    >
     {/* Sliding Sun and Moon */}
     <span
        className={`absolute w-6 h-6 flex items-center justify-center
         rounded-full shadow-md transition-transform duration-500 ease-in-out
         ${theme === "dark" ? "translate-x-10" : "translate-x-0"}
        `}
     >
        {theme === "light" ? (
         <FaMoon className="text-gray-800" size="20" />
        ) : (
         <FaSun className="text-yellow-400" size="20" />
        )}
     </span>
    </div>
  );
}
