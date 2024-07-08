import NavAdmin from "../../components/layout/navadmin";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white- min-h-screen flex-col">
            <div className="flex flex-1 w-full">
                <NavAdmin></NavAdmin>
                <div className="bg-gray-50 w-full">{children}</div>
            </div>
        </div>
    );
}
