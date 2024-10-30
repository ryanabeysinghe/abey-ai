import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
      <div>MENU</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
