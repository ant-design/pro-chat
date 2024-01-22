/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@ant-design/pro-editor',
    '@ant-design/pro-chat',
    'react-intersection-observer',
  ],
};

module.exports = nextConfig;
