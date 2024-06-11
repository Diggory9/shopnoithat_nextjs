"use client";
import { useEffect, useState } from "react";
import Category from "../page";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
interface Supplier {
    id: string;
    contactPhone: string;
    contactPerson: string;
    supplierName: string;
    address: string;
    notes: string;
}

export default function addSupplier() {
    const router = useRouter();
    const [dataSup, setdataSup] = useState<Supplier[]>([]);
    const [contactPhone, setcontactPhone] = useState("");
    const [contactPerson, setcontactPerson] = useState("");
    const [supplierName, setsupplierName] = useState("");
    const [address, setaddress] = useState("");
    const [notes, setnotes] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    "https://localhost:44372/api/Supplier/list",
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
                setdataSup(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        //setErrorName(name.length < 1 ? "Tên danh mục không được để trống" : "");
        try {
            const respone = await fetch(
                "https://localhost:44372/api/Supplier/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contactPhone,
                        contactPerson,
                        supplierName,
                        address,
                        notes,
                    }),
                }
            );

            const data = await respone.json();

            if (respone.ok) {
                //Thêm thành công
                console.log("Success");
                console.log(data.data);
                toast.success("Thêm nhà cung cấp thành công");
                router.push("/admin/supplier");
            } else {
                //Thêm thất bại
                console.log("Fail !!!");
                toast.error("Thêm nhà cung cấp thất bại");

                // setErrorName("nhà cung cấp đã tồn tại");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm nhà cung cấp mới</h1>
            <Toaster position="top-right" richColors />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Tên nhà cung cấp
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setsupplierName(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <p className="text-sm text-red-500">{errorName}</p> */}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setcontactPhone(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <p className="text-sm text-red-500">{errorName}</p> */}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Người liên hệ
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setcontactPerson(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <p className="text-sm text-red-500">{errorName}</p> */}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Địa chỉ
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setaddress(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <p className="text-sm text-red-500">{errorName}</p> */}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                    >
                        Chú thích
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setnotes(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <p className="text-sm text-red-500">{errorName}</p> */}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                   Thêm nhà cung cấp
                </button>
            </form>
        </div>
    );
}
