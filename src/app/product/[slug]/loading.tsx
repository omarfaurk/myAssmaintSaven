const ProductLoading = () => {
    return (
        <main className="min-h-screen bg-[#f0f5f0] py-8 px-4">

            <div className="max-w-6xl mx-auto space-y-5 animate-pulse">

                {/* Header Skeleton */}
                <div className="bg-white rounded-2xl p-7 flex items-center gap-5">
                    <div className="w-20 h-20 bg-gray-200 rounded-2xl" />

                    <div className="space-y-3 flex-1">
                        <div className="h-6 w-48 bg-gray-200 rounded" />
                        <div className="h-3 w-64 bg-gray-100 rounded" />
                        <div className="h-5 w-32 bg-gray-100 rounded-full" />
                    </div>
                </div>

                {/* Summary Skeleton */}
                <div className="bg-white rounded-2xl p-7 space-y-5">
                    <div className="h-5 w-40 bg-gray-200 rounded" />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-28 bg-gray-100 rounded-xl"
                            />
                        ))}
                    </div>
                </div>

                {/* Table Skeleton */}
                <div className="bg-white rounded-2xl p-7 space-y-4">
                    <div className="h-5 w-52 bg-gray-200 rounded" />

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="h-10 bg-gray-100 rounded-lg"
                        />
                    ))}
                </div>

            </div>
        </main>
    );
};

export default ProductLoading;