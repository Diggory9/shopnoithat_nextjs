"use client";
import { useEffect, useState } from "react";

export default function admin() {
    const [dataCate, setDataCate] = useState([]);
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const respone = await fetch(
    //                 "https://localhost:44372/api/Category/list"
    //             ); // Thay thế bằng URL API thực tế
    //             if (!respone.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const result = await respone.json();
    //             setDataCate(result.data);
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);
    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex flex-col">
    //             <header className="bg-gray-200 text-white p-4 flex flex-row">
    //                 <h1 className="text-xl text-black">My Dashboard</h1>
    //                 <button className="flex text-white">Login</button>
    //             </header>
    //             <div className="flex flex-1 justify-center items-center">
    //                 <p>Loading...</p>
    //             </div>
    //         </div>
    //     );
    // }
    return (
        // <div className="min-h-screen flex flex-col">
        //     <header className="bg-gray-200 text-white p-4 flex flex-row">
        //         <h1 className="text-xl text-black">My Dashboard</h1>
        //         <button className="flex text-whit">Login</button>
        //     </header>
        //     <div className="flex flex-1">
        //         <aside className="w-64 bg-gray-100/40 text-black p-4">
        //             <nav>
        //                 <ul>
        //                     <li className="my-2 px-2 py-2 text-black border">
        //                         <a href="#">Category</a>
        //                     </li>
        //                     <li className="my-2 px-2 py-2 text-black">
        //                         <a href="#">User</a>
        //                     </li>
        //                     <li className="my-2 px-2 py-2 text-black">
        //                         <a href="#">Product</a>
        //                     </li>
        //                 </ul>
        //             </nav>
        //         </aside>
        //         <main className="flex-1 bg-gray-100 p-4 ">
        //             <div className="justify-items-end">
        //                 <button className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        //                     New Category
        //                 </button>
        //             </div>
        //             <div className="">
        //                 {dataCate.map((item) => (
        //                     <div
        //                         key={item.id}
        //                         className="bg-white p-6 rounded-lg shadow-md mt-4"
        //                     >
        //                         <h3 className="text-xl font-semibold mb-2">
        //                             {item.name}
        //                         </h3>
        //                         <p className="">{item.description}</p>
        //                         <button></button>
        //                     </div>
        //                 ))}
        //             </div>
        //         </main>
        //     </div>
        // </div>
        <div></div>
    );
}
