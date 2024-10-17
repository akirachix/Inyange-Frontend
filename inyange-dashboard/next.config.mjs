import withPWA from 'next-pwa';


/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,  
    },
  };

  const withPWAConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  });
  
  
export default withPWAConfig(nextConfig);






  