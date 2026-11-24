"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut, useSession } from "@/lib/auth-client";

const UseSection = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignout = async () => {
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setOpen(false);
                        toast.success("সফলভাবে সাইন আউট হয়েছে!");
                        router.push("/");
                        router.refresh();
                    },
                    onError: () => {
                        toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
                    },
                },
            });
        } catch {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        }
    };

    return (
        <div
            ref={dropdownRef}
            className="absolute right-4 top-5 flex items-center text-sm z-20"
        >
            {isPending ? (
                <div className="flex items-center gap-2.5">
                    <div className="skeleton h-10 w-10 rounded-xl shrink-0" />
                    <div className="skeleton h-4 w-20 rounded" />
                </div>
            ) : user ? (
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center gap-2.5 rounded-xl bg-white/90 hover:bg-neutral-100 px-2 transition cursor-pointer"
                    >
                        <div className="h-10 w-10  rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center border border-neutral-200/70 ">
                            {user.image ? (
                                <Image
                                    alt={user.name || "User Avatar"}
                                    src={user.image}
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="font-bold text-neutral-800 text-base">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                            )}
                        </div>

                        <span className="font-medium text-sm text-neutral-900">
                            {user.name}
                        </span>

                        <span
                            className={`text-[10px] text-neutral-500 transition-transform ${open ? "rotate-180" : ""
                                }`}
                        >
                            ▾
                        </span>
                    </button>

                    {/* Dropdown Menu */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-neutral-200 bg-white py-1.5 shadow-lg z-30">
                            <Link
                                href="/profile"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                            >
                                প্রোফাইল দেখুন
                            </Link>

                            <div className="my-1 border-t border-neutral-100" />

                            <button
                                type="button"
                                onClick={handleSignout}
                                className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
                            >
                                Signout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                    <Link href="/signIn">
                        <button type="button" className="btn btn-sm btn-outline btn-success">
                            সাইন ইন
                        </button>
                    </Link>
                    <Link href="/sign-Up">
                        <button type="button" className="btn btn-sm btn-success text-white">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UseSection;