import Link from "next/link";
import type { Products } from "./Totalproducts";

const toBengaliNumber = (num: number | string): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
        .toLocaleString("en-IN")
        .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

const ProductsCard = ({ product }: { product: Products }) => {
    const diffPercent =
        typeof product.change === "number"
            ? product.change
            : product.yesterday > 0
                ? Number(
                    (((product.today - product.yesterday) / product.yesterday) * 100).toFixed(1)
                )
                : 0;

    return (
        <Link
            href={`/product/${product.id}`}
            className="block rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-neutral-300 hover:shadow-sm transition"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-2xl">
                    {product.categoryIcon ?? "🛒"}
                </div>

                <div>
                    <h2 className="font-bold text-base text-neutral-900 leading-snug">
                        {product.nameBn}
                    </h2>
                    <p className="text-sm text-neutral-500">{product.unit}</p>
                </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-2">
                <div>
                    <span className="text-xs text-neutral-500 block mb-0.5">
                        আজকের দাম
                    </span>
                    <span className="text-lg font-extrabold text-neutral-900">
                        {toBengaliNumber(product.today)} টাকা
                    </span>
                </div>

                {diffPercent > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                        ▲ {toBengaliNumber(diffPercent)}%
                    </span>
                ) : diffPercent < 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        ▼ {toBengaliNumber(Math.abs(diffPercent))}%
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500">
                        — {toBengaliNumber("0.0")}%
                    </span>
                )}
            </div>
        </Link>
    );
};

export default ProductsCard;