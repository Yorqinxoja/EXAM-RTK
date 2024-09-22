import React from "react";
import { Link } from "react-router-dom";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useLocation } from "react-router-dom";

const { Search } = Input;

const Sidebar = () => {
  const { pathname } = useLocation();

  if (pathname.includes("auth") || pathname.includes("dashboard")) return null;
  if (pathname.includes("/details")) return null;

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="sidebar flex items-center justify-between w-full p-4 shadow-md sticky top-0 z-10 bg-black">
        <ul className="flex space-x-6">
          <li>
            <Link
              className="flex items-center text-[20px] text-blue-500 hover:text-white"
              to="/auth/login"
            >
              <LoginOutlined className="mr-1" />
              Login
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center text-[20px] text-blue-500 hover:text-white"
              to="/auth/signup"
            >
              <UserAddOutlined className="mr-1" />
              Signup
            </Link>
          </li>
        </ul>

        <div className="w-full max-w-lg mx-4">
          <Search
            className="w-full"
            placeholder="Search..."
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            style={{ backgroundColor: "black", color: "white" }}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
