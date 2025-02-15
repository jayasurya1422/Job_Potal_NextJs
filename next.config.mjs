/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'vr8kdfz4px7gsrwe.public.blob.vercel-storage.com',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
        ],
      },
};

export default nextConfig;
