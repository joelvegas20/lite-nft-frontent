/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // output: "standalone", // Build independiente para desplegar en entornos personalizados
  // webpack: {
  //   context: {
  //     nextRuntime: "nodejs",
  //   }
  // },
  images: {
    domains: [
      "images.gamma.io",
      "gaia.hiro.so",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

module.exports = nextConfig;