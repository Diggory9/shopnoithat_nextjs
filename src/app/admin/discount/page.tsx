"use client";
import { MDiscount } from "@/models/discount";
import { formatDateToRender, renderDiscountValue } from "@/utils/config";
import { Switch } from "antd";
import { useEffect, useState } from "react";

export default function Discount() {
    const [dataDiscount, setDataDiscount] = useState<MDiscount[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    "https://localhost:44372/api/Discount/list?pageNumber=1&pageSize=20",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataDiscount(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);

    const handleSwitchChange = async (checked: boolean, discountId: string) => {
        console.log(discountId);

        try {
            const status = checked ? "ACTIVE" : "PAUSE";
            const response = await fetch(
                `https://localhost:44372/api/Discount/${
                    checked ? "continue" : "pause"
                }`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ discountId }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update status");
            }
            const updatedDiscount = dataDiscount.map((item) =>
                item.id === discountId ? { ...item, status } : item
            );
            setDataDiscount(updatedDiscount);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 rounded-xl mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">All Discount</h1>
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
                        <a href="/admin/discount/add">
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
                                Add Discount
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
                                    Mã Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giá trị
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giá trị tối thiểu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày bắt đầu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày kết thúc
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataDiscount.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.code}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {renderDiscountValue(item)}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.condition}
                                    </th>

                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-amber-500 whitespace-nowrap dark:text-white"
                                    >
                                        {formatDateToRender(item.dateStart)}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-red-600 whitespace-nowrap dark:text-white"
                                    >
                                        {formatDateToRender(item.dateEnd)}
                                    </th>

                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <div className="pb-2">
                                            {" "}
                                            {item.status}
                                        </div>
                                        <Switch
                                            defaultChecked={
                                                item.status === "ACTIVE"
                                            }
                                            onChange={(checked) =>
                                                handleSwitchChange(
                                                    checked,
                                                    item?.id!
                                                )
                                            }
                                            disabled={
                                                item.status !== "ACTIVE" &&
                                                item.status !== "PAUSE"
                                            }
                                        ></Switch>
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    ></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
