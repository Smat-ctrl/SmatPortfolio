import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["motion", "pdfjs-dist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
