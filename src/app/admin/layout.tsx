import NavAdmin from "../../components/layout/navadmin";
import CustomDropdown from "@/components/ui/DropDown";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white- min-h-screen flex-col">
            <div className="flex justify-between items-center p-2 border-b-2">
                <div className="text-xl">ABC</div>
                <div>
                    <CustomDropdown />
                </div>
            </div>
            <div className="flex flex-1 w-full">
                <NavAdmin></NavAdmin>
                <div className="bg-gray-50 w-full">{children}</div>
            </div>
        </div>
    );
}
