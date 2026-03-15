import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/institute',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/student-work',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
