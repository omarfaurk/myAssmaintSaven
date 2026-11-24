import React from "react";

const Footer = () => {
    return (
        <footer className="mt-12 border-t border-slate-200 bg-white py-5">
            <div className="mx-auto container px-4">
                <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                    {/* Left Content */}
                    <div className="text-center md:text-left">
                        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                        </h2>
                    </div>

                    {/* Right Content */}
                    <p className="text-center text-xs text-slate-500 md:text-right">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;