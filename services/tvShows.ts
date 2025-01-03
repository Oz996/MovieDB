import { Genre, Image, Media, Similar, TvShow } from "@/types";
import options, { tmdbURL } from "./options";

export const getTvShows = async (query: string): Promise<TvShow[]> => {
  try {
    const res = await fetch(
      tmdbURL + `discover/tv?include_adult=false&region=US&${query}`,
      options
    );
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getTvShowGenres = async (): Promise<Genre[]> => {
  try {
    const res = await fetch(tmdbURL + `genre/tv/list`, options);
    const data = await res.json();
    const results = data.genres;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getTvShowTrending = async (
  time: string = "week"
): Promise<Media[]> => {
  try {
    const res = await fetch(tmdbURL + `trending/tv/${time}`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getTvShowsDiscover = async (
  type: string = "free"
): Promise<TvShow[]> => {
  try {
    const res = await fetch(
      tmdbURL +
        `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=DK&with_watch_monetization_types=${type}`,
      options
    );
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getTvShowDetails = async (
  id: string | number
): Promise<TvShow> => {
  try {
    const res = await fetch(
      tmdbURL +
        `tv/${id}?append_to_response=credits,keywords,external_ids,reviews,videos`,
      options
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getTvShowImages = async (
  id: string | number
): Promise<Image[]> => {
  try {
    const res = await fetch(tmdbURL + `tv/${id}/images`, options);
    const data = await res.json();
    const results = data.posters;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getTvShowSimilar = async (
  id: string | number
): Promise<Similar[]> => {
  try {
    const res = await fetch(tmdbURL + `tv/${id}/similar`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};
