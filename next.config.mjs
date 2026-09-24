/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
        '192.168.1.3',
        'unadamant-flannelly-daria.ngrok-free.dev',
    ],
    images: {
        unoptimized: true,
        domains: ['res.cloudinary.com'],
    },
}

export default nextConfig