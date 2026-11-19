
import Link from 'next/link';

interface CategoriesTypeScript {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    const data: CategoriesTypeScript[] = await response.json();

    return (
        <>
            {data.map((category) => (
                <li key={category.id}>
                    <Link
                        href={`/category/${category.slug}`}
                        className="flex items-start gap-2 text-gray-700 hover:text-green-600"
                    >
                        <span className="text-xl">
                            {category.icon}
                        </span>

                        <span className="text-sm font-medium">
                            {category.nameBn}
                        </span>
                    </Link>
                </li>
            ))}
        </>
    );
};

export default NavLinks;
