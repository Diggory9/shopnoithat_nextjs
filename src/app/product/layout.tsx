import NavHome from "../components/navhome";

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavHome/>
                <main>{children}</main>
            </body>
        </html>
    );
}
