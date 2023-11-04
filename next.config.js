/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.wallpaperscraft.com",
      // cloudinary
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
