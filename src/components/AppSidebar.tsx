import { Home, Calendar, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

// Define types for navigation items
interface NavItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  to: string;
}

// Navigation items configuration
const navItems: NavItem[] = [
  { name: "Dashboard", icon: Home, to: "/client/dashboard" },
  { name: "Meetings", icon: Calendar, to: "/client/meetings" },
];

const AppSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Handler for ThemeToggle to also toggle sidebar
  const handleThemeToggle = () => {
    setIsOpen(true);
  };
  const removeThemeToggle = () => {
    setIsOpen(false);
  };
 

  return (
    <aside onMouseEnter={handleThemeToggle} onMouseLeave={removeThemeToggle}
      className={clsx(
        " top-16 left-0 z-10 h-[calc(100vh-4rem)] flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 ease-in-out",
        "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
        isOpen ? "w-64" : "w-16"
      )}
      aria-label="Sidebar navigation"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Client Portal
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dashboard
              </p>
            </div>
          </div>
        )}
        {isOpen&&(
           <div className={clsx("flex", isOpen ? "ml-auto" : "mx-auto")}>
          <ThemeToggle  />
        </div>)
        }
       
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1" aria-label="Main navigation">
        {navItems.map(({ name, icon: Icon, to }) => {
          const isActive = pathname === to;
          return (
            <div key={name} className="relative group">
              <Link
                to={to}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full opacity-90" />
                )}
                <Icon
                  size={20}
                  className={clsx(
                    "flex-shrink-0",
                    isActive
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                  )}
                />
                {isOpen && <span className="truncate">{name}</span>}
              </Link>
              {!isOpen && (
                <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-200 text-xs rounded py-1 px-2 z-20 shadow-md">
                  {name}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 dark:bg-gray-700 rotate-45" />
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div
        className={clsx(
          "p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950",
          !isOpen && "px-2"
        )}
      >
        {isOpen ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  System Status
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  All systems operational
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                © {new Date().getFullYear()} Your Company
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {new Date().getFullYear()}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;