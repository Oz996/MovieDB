import { Genre, Image, Movie, Result, Similar, Trailer } from "@/types";
import { options } from "./all";
import { QueryData } from "@/app/movies/page";

export const getMovies = async (queryData: QueryData) => {
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
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&region=US"
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
    const results = data.results as Result[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getGenres = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list`,
      options
    );
    const data = await res.json();
    const results = data.genres as Genre[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieList = async (type: string = "now_playing") => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}`,
      options
    );
    const data = await res.json();
    const results = data.results as Result[];
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
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieDetails = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,keywords,external_ids,reviews`,
      options
    );
    const result = (await res.json()) as Movie;
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieVideos = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
    const data = await res.json();
    const results = data.results as Trailer[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieImages = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
    const data = await res.json();
    const results = data.posters as Image[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getMovieSimilar = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      options
    );
    const data = await res.json();
    const results = data.results as Similar[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};
