import { MediaDisplay } from "@/app/search/[...query]/components/SearchResultsBar/SearchResultsBar";

interface FilterOptions {
  name: string;
  value: string;
}

export type CrewRole =
  | "Director"
  | "Writer"
  | "Screenplay"
  | "Story"
  | "Creator";

export const sortOptions: FilterOptions[] = [
  { name: "Popularity Descending", value: "popularity.desc" },
  { name: "Popularity Ascending", value: "popularity.asc" },
  { name: "Rating Descending", value: "vote_average.desc" },
  { name: "Rating Ascending", value: "vote_average.asc" },
  { name: "Release Date Descending", value: "primary_release_date.desc" },
  { name: "Release Date Ascending", value: "primary_release_date.asc" },
  { name: "Title (A-Z)", value: "title.desc" },
  { name: "Title (Z-A)", value: "title.asc" },
];

export const languages: FilterOptions[] = [
  { name: "English", value: "en" },
  { name: "French", value: "fr" },
  { name: "Spanish", value: "es" },
  { name: "German", value: "de" },
  { name: "Japanese", value: "ja" },
  { name: "Portugese", value: "pt" },
  { name: "Chinese", value: "zh" },
  { name: "Italian", value: "it" },
  { name: "Russian", value: "ru" },
  { name: "Korean", value: "ko" },
  { name: "Turkish", value: "tr" },
  { name: "Swedish", value: "sv" },
];

export const monetizationOptions: FilterOptions[] = [
  { name: "Flatrate", value: "flatrate" },
  { name: "Free", value: "free" },
  { name: "Ads", value: "ads" },
  { name: "Buy", value: "buy" },
  { name: "Rent", value: "rent" },
];

export const typesToDisplay: Omit<MediaDisplay, "results">[] = [
  { name: "Movies", value: "movie" },
  { name: "TV Shows", value: "tv" },
  { name: "People", value: "person" },
];

export const rolesToList: CrewRole[] = [
  "Director",
  "Writer",
  "Screenplay",
  "Story",
  "Creator",
];
