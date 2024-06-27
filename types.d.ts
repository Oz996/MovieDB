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
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
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
  keywords: {
    keywords: Keyword[];
  };
  external_ids: ExternalLinks;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: Trailer[];
  };
  vote_average: number;
  vote_count: number;
}

export interface ExternalLinks {
  facebook_id: string | null;
  imdb_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Credit {
  adult: boolean;
  cast_id: number;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Trailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: true;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface Crew extends Credit {
  department: string;
  job: string | string[];
}

export interface Cast extends Credit {
  character: string;
  order: number;
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
