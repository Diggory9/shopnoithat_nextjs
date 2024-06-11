"use client";
import { useEffect, useState } from "react";
import Category from "../page";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
interface Category {
    id: string;
    name: string;
    categoryParent: string;
    description: string;
}

export default function addCategory() {
    const router = useRouter();
    const [dataCate, setDataCate] = useState<Category[]>([]);
    const [name, setNameCate] = useState("");
    const [categoryParent, setCateParent] = useState("");
    const [description, setDesCate] = useState("");
    const [errorName, setErrorName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    "https://localhost:44372/api/Category/list",
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
        fetchData();
    }, []);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setErrorName(name.length < 1 ? "Tên danh mục không được để trống" : "");
        try {
            const respone = await fetch(
                "https://localhost:44372/api/Category/insert",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        categoryParent,
                        description,
                    }),
                }
            ); // Thay thế bằng URL API thực tế

            const data = await respone.json();

            if (respone.ok) {
                //Thêm thành công
                console.log("Success");
                console.log(data.data);
                toast.success("Thêm danh mục thành công");
                router.push("/admin/category");
            } else {
                //Thêm thất bại
                console.log("Fail !!!");
                toast.error("Thêm danh mục thất bại");

                setErrorName("Tên danh mục đã tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm danh mục mới</h1>
            <Toaster position="top-right" richColors />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Tên danh mục
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setNameCate(e.target.value)}
                        className="w-3/5 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-red-500">{errorName}</p>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Danh mục cha
                    </label>
                    <select
                        name="cars"
                        id="cars"
                        className="w-3/5 p-2"
                        onChange={(e) => setCateParent(e.target.value)}
                    >
                        {dataCate.map((item, index) => (
                            <>
                                <option value={item.id}>{item.name}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium mb-1"
                    >
                        Mô tả danh mục
                    </label>
                    <textarea
                        onChange={(e) => setDesCate(e.target.value)}
                        id="description"
                        className="w-3/5 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Thêm danh mục
                </button>
            </form>
        </div>
    );
}
