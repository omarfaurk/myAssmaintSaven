import React from "react";
import ProductsCard from "./ProductsCard";

export interface Products {
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

const Totalproducts = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        { cache: "no-store" }
    );
    const resData = await res.json();

    const rawProducts: Products[] = Array.isArray(resData)
        ? resData
        : Array.isArray(resData?.data)
            ? resData.data
            : Array.isArray(resData?.products)
                ? resData.products
                : [];

    return (
        <section className="my-8 px-4 container mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                    সব পণ্য
                </h1>
                <p className="text-sm text-neutral-500 mt-2">
                    মোট {toBengaliNumber(rawProducts.length)}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rawProducts.map((product) => (
                    <ProductsCard
                        key={product.id ?? product.slug}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default Totalproducts;