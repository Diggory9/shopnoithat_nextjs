export default function NavAdmin() {
    return (
        <div className="min-h-screen flex flex-col col-span-1">
            <div className="">
                <aside className="w-64 bg-gray-100/40 text-black p-4">
                    <nav>
                        <ul>
                            <li className="my-2 px-2 py-2 text-black ">
                                <a href="/admin/category">Category</a>
                            </li>
                            
                            <li className="my-2 px-2 py-2 text-black">
                                <a href="/admin/product">Product</a>
                            </li>
                            <li className="my-2 px-2 py-2 text-black">
                                <a href="/admin/supplier">Supplier</a>
                            </li>
                        </ul>
                    </nav>
                </aside>
               
            </div>
        </div>
    );
}
