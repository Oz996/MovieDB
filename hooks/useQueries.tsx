import { useSearchParams } from "next/navigation";
import { languages, sortOptions } from "../lib/constants/mediaFilters";

export default function useQueries() {
  const searchParams = useSearchParams();

  const resetPage = (url: URL) => {
    url?.searchParams.delete("page");
  };

  const currentGenres = searchParams.get("with_genres")?.split(",") || [];
  const currentMonetizations =
    searchParams.get("with_watch_monetization_types")?.split(",") || [];

  const voteAvgFrom = searchParams.get("vote_average.gte");
  const voteAvgTo = searchParams.get("vote_average.lte");
  const userVotes = searchParams.get("vote_count.gte");

  const fromDate = searchParams.get("primary_release_date.gte");
  const toDate = searchParams.get("primary_release_date.lte");

  const language =
    searchParams.get("with_original_language") ?? languages[0].value;
  const sortBy = searchParams.get("sort_by") ?? sortOptions[0].value;

  return {
    currentGenres,
    currentMonetizations,
    voteAvgFrom,
    voteAvgTo,
    userVotes,
    fromDate,
    toDate,
    language,
    sortBy,
    resetPage,
  };
}
