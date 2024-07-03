"use client";
import { MOrder } from "@/models/ordermodel";
import { formatDateToRender } from "@/utils/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Order() {
    const [orders, setOrders] = useState<MOrder[]>([]);
    const fetchData = async () => {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/list?pageNumber=1&pageSize=10`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setOrders(data.data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };
    const updateOrderStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`${process.env.API_URL}Order/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === id
                            ? { ...order, status: newStatus }
                            : order
                    )
                );
                toast.success("Cập nhật trạng thái thành công");
            } else {
                toast.error("Không thể cập nhật trạng thái");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    //console.log(orders);

    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 rounded-xl mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">All Order</h1>
                <Toaster position="top-right" richColors></Toaster>
                <div className="flex justify-between ">
                    <div className="p-2">
                        <form action="" method="get">
                            <input
                                className="p-2 rounded-lg border border-gray-300"
                                placeholder="Search for category"
                                type="text"
                                name=""
                                id=""
                            />
                        </form>
                    </div>
                    <div className="order-last content-center">
                        <a href="#">
                            <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex "
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Add Order
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    stt
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Người nhận
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Địa chỉ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tổng tiền
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày tạo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.recipientName}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.phone}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-amber-500 whitespace-nowrap dark:text-white">
                                        {item.address}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-amber-500 whitespace-nowrap dark:text-white">
                                        {item.total}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-red-600 whitespace-nowrap dark:text-white">
                                        {formatDateToRender(item.dateCreate)}
                                    </th>

                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <select
                                            value={item.status}
                                            onChange={(e) =>
                                                updateOrderStatus(
                                                    item?.id || "",
                                                    e.target.value
                                                )
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="NEW-ORDER">
                                                NEW-ORDER
                                            </option>
                                            <option value="PROCESSING">
                                                PROCESSING
                                            </option>
                                            <option value="COMPLETED">
                                                COMPLETED
                                            </option>
                                            <option value="CANCELLED">
                                                CANCELLED
                                            </option>
                                        </select>
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-sky-500 whitespace-nowrap dark:text-white hover:underline"
                                    >
                                        <Link href={`order/detail/${item.id}`}>
                                            Chi tiết
                                        </Link>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
