import React from "react";
import { Link, Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-[600px] p-8 bg-white rounded-lg shadow-lg">
          <Link
            to={"/"}
            className="mt-8 text-blue-500 hover:text-blue-700 text-center block text-2xl"
          >
            Home
          </Link>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Auth;
