
import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import Image from "next/image";

interface MarketInfo {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface ProductItem {
    id: number;
    slug: string;
    nameBn: string;
    descriptionBn?: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
    markets: MarketInfo[];
}

const API_URL =
    process.env.API_URL ||
    "https://openapi.programming-hero.com/api/bazardor";

// Bengali Number Formatter
const toBnNumber = (num: number) => {
    if (!Number.isFinite(num)) return "০";

    return num.toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
    });
};

// Unit Formatter
const getUnitLabel = (unit: string) => {
    const value = unit?.trim().toLowerCase();

    const units: Record<string, string> = {
        kg: "কেজি",
        kilogram: "কেজি",
        "কেজি": "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        l: "লিটার",
        "লিটার": "লিটার",
        dozen: "ডজন",
        "ডজন": "ডজন",
        piece: "পিস",
        pcs: "পিস",
        "পিস": "পিস",
    };

    return units[value] || unit?.replace(/^প্রতি\s*/, "") || "পিস";
};

// Get Products Array
const getProductsArray = (json: unknown): ProductItem[] => {
    if (Array.isArray(json)) return json as ProductItem[];

    if (typeof json === "object" && json !== null) {
        const response = json as { data?: unknown; products?: unknown };

        if (Array.isArray(response.data)) return response.data as ProductItem[];
        if (Array.isArray(response.products)) return response.products as ProductItem[];
    }

    return [];
};

