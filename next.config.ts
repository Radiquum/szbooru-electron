import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // This line
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'no-referrer'
  //         }
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
