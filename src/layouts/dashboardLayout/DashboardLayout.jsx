import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatHistory from "../../components/chatHistory/ChatHistory";

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
    <div className="flex gap-[50px] pt-5 h-full">
      <div className="flex-1">
        <ChatHistory />
      </div>
      <div className="flex-[4] bg-customCinder">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
