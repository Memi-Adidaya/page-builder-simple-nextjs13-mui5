/** @type {import('next').NextConfig} */


module.exports = {
  trailingSlash: false,
  reactStrictMode: false,
  images: {
    domains: ['picsum.photos', 'placehold', 'youtube', 'images.pexels', 'images.pexels.com','fonts.googleapis.com']
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,

    }

    return config
  }
}
