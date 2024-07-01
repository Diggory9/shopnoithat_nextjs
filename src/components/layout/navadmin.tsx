"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavAdmin() {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex flex-col col-span-1">
            <div className="">
                <aside className="w-64 bg-gray-100/40 text-black ">
                    <nav>
                        <ul>
                            <li className="my-2 px-2 py-1 text-black ">
                                <Link
                                    href={"/admin/category"}
                                    className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-gray-200 hover:text-black ${
                                        pathname == "/admin/category"
                                            ? "bg-gray-200 hover:text-black"
                                            : ""
                                    }`}
                                >
                                    Category
                                </Link>
                            </li>
                            <li className="my-2 px-2 py-2 text-black">
                                <Link
                                    href={"/admin/product"}
                                    className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-gray-200 hover:text-black ${
                                        pathname == "/admin/product"
                                            ? "bg-gray-200 hover:text-black"
                                            : ""
                                    }`}
                                >
                                    Product
                                </Link>
                            </li>
                            <li className="my-2 px-2 py-2 text-black">
                                <Link
                                    href={"/admin/supplier"}
                                    className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-gray-200 hover:text-black ${
                                        pathname == "/admin/supplier"
                                            ? "bg-gray-200 hover:text-black"
                                            : ""
                                    }`}
                                >
                                    Supplier
                                </Link>
                            </li>
                            <li className="my-2 px-2 py-2 text-black">
                                <Link
                                    href={"/admin/role"}
                                    className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-gray-200 hover:text-black ${
                                        pathname == "/admin/role"
                                            ? "bg-gray-200 hover:text-black"
                                            : ""
                                    }`}
                                >
                                    Role
                                </Link>
                            </li>
                            <li className="my-2 px-2 py-2 text-black">
                                <Link
                                    href={"/admin/discount"}
                                    className={`pl-1 py-4 w-full inline-flex gap-3 items-center hover:bg-gray-200 hover:text-black ${
                                        pathname == "/admin/discount"
                                            ? "bg-gray-200 hover:text-black"
                                            : ""
                                    }`}
                                >
                                    Discount
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    );
}
