import NavAdmin from "../components/navadmin";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-gray-50 min-h-screen flex-col">
            <header className=" text-white p-4 flex flex-row">
                <h1 className="text-xl text-black font-bold uppercase">
                    My Dashboard
                </h1>
              
            </header>
            <div className="flex flex-1">
                <NavAdmin />
                {children}
            </div>
        </div>
    );
}
