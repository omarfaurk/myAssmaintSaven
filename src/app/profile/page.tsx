"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient, signOut, useSession } from "@/lib/auth-client";


function getGravatarUrl(email?: string | null): string {
    const cleanEmail = (email || "user@example.com").trim().toLowerCase();

    // Lightweight deterministic hash for Gravatar / identicon fallback
    let hash = 0;
    for (let i = 0; i < cleanEmail.length; i++) {
        hash = (hash << 5) - hash + cleanEmail.charCodeAt(i);
        hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0").repeat(4).slice(0, 32);
    return `https://www.gravatar.com/avatar/${hex}?d=identicon&s=200`;
}

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending, refetch } = useSession();
    const user = session?.user;

    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            toast.error("প্রথমে সাইন ইন করুন।");
            return;
        }

        const trimmedName = String(new FormData(e.currentTarget).get("name") || "").trim();
        if (trimmedName.length < 2) {
            toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
            return;
        }

        // ইমেইল অনুযায়ী ছবি জেনারেট ও আপডেট
        const emailBasedImage = getGravatarUrl(user.email);

        setIsUpdating(true);
        try {
            const { error } = await authClient.updateUser({
                name: trimmedName,
                image: emailBasedImage,
            });

            if (error) {
                toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
                return;
            }

            if (refetch) {
                await refetch();
            }
            router.refresh();
            toast.success("নাম এবং ইমেইল অনুযায়ী ছবি আপডেট হয়েছে!");
        } catch {
            toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
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

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#f4f7f5] py-10 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="skeleton h-8 w-44" />
                    <div className="skeleton h-28 w-full rounded-2xl" />
                    <div className="skeleton h-52 w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#f4f7f5] flex flex-col items-center justify-center px-4 text-center">
                <div className="max-w-md w-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-2xs">
                    <h1 className="text-2xl font-bold text-neutral-900">
                        প্রোফাইল দেখতে সাইন ইন করুন
                    </h1>
                    <p className="text-sm text-neutral-500 mt-2">
                        আপনার অ্যাকাউন্টের তথ্য দেখতে ও আপডেট করতে লগইন প্রয়োজন।
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <Link
                            href="/signIn"
                            className="rounded-xl bg-[#0b8438] hover:bg-[#096d2e] text-white text-sm font-semibold px-5 py-2.5 transition"
                        >
                            সাইন ইন করুন
                        </Link>
                        <Link
                            href="/"
                            className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                        >
                            হোম পেজ
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const displayImage = user.image || getGravatarUrl(user.email);

    return (
        <div className="min-h-screen bg-[#f4f7f5] py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Top Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Summary Card */}
                <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 flex items-center justify-center">
                            <Image
                                src={displayImage}
                                alt={user.name || "User Avatar"}
                                width={64}
                                height={64}
                                unoptimized
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                                {user.name}
                            </h2>
                            <p className="text-sm text-neutral-500">{user.email}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 px-3.5 py-2 text-xs sm:text-sm font-semibold text-rose-600 transition cursor-pointer"
                    >
                        <span>←</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>

                {/* Info Update Form Card */}
                <div className="mt-6 rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-7 shadow-2xs">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-4">
                        তথ্য
                    </h3>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="profile-name"
                                className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5"
                            >
                                নাম
                            </label>
                            <input
                                id="profile-name"
                                name="name"
                                type="text"
                                defaultValue={user.name || ""}
                                placeholder="আপনার নাম লিখুন"
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#0b8438]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full rounded-xl bg-[#0b8438] hover:bg-[#096d2e] text-white font-semibold py-3 text-sm transition cursor-pointer disabled:opacity-60"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}