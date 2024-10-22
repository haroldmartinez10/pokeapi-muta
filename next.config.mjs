import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**", // Permite todas las imágenes de este dominio
      },
    ],
  },
};

// Exporta la configuración combinando nextConfig con el plugin de next-intl
export default withNextIntl(nextConfig);
