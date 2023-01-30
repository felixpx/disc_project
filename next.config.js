/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.moralis.io", "ipfs.nftstorage.link"],
  },
  env: {
    MORALIS_APPLICATION_ID: process.env.MORALIS_APPLICATION_ID,
    MORALIS_SERVER_ID: process.env.MORALIS_SERVER_ID,
  },
};
