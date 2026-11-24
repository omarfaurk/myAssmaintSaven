import Image from 'next/image';

import BanglaDate from './BanglaDate';

const Banner = () => {

    return (
        <section className="container mx-auto px-4 py-10 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 rounded-3xl bg-white shadow-2xl p-6 md:p-12">
                {/* Left Content */}
                <div className="space-y-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        <BanglaDate />
                    </span>
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
                            আজকের বাজারের দাম এক নজরে
                        </h1>
                        <p className="max-w-xl text-base md:text-lg leading-8 text-gray-600">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
                            এবং দামের পরিবর্তন এক জায়গায়।
                        </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="btn btn-success rounded-xl px-6 text-white shadow-md hover:bg-green-700">
                            সব পণ্য দেখুন →
                        </button>

                    </div>

                </div>
                {/* Right Image */}
                <div className="relative flex justify-center items-center">
                    <div className="absolute h-64 w-64 rounded-full bg-green-200/60 blur-3xl"></div>
                    <Image
                        src="/bazar-hero.png"
                        width={600}
                        height={450}
                        alt="আজকের বাজারের পণ্য"
                        priority
                        className="relative z-10 h-auto w-full max-w-md object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;