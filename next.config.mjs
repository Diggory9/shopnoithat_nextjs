/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
      },
    env:{
      API_URL:process.env.NEXT_PUBLIC_API,
    }
};

export default nextConfig;
