import { Home, Menu } from "lucide-react";
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
    <header className="w-full h-16 px-4 flex items-center justify-between shadow-sm bg-white border-b">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button> */}
        <h1 className="text-xl font-semibold tracking-tight">
          Business Doctor
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Home className="h-5 w-5" />
        </Button>

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
      </div>
    </header>
  );
}
