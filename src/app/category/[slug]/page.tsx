import CategoryProducts from "@/component/CategoryProducts";
import { ICategory, IProduct } from "@/typs";
import { notFound } from "next/navigation";

const CategoryDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const [productRes, categoryRes] = await Promise.all([
        fetch(`${process.env.API_URL}/products?category=${(slug)}`, {
            next: { revalidate: 300 },
        }),

        fetch(`${process.env.API_URL}/categories/${(slug)}`, {
            next: { revalidate: 300 },
        }),
    ]);


    if (!categoryRes.ok || !productRes.ok) {
        notFound();
    }

    const category: ICategory = await categoryRes.json();
    const products: IProduct[] = await productRes.json();


    if (
        !category?.id ||
        !category?.nameBn ||
        !Array.isArray(products)
    ) {
        notFound();
    }

    return (

        <main className="min-h-screen bg-[#f0f5f0] flex flex-col">

            <section className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10">

                <div className="space-y-5">

                    {/* Category Header */}
                    <div className="bg-white border border-[#e5ebe5] rounded-2xl px-6 py-6 sm:px-8 sm:py-7 flex items-center gap-5 sm:gap-6 shadow-sm">

                        {/* Category Icon */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f4f1] border border-[#e5ebe5] flex items-center justify-center text-4xl sm:text-5xl shrink-0">
                            {category.icon}
                        </div>

                        {/* Category Information */}
                        <div className="flex flex-col gap-2">

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#26352b]">
                                {category.nameBn}
                            </h1>

                            <p className="text-sm sm:text-base text-gray-500">
                                {category.nameBn} এর আজকের বাজার দর ও মূল্যতালিকা
                            </p>

                        </div>

                    </div>

                    {/* Products and Sorting */}
                    <div className="pt-1">
                        <CategoryProducts products={products} />
                    </div>

                </div>

            </section>



        </main>

    );
};

export default CategoryDetailsPage;