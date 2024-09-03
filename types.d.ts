export type MediaType = "movie" | "tv" | "person";

export interface Result {
  adult: boolean;
  first_air_date?: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  name?: string;
  title?: string;
  origin_country: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  backdrop_path?: string;
  poster_path?: string;
  profile_path?: string;
  vote_average: number;
  vote_count: number;
  known_for_department?: string;
  known_for: Overview[];
}

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  external_ids: ExternalLinks;
  combined_credits: {
    cast: PersonCast[];
    crew: PersonCrew[];
  };
}

export interface ResultObject {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface MediaCounts {
  movies: number;
  tvShows: number;
  people: number;
}

export interface Overview {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MediaInterface {
  backdrop_path: string;
  credits: {
    cast: MediaCast[];
    crew: MediaCrew[];
  };
  external_ids: ExternalLinks;
  genres: Genre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  status: string;
  similar: Similar[];
  tagline: string;
  vote_average: number;
  vote_count: number;
  reviews: ReviewObject;
}

export interface TvShow extends MediaInterface {
  created_by: Crew[];
  first_air_date: string;
  in_production: boolean;
  keywords: {
    results: Keyword[];
  };
  last_air_date: string;
  name: string;
  networks: Network[];
}

export interface Movie extends MediaInterface {
  budget: number;
  release_date: string;
  revenue: number;
  runtime: number;
  keywords: {
    keywords: Keyword[];
  };
  title: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Similar {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ReviewObject {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: null | number;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ExternalLinks {
  facebook_id: string | null;
  imdb_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
  homepage: string | null;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface PersonTeamInterface {
  adult: boolean;
  backdrop_path: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title: string;
  origin_country: string[];
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  episode_count: number;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PersonCast extends PersonTeamInterface {
  character: string;
  order: number;
  vote_average: number;
  vote_count: number;
}

export interface PersonCrew extends PersonTeamInterface {
  department: string;
  job: string;
}

export interface MediaTeamInterface {
  adult: boolean;
  credit_id: string;
  id: number;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface MediaCast extends MediaTeamInterface {
  cast_id: number;
  character: string;
  order: number;
}

export interface MediaCrew extends MediaTeamInterface {
  department: string;
  job: string;
}

export interface Trailer {
  id: string;
  key: string;
  name: string;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}
