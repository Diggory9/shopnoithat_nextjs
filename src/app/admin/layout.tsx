import NavAdmin from "../components/navadmin";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       
            <div className="min-h-screen flex-col">
                <header className="bg-gray-50 text-white p-4 flex flex-row">
                    <h1 className="text-xl text-black">My Dashboard</h1>
                    {/* <button className="flex text-whit">Login</button> */}
                </header>   
                <div className="flex flex-1">
                    <NavAdmin />
                    {children}
                </div>
            </div>

    );
}
