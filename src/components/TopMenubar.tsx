import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function TopNavBar() {
  return (
    <header className="dark:bg-gray-700 fixed z-10 w-full h-14 px-4 py-4 flex items-center justify-between shadow-sm bg-white/90 backdrop-blur-md border-b border-gray-200/50">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Business Doctor
        </h1>
      </div>

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
              <Button variant="outline" className="text-sm">
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
        <span className="text-gray-400">v0.25</span>
      </div>
    </header>
  );
}
