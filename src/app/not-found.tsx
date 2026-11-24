import Link from "next/link";

export default function NotFound() {
    return (
        <section className="container mx-auto px-4 py-24 text-center">
            <p className="text-7xl mb-4">🛒</p>
            <h1 className="text-5xl font-extrabold text-neutral-900">৪০৪</h1>
            <h2 className="mt-3 text-xl font-bold text-neutral-800">
                দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
                আপনি যে লিংকটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা ঠিকানাটি ভুল।
            </p>
            <Link href="/" className="btn btn-neutral rounded-full mt-6">
                হোম পেজে ফিরে যান
            </Link>
        </section>
    );
}