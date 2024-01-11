/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@ant-design/pro-editor',
    '@ant-design/pro-chat',
    'zustand',
    'react-intersection-observer',
    'leva',
  ],
};

module.exports = nextConfig;
