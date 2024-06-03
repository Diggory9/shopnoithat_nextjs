export default function Footer() {
    return (
        <footer className="bg-white text-black py-8">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">My E-commerce Site</h2>
                </div>
                <div className="mb-4">
                    <p>
                        &copy; {new Date().getFullYear()} My E-commerce Site.
                        All rights reserved.
                    </p>
                </div>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:text-gray-400">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
}
