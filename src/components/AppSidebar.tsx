// src/components/Sidebar.tsx
import { Home, MessageCircle, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", icon: Home, to: "/client/dashboard" },
 // { name: "", icon: MessageCircle, to: "/client/chat" },
  
];

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();

  return (
    <aside
      className={clsx(
        "h-screen bg-gray-100 dark:bg-gray-900 dark:text-white text-black flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <span className={clsx("text-lg font-bold", !isOpen && "hidden")}>
          MyApp
        </span>
        <button
          className="p-1 rounded-md "
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
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
