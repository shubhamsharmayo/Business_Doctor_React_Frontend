// src/components/Sidebar.tsx
import { Home, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Dashboard", icon: Home, to: "/client/dashboard" },
  //  { name: "", icon: MessageCircle, to: "/client/chat" },
];

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();

  return (
    <aside
      className={clsx(
        "h-[calc(100vh-65px)] bg-gray-50 dark:bg-gray-700 dark:text-white text-black flex flex-col transition-all duration-300 ",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex justify-between  p-4">
        <button className=" p-1 rounded-md " onClick={() => setIsOpen(!isOpen)}>
          <Menu size={20} />
          
            
        </button>
        {isOpen && <span><ThemeToggle /></span>}
            
      </div>

      <nav className="space-y-1">
        {navItems.map(({ name, icon: Icon, to }) => (
          <Link
            key={name}
            to={to}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium transition hover:bg-gray-700",
              pathname === to ? "bg-gray-300" : ""
            )}
          >
            <Icon size={20} />
            {isOpen && <span>{name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
