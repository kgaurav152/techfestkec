"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";
import { LogOutIcon } from "lucide-react";

const HospitalityNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const router = useRouter();
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    const { data } = await apiConnector("GET", "/api/logout");
    if (data.success) {
      toast.success("Logout Successful");
      dispatch(setUserDetails(null));
      Cookies.remove("token");
      Cookies.remove("userType");
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data } = await apiConnector("POST", "/api/userDetails");
      dispatch(setUserDetails(data?.data));
    };
    const token = Cookies.get("token");
    if (token) {
      fetchUserDetails();
    }
  }, [dispatch]);

  return (
    <nav className="bg-gray-900 p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link
            href="/admin/dashboard"
            className="text-white font-bold text-lg"
          >
            <Image
              src="/TechFusionLogo.svg"
              width={30}
              height={30}
              alt="TechFusion'25 Logo"
            />
          </Link>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex items-center justify-center md:space-x-8 mr-4">
          <Link
            href="/hospitality/dashboard"
            className="text-white hover:text-[#e11d48]"
          >
            Dashboard
          </Link>
          <Link
            href="/hospitality/college"
            className="text-white hover:text-[#e11d48]"
          >
            College Hospitality
          </Link>
          <Link
            href="/hospitality/school"
            className="text-white hover:text-[#e11d48]"
          >
            School Hospitality
          </Link>
          {user && (
            <Link
              href="/admin/profile"
              className="text-white hover:text-[#e11d48]"
            >
              Profile
            </Link>
          )}
          {user ? (
            <Popover>
              <PopoverTrigger>
                {" "}
                <Avatar>
                  {user.gender === "female" ? (
                    <AvatarImage src="/avatar_01.png" />
                  ) : (
                    <AvatarImage src="/avatar_02.png" />
                  )}
                  <AvatarFallback className="bg-slate-800">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit py-1 px-2">
                <Button
                  className="flex text-rose-500 hover:text-rose-700 items-center justify-center gap-3"
                  variant="ghost"
                  onClick={logoutHandler}
                >
                  {" "}
                  <LogOutIcon className="w-5 h-5" />
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
              Login
            </Link>
          )}
        </div>

        {/* Menu icon for mobile screens */}
        <div className="md:hidden mr-1">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Responsive menu for mobile screens */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/hospitality/dashboard"
              className="text-white hover:text-[#e11d48]"
            >
              Dashboard
            </Link>
            <Link
              href="/hospitality/college"
              className="text-white hover:text-[#e11d48]"
            >
              College Hospitality
            </Link>
            <Link
              href="/hospitality/school"
              className="text-white hover:text-[#e11d48]"
            >
              School Hospitality
            </Link>
            {user && (
              <Link
                href="/admin/profile"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-white hover:text-[#e11d48]"
              >
                Profile
              </Link>
            )}
            {user ? (
              <Popover>
                <PopoverTrigger>
                  {" "}
                  <Avatar>
                    {user.gender === "female" ? (
                      <AvatarImage src="avatar_01.png" />
                    ) : (
                      <AvatarImage src="avatar_02.png" />
                    )}
                    <AvatarFallback className="bg-slate-800 text-white">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit text-white bg-black/50 border-primary">
                  <Button variant="destructive" onClick={logoutHandler}>
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-white hover:text-[#e11d48]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default HospitalityNavBar;
