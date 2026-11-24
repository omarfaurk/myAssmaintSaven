"use client";
import { signUp, signIn } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const socialSignIn = (provider: "google" | "github") =>
        signIn.social({ provider, callbackURL: "/" });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = (form.get("name") as string).trim();
        const email = form.get("email") as string;
        const password = form.get("password") as string;

        if (name.length < 3) {
            toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
            return;
        }
        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        setLoading(true);
        const { error } = await signUp.email({ name, email, password });
        setLoading(false);

        if (error) {
            toast.error(error.message || "রেজিস্ট্রেশন করা যায়নি, আবার চেষ্টা করুন।");
            return;
        }
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
        router.push("/signin");
    };

    return (
        <div className="min-h-screen bg-[#f6f8f7] flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm sm:text-base text-neutral-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-1.5 h-fit rounded-2xl w-full max-w-md border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
            >
                <label className="label text-sm font-medium text-neutral-800">নাম</label>
                <input name="name" type="text" className="input w-full rounded-xl" placeholder="যেমন: রহিম উদ্দিন" required />

                <label className="label text-sm font-medium text-neutral-800 mt-3">ইমেইল</label>
                <input name="email" type="email" className="input w-full rounded-xl" placeholder="you@example.com" required />

                <label className="label text-sm font-medium text-neutral-800 mt-3">পাসওয়ার্ড</label>
                <input name="password" type="password" className="input w-full rounded-xl" placeholder="কমপক্ষে ৮ অক্ষর" required />

                <button type="submit" disabled={loading} className="btn btn-success text-white w-full rounded-xl mt-4">
                    {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার করুন"}
                </button>

                <div className="divider text-xs text-neutral-400 my-4">অথবা</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button type="button" onClick={() => socialSignIn("google")} className="btn btn-outline rounded-xl text-xs sm:text-sm">
                        <Image src="/google.png" alt="Google" width={20} height={20} />
                        Google
                    </button>
                    <button type="button" onClick={() => socialSignIn("github")} className="btn btn-outline rounded-xl text-xs sm:text-sm">
                        <Image src="/github.png" alt="GitHub" width={20} height={20} />
                        GitHub
                    </button>
                </div>

                <p className="mt-6 text-center text-xs sm:text-sm text-neutral-500">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signin" className="font-semibold text-[#0b8438] hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>
            </form>

            <Link href="/" className="mt-6 text-xs sm:text-sm text-neutral-500 hover:text-neutral-800 transition">
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignUpPage;