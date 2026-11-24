
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoriesTypeScript {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

interface NavLinksProps {
    categories: CategoriesTypeScript[];
}

const NavLinks = ({ categories = [] }: NavLinksProps) => {
    const pathname = usePathname();
    return (
        <>
            {categories.map((category) => {
                // Route path
                const href = `/category/${category.slug}`;

                // Active category check
                const isActive = pathname === href;

                return (
                    <li key={category.id}>
                        <Link
                            href={href}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${isActive
                                ? "bg-[#05893E] text-white font-bold border-b-2 border-[#05893E]"
                                : " hover:bg-[#05893E] text-black hover:text-white "
                                }`}
                        >
                            <span className="text-xl">
                                {category.icon}
                            </span>

                            <span className="text-sm font-medium">
                                {category.nameBn}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </>
    );
};

export default NavLinks;
