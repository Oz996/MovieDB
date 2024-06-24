export interface Result {
  adult: boolean;
  first_air_date?: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
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
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  name: ?string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsTo;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface BelongsTo {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}
