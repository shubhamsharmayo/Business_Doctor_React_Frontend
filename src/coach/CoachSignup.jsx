import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Button } from "../components/ui/button";
const CoachSignup = () => {
  return (
    <>
      {/* Show sign in button when user is signed out */}
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton mode="modal" fallbackRedirectUrl="/client/dashboard">
            <Button variant="outline" className="text-sm">
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="modal" fallbackRedirectUrl="/coach-onboarding">
            <Button variant="default" className="text-sm">
              Sign up as Coach
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      {/* Show user avatar when signed in */}
              <SignedIn>
                <UserButton />
              </SignedIn>
    </>
  );
};

export default CoachSignup;
