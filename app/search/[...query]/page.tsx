import { getSearchResults } from "@/services/search";
import Search from "./components/Search";

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
    <Search
      searchParams={searchParams}
      currentPage={currentPage}
      pageAmount={pageAmount}
      mediaType={mediaType}
      data={data.results}
    />
  );
}
