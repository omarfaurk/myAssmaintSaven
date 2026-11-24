"use client";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const socialSignIn = (provider: "google" | "github") =>
        signIn.social({ provider, callbackURL: "/" });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        setLoading(true);

        const { error } = await signIn.email({
            email: form.get("email") as string,
            password: form.get("password") as string,
        });

        setLoading(false);
        if (error) {
            toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।");
            return;
        }
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-[#f6f8f7] flex flex-col items-center justify-center  px-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">সাইন ইন করুন</h1>
                <p className="text-sm sm:text-base text-neutral-500 ">
                    অ্যাকাউন্টে ঢুকে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-1.5 h-fit rounded-2xl w-full max-w-md border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
            >
                <label className="label text-sm font-medium text-neutral-800">ইমেইল</label>
                <input name="email" type="email" className="input w-full rounded-xl" placeholder="you@example.com" required />

                <label className="label text-sm font-medium text-neutral-800 mt-3">পাসওয়ার্ড</label>
                <input name="password" type="password" className="input w-full rounded-xl" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required />

                <button type="submit" disabled={loading} className="btn btn-success text-white w-full rounded-xl mt-4">
                    {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
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
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signup" className="font-semibold text-[#0b8438] hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>
            </form>

            <Link href="/" className="mt-6 text-xs sm:text-sm text-neutral-500 hover:text-neutral-800 transition">
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignInPage;