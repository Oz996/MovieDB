import {
  Genre,
  Image,
  QueryData,
  Result,
  Similar,
  Trailer,
  TvShow,
} from "@/types";
import { options } from "./all";

export const getTvShows = async (queryData: QueryData) => {
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
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&region=US"
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

export const getTvShowGenres = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list`,
      options
    );
    const data = await res.json();
    const results = data.genres as Genre[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

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

export const getTvShowsDiscover = async (type: string = "free") => {
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

export const getTvShowDetails = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,keywords,external_ids,reviews`,
      options
    );
    const result = (await res.json()) as TvShow;
    console.log("tvdata", result);
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getTvShowVideos = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos`,
      options
    );
    const data = await res.json();
    const results = data.results as Trailer[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getTvShowImages = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/images`,
      options
    );
    const data = await res.json();
    const results = data.posters as Image[];
    console.log("res res res", data);
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getTvShowSimilar = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar`,
      options
    );
    const data = await res.json();
    const results = data.results as Similar[];
    return results;
  } catch (error: any) {
    console.error(error.message);
  }
};
