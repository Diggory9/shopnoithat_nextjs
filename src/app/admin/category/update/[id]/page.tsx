"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { MCategory } from "@/models/categorymodel";

export default function UpdateCategory({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [category, setCategory] = useState<MCategory | null>(null);
    const [dataCate, setDataCate] = useState<MCategory[]>([]);
    const [name, setNameCate] = useState("");
    const [categoryParent, setCateParent] = useState("");
    const [description, setDesCate] = useState("");
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(
                    `${process.env.API_URL}Category/${params.id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ); // Thay thế bằng URL API thực tế
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setCategory(result.data);
                setNameCate(result.data.name);
                setDesCate(result.data.description);
                setCateParent(result.data.categoryParent);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchCategory();
    }, [params.id]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const respone = await fetch(
                    `${process.env.API_URL}Category/list`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ); // Thay thế bằng URL API thực tế
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataCate(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchCategories();
    }, []);
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${process.env.API_URL}Category/update/${params.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        categoryParent,
                        description,
                    }),
                }
            );
            if (response.ok) {
                toast.success("Cập nhật danh mục thành công");
                router.push("/admin/category");
            } else {
                toast.error("Cập nhật danh mục thất bại");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">Update Category</h1>
                <Toaster position="top-right" richColors />
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setNameCate(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDesCate(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="categoryParent"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Parent Category
                        </label>

                        <select
                            key={1}
                            name="cars"
                            id="cars"
                            className="w-full p-2"
                            onChange={(e) => setCateParent(e.target.value)}
                        >
                            {dataCate.map((item) => (
                                <>
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                </>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-50"
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
