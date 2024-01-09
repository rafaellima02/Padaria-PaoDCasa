/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
    return [
      {
        source: '/api/:path*', // Ajuste para a rota específica da sua API
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Permite solicitações de qualquer origem
          },
        ],
      },
    ];
  },}

module.exports = nextConfig
// next.config.js
