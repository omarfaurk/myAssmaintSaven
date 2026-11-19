
import React from 'react';
import NavLinks from './NavLinks';
import Image from 'next/image';

const Navbar = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            {/* Main Navbar */}
            <div className="container mx-auto">
                <div className="navbar bg-base-100">

                    {/* Navbar Start */}
                    <div className="navbar-start">

                        {/* Mobile Dropdown */}
                        <div className="dropdown lg:hidden">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>

                            {/* Mobile Category Menu */}
                            <ul
                                tabIndex={0}
                                className="menu menu-vertical dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow"
                            >
                                <NavLinks />
                            </ul>
                        </div>

                        {/* Logo and Website Name */}
                        <div className="flex items-center gap-3 ml-2">
                            <Image
                                src="/logo-icon.png"
                                alt="Logo Images"
                                width={30}
                                height={30}
                            />

                            <div>
                                <h1 className="text-sm sm:text-xl font-bold text-gray-900">
                                    বাজার দর
                                </h1>

                                <p className="text-[10px] sm:text-xs text-gray-500">
                                    {date}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Authentication */}
                    <div className="navbar-end">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button className="btn btn-sm btn-outline btn-success">
                                সাইন ইন
                            </button>

                            <button className="btn btn-sm btn-success">
                                সাইন আপ
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <hr className="border-t border-gray-300 w-full m-0" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex justify-start container mx-auto">
                <ul className="menu menu-horizontal px-1 gap-4">
                    <NavLinks />
                </ul>
            </div>

            <hr className="border-t border-gray-300 w-full m-0" />
        </>
    );
};
export default Navbar;
