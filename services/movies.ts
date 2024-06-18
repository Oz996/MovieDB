import { Result } from "@/types";
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
