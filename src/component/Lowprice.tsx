import Link from "next/link";
import React from "react";

interface Product {
    id: string | number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon?: string;
    unit: string;
    image?: string;
    today: number;
    yesterday: number;
    lastWeek?: number;
    lastMonth?: number;
    change?: number;
    markets?: unknown;
}

const toBengaliNumber = (num: number | string): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
        .toLocaleString("en-IN")
        .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

const Lowprice = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        { cache: "no-store" }
    );
    const resData = await res.json();

    const rawProducts: Product[] = Array.isArray(resData)
        ? resData
        : Array.isArray(resData?.data)
            ? resData.data
            : Array.isArray(resData?.products)
                ? resData.products
                : [];
    const topFallers = rawProducts
        .map((item) => {
            const diffPercent =
                typeof item.change === "number"
                    ? item.change
                    : item.yesterday > 0
                        ? Number((((item.today - item.yesterday) / item.yesterday) * 100).toFixed(1))
                        : 0;
            return { ...item, diffPercent };
        })
        .filter((item) => item.diffPercent < 0)
        .sort((a, b) => a.diffPercent - b.diffPercent)
        .slice(0, 6);
    return (
        <section className="my-8 px-4 container mx-auto">
            <h2 className="text-xl font-bold mb-4 text-neutral-900">
                <span className="text-green-700">▼</span>  আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topFallers.map((item) => (
                    <Link
                        key={item.id ?? item.slug}
                        href={`/product/${item.slug ?? item.id}`}
                        className="block rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-neutral-300 hover:shadow-sm transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-2xl">
                                {item.categoryIcon ?? "🌶️"}
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900 leading-snug">
                                    {item.nameBn}
                                </h3>
                                <p className="text-sm text-neutral-500">{item.unit}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-end justify-between gap-2">
                            <div>
                                <span className="text-xs text-neutral-500 block mb-0.5">
                                    আজকের দাম
                                </span>
                                <span className="text-lg font-extrabold text-neutral-900">
                                    {toBengaliNumber(item.today)} টাকা
                                </span>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50/70 px-3 py-1 text-xs font-bold text-emerald-600">
                                ▼ {toBengaliNumber(Math.abs(item.diffPercent))}%
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Lowprice;