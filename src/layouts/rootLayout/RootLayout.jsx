import React from "react";
import { Link, Outlet } from "react-router-dom";
// import "./rootLayout.css"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// Import publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="py-4 px-16 h-[100vh] flex flex-col">
        <header className="flex items-center justify-between">
          <Link to={"/"} className="flex items-center font-bold gap-2">
            <img
              src="/logo.png"
              alt="Abey AI Logo"
              className="w-[32px] h-[32px]"
            />
            <span className="uppercase">abey ai</span>
          </Link>
          <div className="">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
