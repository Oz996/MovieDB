import {
  Genre,
  Image,
  Movie,
  QueryData,
  Result,
  Similar,
  Trailer,
} from "@/types";
import options from "./options";
import { tmdbURL } from "./options";

export const getMovies = async (
  queryData: QueryData,
  page: number = 1
): Promise<Movie[]> => {
  const {
    sort,
    fromDate,
    toDate,
    genres,
    voteAvgFrom,
    voteAvgTo,
    userVotes,
    language,
    monetizations,
  } = queryData;

  const joinedGenres = genres?.join(",");
  const joinedMonetizations = monetizations?.join("|");
  try {
    const url = new URL(
      tmdbURL + `discover/movie?include_adult=false&region=US&page=${page}`
    );
    if (sort) url.searchParams.append("sort_by", sort);
    if (fromDate) url.searchParams.append("primary_release_date.gte", fromDate);
    if (toDate) url.searchParams.append("primary_release_date.lte", toDate);
    if (joinedGenres) url.searchParams.append("with_genres", joinedGenres);
    if (voteAvgFrom)
      url.searchParams.append("vote_average.gte", voteAvgFrom.toString());
    if (voteAvgTo)
      url.searchParams.append("vote_average.lte", voteAvgTo.toString());
    if (language)
      url.searchParams.append("with_original_language", language.toString());
    if (joinedMonetizations) {
      url.searchParams.append("watch_region", "US");
      url.searchParams.append(
        "with_watch_monetization_types",
        joinedMonetizations
      );
    }
    if (userVotes)
      url.searchParams.append("vote_count.gte", userVotes.toString());

    const res = await fetch(url.toString(), options);
    const data = await res.json();
    const results = data.results;
    console.log("movvdata", data);
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieGenres = async (): Promise<Genre[]> => {
  try {
    const res = await fetch(tmdbURL + `genre/movie/list`, options);
    const data = await res.json();
    const results = data.genres;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieList = async (
  type: string = "now_playing"
): Promise<Movie[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${type}`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieTrending = async (
  time: string = "week"
): Promise<Result[]> => {
  try {
    const res = await fetch(tmdbURL + `trending/movie/${time}`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieDetails = async (id: string | number): Promise<Movie> => {
  try {
    const res = await fetch(
      tmdbURL +
        `movie/${id}?append_to_response=credits,keywords,external_ids,reviews`,
      options
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieVideos = async (
  id: string | number
): Promise<Trailer[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${id}/videos`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieImages = async (id: string | number): Promise<Image[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${id}/images`, options);
    const data = await res.json();
    const results = data.posters;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getMovieSimilar = async (
  id: string | number
): Promise<Similar[]> => {
  try {
    const res = await fetch(tmdbURL + `movie/${id}/similar`, options);
    const data = await res.json();
    const results = data.results;
    return results;
  } catch (error: any) {
    throw Error(error.message);
  }
};
