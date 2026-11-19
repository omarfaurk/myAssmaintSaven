
import MarqueeText from "react-marquee-text";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    image: string;
    today: number;
    unit: string;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const Marquee = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const products: Product[] = await response.json();
    const marqueeItems = [...products, ...products];

    const formatNumber = (value: number) =>
        new Intl.NumberFormat("bn-BD", {
            maximumFractionDigits: 1,
        }).format(value);

    return (
        <div className="container mx-auto">
            <MarqueeText direction="right">
                <div className="w-full overflow-hidden bg-base-100 border-y border-base-300 py-2 container mx-auto ">
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                        {marqueeItems.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex items-center gap-2 px-5 whitespace-nowrap border-r border-base-300"
                            >
                                {/* Product Icon */}
                                <span>{item.image || item.categoryIcon}</span>
                                {/* Product Name */}
                                <span className="text-sm font-medium">
                                    {item.nameBn}
                                </span>
                                {/* Today's Price */}
                                <span className="text-sm font-semibold">
                                    {formatNumber(item.today)} টাকা/
                                    {item.unit === "kg" ? "কেজি" : item.unit}
                                </span>
                                {/* Price Change */}
                                <span
                                    className={`text-sm font-bold ${item.change.dir === "up"
                                        ? "text-red-500"
                                        : "text-green-600"
                                        }`}
                                >
                                    {item.change.dir === "up" ? "▲" : "▼"}
                                    {" "}
                                    {formatNumber(item.change.pct)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;
