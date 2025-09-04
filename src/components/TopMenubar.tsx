import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router";

export default function TopNavBar() {
  return (
    <header
      className=" fixed z-50 w-full h-17 px-4 py-4 flex items-center justify-between 
     shadow-lg shadow-[0_4px_20px_rgba(147,51,234,0.4)] 
      backdrop-blur-3xl "
    >
      {/* Left side */}
      <Link to={"/"}>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Business Doctor
          </h1>
        </div>
      </Link>
      {/* Center Navigation - Hidden on mobile */}
      {/* <div className="hidden md:flex items-center space-x-8">
      <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
      <a href="#validation" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Validation</a>
      <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
    </div> */}

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Show sign in button when user is signed out */}
        <SignedOut>
          <div className="flex gap-2">
            <SignInButton mode="modal" fallbackRedirectUrl="/client/dashboard">
              <Button variant="outline" className="text-sm dark:text-black dark:bg-gray-100">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal" fallbackRedirectUrl="/onboard">
              <Button variant="default" className="text-sm">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>

        {/* Show user avatar when signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <span className="text-gray-400">v0.27</span>
      </div>
    </header>
  );
}
