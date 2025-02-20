import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatHistory from "../../components/ChatHistory";

const DashboardLayout = () => {

  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
        navigate("/sign-in")
    }
  }, [isLoaded, userId, navigate]);


  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div>
      <div>
        <ChatHistory />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