// Find Product By Slug
async function getProductBySlug(
    slug: string
): Promise<ProductItem | null> {
    try {
        const response = await fetch(`${API_URL}/products`, {
            cache: "no-store",
        });

        if (!response.ok) return null;

        const json = await response.json();
        const products = getProductsArray(json);

        const decodedSlug = decodeURIComponent(slug).toLowerCase();

        const foundProduct = products.find(
            (item) =>
                String(item.slug).toLowerCase() === decodedSlug ||
                String(item.id) === decodedSlug
        );

        if (!foundProduct) return null;

        // Fetch Single Product Details By ID
        const detailResponse = await fetch(
            `${API_URL}/products/${foundProduct.id}`,
            { cache: "no-store" }
        );

        if (!detailResponse.ok) return foundProduct;

        const detailJson = await detailResponse.json();

        const detail =
            detailJson?.data?.product ||
            detailJson?.data ||
            detailJson?.product ||
            detailJson;

        if (
            detail &&
            typeof detail === "object" &&
            !Array.isArray(detail) &&
            detail.id
        ) {
            return {
                ...foundProduct,
                ...detail,
            };
        }

        return foundProduct;
    } catch (error) {
        console.error("Product API Error:", error);
        return null;
    }
}

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // 1. Protected Route: Check Login
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    // 2. Get Product
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // 3. Market Data
    const markets = Array.isArray(product.markets)
        ? product.markets.filter(
            (item) =>
                Number.isFinite(Number(item.min)) &&
                Number.isFinite(Number(item.max))
        )
        : [];

    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((item) => Number(item.min)))
            : product.today;

    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((item) => Number(item.max)))
            : product.today;

    const avgPrice = Number(product.today) || 0;

    // 4. Price Change
    const diffAmount = product.today - product.yesterday;

    const isUp =
        product.change?.dir === "up" ||
        (product.change?.dir !== "down" && diffAmount > 0);

    const isDown =
        product.change?.dir === "down" ||
        (product.change?.dir !== "up" && diffAmount < 0);

    const unit = getUnitLabel(product.unit);
    const changePercent = Number(product.change?.pct) || 0;

    const imageIsUrl =
        product.image?.startsWith("http://") ||
        product.image?.startsWith("https://") ||
        product.image?.startsWith("/");

    return (
        <main className="min-h-screen bg-[#f0f5f0] py-6 sm:py-8">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">

                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>

                    <span>›</span>

                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-green-700"
                    >
                        {product.categoryNameBn}
                    </Link>

                    <span>›</span>

                    <span className="text-gray-800 font-semibold">
                        {product.nameBn}
                    </span>

                </nav>

                {/* =========================
            PRODUCT HEADER
        ========================= */}

                <section className="bg-white border border-[#e5ebe5] rounded-2xl p-5 sm:p-7 shadow-sm">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        {/* Product Information */}
                        <div className="flex items-center gap-4 sm:gap-5">

                            {/* Product Image / Emoji */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f1] flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">

                                {imageIsUrl ? (
                                    <Image
                                        src={product.image}
                                        alt={product.nameBn}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl sm:text-5xl">
                                        {product.image || product.categoryIcon || "🛒"}
                                    </span>
                                )}

                            </div>

                            <div className="space-y-2">

                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#26352b]">
                                    {product.nameBn}
                                </h1>

                                <p className="text-xs sm:text-sm text-gray-500">
                                    {product.descriptionBn ||
                                        `${product.categoryNameBn} এর আজকের বাজারদর`}
                                </p>

                                {/* Category Tags */}
                                <div className="flex items-center flex-wrap gap-2 pt-1">

                                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {product.categoryIcon} {product.categoryNameBn}
                                    </span>

                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                        প্রতি {unit}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Today's Average Price */}
                        <div className="bg-[#f3f7f2] border border-[#e5ebe5] rounded-xl px-6 py-4 text-center min-w-[150px]">

                            <p className="text-xs text-gray-500">
                                আজকের গড় দাম
                            </p>

                            <h2 className="text-3xl font-extrabold text-[#26352b] my-1">
                                {toBnNumber(avgPrice)}
                            </h2>

                            <p className="text-xs text-gray-500">
                                টাকা / {unit}
                            </p>

                            <span
                                className={`inline-block mt-2 text-xs font-bold ${isUp
                                    ? "text-red-600"
                                    : isDown
                                        ? "text-green-600"
                                        : "text-gray-500"
                                    }`}
                            >
                                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                {toBnNumber(Math.abs(changePercent))}%
                            </span>

                        </div>

                    </div>

                    {/* Market Summary Description */}
                    <div className="border-t border-gray-100 mt-5 pt-4">

                        <p className="text-xs sm:text-sm text-gray-500">

                            {isUp
                                ? "গতকালের তুলনায় আজকের দাম বেড়েছে।"
                                : isDown
                                    ? "গতকালের তুলনায় আজকের দাম কমেছে।"
                                    : "গতকালের তুলনায় আজকের দাম অপরিবর্তিত রয়েছে।"}

                            {" "}আজকের বাজারে {markets.length.toLocaleString("bn-BD")}টি বাজারের তথ্য পাওয়া গেছে।

                        </p>

                    </div>

                </section>

                {/* =========================
            PRICE SUMMARY
        ========================= */}

                <section className="bg-white border border-[#e5ebe5] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">

                    <h2 className="text-base sm:text-lg font-bold text-[#26352b]">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

                        {/* Minimum Price */}
                        <div className="border border-[#e5ebe5] bg-[#fbfdfb] rounded-xl p-4 space-y-2">

                            <p className="text-xs text-gray-500">
                                সর্বনিম্ন দাম
                            </p>

                            <h3 className="text-2xl font-extrabold text-green-600">
                                {toBnNumber(minPrice)}{" "}
                                <span className="text-sm">টাকা</span>
                            </h3>

                            <p className="text-[10px] text-gray-500">
                                বাজারে সবচেয়ে কম দাম
                            </p>

                        </div>

                        {/* Maximum Price */}
                        <div className="border border-[#e5ebe5] bg-[#fbfdfb] rounded-xl p-4 space-y-2">

                            <p className="text-xs text-gray-500">
                                সর্বোচ্চ দাম
                            </p>

                            <h3 className="text-2xl font-extrabold text-red-600">
                                {toBnNumber(maxPrice)}{" "}
                                <span className="text-sm">টাকা</span>
                            </h3>

                            <p className="text-[10px] text-gray-500">
                                বাজারে সবচেয়ে বেশি দাম
                            </p>

                        </div>

                        {/* Average Price */}
                        <div className="border border-[#e5ebe5] bg-[#fbfdfb] rounded-xl p-4 space-y-2">

                            <p className="text-xs text-gray-500">
                                গড় দাম
                            </p>

                            <h3 className="text-2xl font-extrabold text-emerald-700">
                                {toBnNumber(avgPrice)}{" "}
                                <span className="text-sm">টাকা</span>
                            </h3>

                            <p className="text-[10px] text-gray-500">
                                প্রতি {unit} এর হিসাব
                            </p>

                        </div>

                    </div>

                </section>

                {/* =========================
            MARKET PRICE TABLE
        ========================= */}

                <section className="bg-white border border-[#e5ebe5] rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-[#26352b]">
                                বাজারভিত্তিক আজকের দাম
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                বিভিন্ন বাজারের {product.nameBn} এর মূল্য তালিকা
                            </p>
                        </div>

                        <span className="text-xs bg-green-50 text-green-700 rounded-full px-3 py-1.5 font-semibold w-fit">
                            মোট {markets.length.toLocaleString("bn-BD")} টি বাজার
                        </span>

                    </div>

                    {markets.length === 0 ? (

                        <div className="text-center py-10 bg-[#f8faf8] rounded-xl">

                            <span className="text-4xl">🏪</span>

                            <p className="text-sm text-gray-500 mt-3">
                                বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি।
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto rounded-xl border border-[#e5ebe5]">

                            <table className="w-full min-w-[650px] border-collapse text-left">

                                <thead>
                                    <tr className="bg-[#f3f7f2] text-xs text-gray-600 border-b border-[#e5ebe5]">

                                        <th className="px-4 py-4 font-semibold">
                                            বাজার
                                        </th>

                                        <th className="px-4 py-4 font-semibold">
                                            বিভাগ
                                        </th>

                                        <th className="px-4 py-4 text-right font-semibold">
                                            সর্বনিম্ন দাম
                                        </th>

                                        <th className="px-4 py-4 text-right font-semibold">
                                            সর্বোচ্চ দাম
                                        </th>

                                        <th className="px-4 py-4 text-right font-semibold">
                                            গড় দাম
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#e5ebe5]">

                                    {markets.map((market, index) => {

                                        const rowAverage =
                                            (Number(market.min) + Number(market.max)) / 2;

                                        return (
                                            <tr
                                                key={`${market.market}-${index}`}
                                                className="text-xs sm:text-sm hover:bg-[#f5f9f4] transition-colors"
                                            >

                                                <td className="px-4 py-3.5 font-semibold text-gray-800">
                                                    {market.market}
                                                </td>

                                                <td className="px-4 py-3.5 text-gray-600">
                                                    {market.division}
                                                </td>

                                                <td className="px-4 py-3.5 text-right text-green-700 font-medium">
                                                    {toBnNumber(market.min)} টাকা
                                                </td>

                                                <td className="px-4 py-3.5 text-right text-red-600 font-medium">
                                                    {toBnNumber(market.max)} টাকা
                                                </td>

                                                <td className="px-4 py-3.5 text-right font-bold text-[#26352b]">
                                                    {toBnNumber(rowAverage)} টাকা
                                                </td>

                                            </tr>
                                        );
                                    })}

                                </tbody>

                            </table>

                        </div>
                    )}

                    <p className="text-[10px] text-gray-400">
                        * বাজারভেদে দাম পরিবর্তিত হতে পারে। টেবিলের গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবর্তী হিসাব।
                    </p>

                </section>

            </div>

        </main>
    );
}
