"use client";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MSupplier } from "@/models/suppliermodel";

export default function updateSupplier({ params }: { params: { id: string } }) {
    const [dataSup, setDataSup] = useState<MSupplier[]>([]);
    const router = useRouter();
    const [contactPhone, setcontactPhone] = useState("");
    const [contactPerson, setcontactPerson] = useState("");
    const [supplierName, setsupplierName] = useState("");
    const [address, setaddress] = useState("");
    const [notes, setnotes] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
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
                setDataSup(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await fetch(
                    `https://localhost:44372/api/Supplier/${params.id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setcontactPhone(result.data.contactPhone);
                setcontactPerson(result.data.contactPerson);
                setsupplierName(result.data.supplierName);
                setaddress(result.data.address);
                setnotes(result.data.notes);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchSupplier();
    }, [params.id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://localhost:44372/api/Supplier/update/${params.id}`,
                {
                    method: "PUT",
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
            if (response.ok) {
                toast.success("Cập nhật nhà cung cấp thành công");
                router.push("/admin/supplier");
            } else {
                toast.error("Cập nhật nhà cung cấp thất bại");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">Update Supplier</h1>
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
                            name="supplierName"
                            id="supplierName"
                            value={supplierName}
                            onChange={(e) => setsupplierName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            ContactPhone
                        </label>
                        <input
                            type="text"
                            name="contactPhone"
                            id="contactPhone"
                            value={contactPhone}
                            onChange={(e) => setcontactPhone(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            ContactPerson
                        </label>
                        <input
                            type="text"
                            name="contactPerson"
                            id="contactPerson"
                            value={contactPerson}
                            onChange={(e) => setcontactPerson(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Notes
                        </label>
                        <input
                            type="text"
                            name="notes"
                            id="notes"
                            value={notes}
                            onChange={(e) => setnotes(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-50"
                        >
                            Update Supplier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
