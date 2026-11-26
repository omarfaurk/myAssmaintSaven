"use client";
import { signIn, signUp } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
    const onGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };
    const onGitHubSignIn = async () => {
        await signIn.social({
            provider: "github",
            callbackURL: "/",
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(
            formData.entries()
        ) as {
            name: string;
            email: string;
            image: string;
            password: string;
        };

        const { data, error } = await signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
            callbackURL: "/",
        });
        if (data) {
            toast('🦄 Success Full Your Sign Up!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            redirect('/')
        }
        if (error) {
            console.log("Signup Error:", error);
            return;
        }
        console.log("Signup Success:", data);
    };

    return (
        <div className="min-h-screen bg-[#f6f8f7] flex flex-col items-center justify-center my-10 px-4">

            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="text-sm sm:text-base text-neutral-500 mt-2">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>


            <form
                onSubmit={onSubmit}
                className="fieldset rounded-2xl w-full max-w-md border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
            >
                <label className="label text-sm font-medium text-neutral-800">নাম</label>
                <input
                    name="name"
                    type="text"
                    className="input input-bordered w-full rounded-xl bg-white"
                    placeholder="যেমন: রহিম উদ্দিন"
                    required
                />

                <label className="label text-sm font-medium text-neutral-800 mt-3">
                    ইমেইল
                </label>
                <input
                    name="email"
                    type="email"
                    className="input input-bordered w-full rounded-xl bg-white"
                    placeholder="you@example.com"
                    required
                />

                <label className="label text-sm font-medium text-neutral-800 mt-3">
                    ছবি
                </label>
                <input
                    name="image"
                    type="url"
                    className="input input-bordered w-full rounded-xl bg-white"
                    placeholder="ছবির URL (Optional)"
                />

                <label className="label text-sm font-medium text-neutral-800 mt-3">
                    পাসওয়ার্ড
                </label>
                <input
                    name="password"
                    type="password"
                    className="input input-bordered w-full rounded-xl bg-white"
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    minLength={8}
                    required
                />

                <label className="label text-sm font-medium text-neutral-800 mt-3">
                    পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                    name="confirmPassword"
                    type="password"
                    className="input input-bordered w-full rounded-xl bg-white"
                    placeholder="আবার লিখুন"
                    minLength={8}
                    required
                />

                <button
                    type="submit"
                    className="btn mt-5 w-full rounded-xl border-0 bg-[#0b8438] hover:bg-[#096d2e] text-white font-semibold"
                >
                    অ্যাকাউন্ট তৈরি করুন
                </button>

                <div className="divider text-xs text-neutral-400 my-4">অথবা</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={onGoogleSignIn}
                        className="btn btn-outline w-full rounded-xl border-gray-200 text-neutral-800 hover:bg-neutral-50 font-medium text-xs sm:text-sm"
                    >
                        <span><Image src={'/google.png'} alt="icon Image" width={40} height={40} /></span>
                        <span>Google দিয়ে চালিয়ে যান</span>
                    </button>

                    <button
                        type="button"
                        onClick={onGitHubSignIn}
                        className="btn btn-outline w-full rounded-xl border-gray-200 text-neutral-800 hover:bg-neutral-50 font-medium text-xs sm:text-sm"
                    >
                        <span><Image src={'/github.png'} alt="icon Image" width={40} height={40} /></span>
                        <span>GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                <p className="mt-6 text-center text-xs sm:text-sm text-neutral-500">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signIn"
                        className="font-semibold text-[#0b8438] hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </form>

            {/* Back to Home */}
            <Link
                href="/"
                className="mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 hover:text-neutral-800 transition"
            >
                <span>←</span>
                <span>হোম পেজে ফিরে যান</span>
            </Link>
        </div>
    );
};

export default SignUpPage;

