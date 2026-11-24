export function ProductCardSkeleton() {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center gap-3">
                <div className="skeleton h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-2/3" />
                    <div className="skeleton h-3 w-1/3" />
                </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
                <div className="space-y-2">
                    <div className="skeleton h-3 w-16" />
                    <div className="skeleton h-5 w-24" />
                </div>
                <div className="skeleton h-6 w-16 rounded-full" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <section className="my-8 px-4 container mx-auto" aria-busy="true">
            <div className="skeleton h-7 w-40 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}