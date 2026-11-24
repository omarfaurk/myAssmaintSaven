import { ProductGridSkeleton } from "@/component/Skeletons";

export default function Loading() {
    return (
        <>
            <div className="container mx-auto px-4 mt-8">
                <div className="skeleton h-9 w-56" />
                <div className="mt-4 flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="skeleton h-8 w-28 rounded-full" />
                    ))}
                </div>
            </div>
            <ProductGridSkeleton count={6} />
        </>
    );
}