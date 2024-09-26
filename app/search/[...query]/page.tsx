import { getSearchResults } from "@/services/search";
import Search from "./components/Search";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { query: string[] };
  searchParams: Record<"query" | "page", string>;
}) {
  const search = searchParams.query;
  const mediaType = params.query[0];
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const data = await getSearchResults(search, mediaType, currentPage);
  const pageAmount = data.total_pages;
  console.log("dataa", data);

  return (
    <Search
      params={params}
      searchParams={searchParams}
      pageAmount={pageAmount}
      data={data.results}
    />
  );
}
