/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "image.tmdb.org" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "media.themoviedb.org" },
      { hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
