import { Movie, Result } from "@/types";
import { options } from "./all";

export const getMovieList = async (type: string = "now_playing") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    console.log(results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieTrending = async (time: string = "week") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${time}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    console.log(results);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieDetails = async (id: string) => {
  const apiKey = "be0221bc6d7421781ec7cf3a729d1e65";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
      options
    );
    const result = (await res.json()) as Movie;
    console.log("moviedata", result);
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
};
