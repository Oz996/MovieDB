const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  },
};

export default options;

export const tmdbURL = `https://api.themoviedb.org/3/`;
