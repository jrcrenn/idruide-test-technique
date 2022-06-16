/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig;
module.exports = {
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    TMDB_API_KEY: 'ffc922e2714e6b51e8f4b18511cb50b2',
    search: "https://api.themoviedb.org/3/search/",
    movie: "https://api.themoviedb.org/3/movie/",
    trend: "https://api.themoviedb.org/3/trending/",
    image: "https://image.tmdb.org/t/p/",
  }
}
  
