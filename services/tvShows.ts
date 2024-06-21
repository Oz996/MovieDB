import { Result } from "@/types";
import { options } from "./all";

export const getTvShowTrending = async (time: string = "week") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/${time}`,
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

export const getTvShows = async (type: string = "free") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=DK&with_watch_monetization_types=${type}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};
