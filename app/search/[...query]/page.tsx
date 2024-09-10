"use client";
import { useEffect, useState } from "react";
import SearchResultsBar from "./components/SearchResultsBar/SearchResultsBar";
import { getSearchResults } from "@/services/search";
import SearchResults from "./components/SearchResults/SearchResults";
import { Result } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";

export default function Search() {
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setQuery, setPageAmount, setType } = useSearch();

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const pageParam = searchParams.get("page");

  const pathname = usePathname();
  const mediaType = pathname.split("/")[2];

  const currentPage = pageParam ? parseInt(pageParam) : 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getSearchResults(
          query as string,
          mediaType,
          currentPage
        );
        const results = data?.results;
        const pageAmount = data?.total_pages;
        console.log("current results", results);
        setSearchResults(results);
        setPageAmount(pageAmount);
        setType(mediaType);
        setQuery(query as string);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, currentPage, mediaType]);

  return (
    <section className="pt-28 grid grid-cols-1 lg:grid-cols-3 container">
      <SearchResultsBar
        isLoading={isLoading}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <SearchResults
        isLoading={isLoading}
        mediaType={mediaType}
        currentPage={currentPage}
        searchParams={searchParams}
        searchResults={searchResults}
      />
    </section>
  );
}
