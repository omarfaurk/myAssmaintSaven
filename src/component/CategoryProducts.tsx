"use client";


import React, { useMemo, useState } from "react";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { IProduct } from "@/typs";
import ProductsCard from "./ProductsCard";

const CategoryProducts = ({
    products,
}: {
    products: IProduct[];
}) => {
    const [sortBy, setSortBy] = useState("default");

    // Sorting Logic
    const sortedProducts = useMemo(() => {
        const data = [...products];

        if (sortBy === "price-asc") {
            data.sort((a, b) => a.today - b.today);
        } else if (sortBy === "price-desc") {
            data.sort((a, b) => b.today - a.today);
        }

        return data;
    }, [products, sortBy]);

    return (
        <div className="space-y-2">

            {/* Sorting Bar */}
            <div className="bg-white border border-[#e5ebe5] rounded-xl px-4 py-2 flex items-center justify-between">

                <p className="text-[10px] text-gray-500">
                    সাজান
                </p>

                <div className="flex items-center gap-2">

                    <ArrowUpDown size={16} className="text-gray-500" />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xl bg-[#f8faf8] border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 outline-none cursor-pointer"
                    >
                        <option value="default">ডিফল্ট</option>

                        <option value="price-asc">
                            দাম: কম থেকে বেশি
                        </option>

                        <option value="price-desc">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>

                </div>
            </div>

            {/* Product List Heading */}
            <p className="text-2xl text-gray-500 pt-1">
                {products.length.toLocaleString("bn-BD")} টি পণ্যের বাজার দর
            </p>

            {/* Empty State */}
            {sortedProducts.length === 0 ? (

                <div className="bg-white border border-[#e5ebe5] rounded-xl p-10 text-center">

                    <div className="text-4xl mb-3">
                        🛒
                    </div>

                    <h2 className="text-base font-bold text-gray-800">
                        কোনো পণ্য পাওয়া যায়নি!
                    </h2>

                    <p className="text-xs text-gray-500 mt-2 mb-5">
                        এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg bg-[#315c3c] text-white px-5 py-2 text-xs font-semibold hover:bg-[#264b30] transition"
                    >
                        হোম পেজে ফিরে যান
                    </Link>

                </div>

            ) : (

                /* Product Cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">

                    {sortedProducts.map((product) => (
                        <ProductsCard
                            key={product.id}
                            product={{ ...product, change: product.change.pct }}
                        />
                    ))}

                </div>
            )}

        </div>
    );
};

export default CategoryProducts;