/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev, webpack }) => {
    // Only modify the config in development mode
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay the rebuild after the first change
      };
    }
    
    // Return the modified config
    return config;
  },
};

export default nextConfig;
