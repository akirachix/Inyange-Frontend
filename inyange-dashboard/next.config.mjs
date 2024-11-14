import withPWA from 'next-pwa';


/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.BASE_URL,  
    },
    images: {
    domains: ['buildmart-42eabdb55b17.herokuapp.com'], 
  },
  };

  const withPWAConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  });
  
  
export default withPWAConfig(nextConfig);





  