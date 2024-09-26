import { getSearchResults } from "@/services/search";
import SearchResultsBar from "./components/SearchResultsBar/SearchResultsBar";
import SearchResults from "./components/SearchResults/SearchResults";

type SearchType = Record<"query" | "page", string>;

export function generateMetadata({
  searchParams,
}: {
  searchParams: SearchType;
}) {
  const search = searchParams.query;

  return {
    title: `${search} - MovieDB`,
    description: "Search and explore movies, tv shows and people",
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { query: string[] };
  searchParams: SearchType;
}) {
  const search = searchParams.query;
  const mediaType = params.query[0];
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const data = await getSearchResults(search, mediaType, currentPage);
  const pageAmount = data.total_pages;

  return (
    <section className="pt-28 grid grid-cols-1 lg:grid-cols-3 container">
      <SearchResultsBar searchResults={data.results} search={search} />
      <SearchResults
        search={search}
        mediaType={mediaType}
        pageAmount={pageAmount}
        currentPage={currentPage}
        searchResults={data.results}
      />
    </section>
  );
}
