import React from "react";
import { Link, Outlet } from "react-router-dom";
// import "./rootLayout.css"
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
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
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
