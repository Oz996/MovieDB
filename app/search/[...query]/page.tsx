"use client";
import { useEffect, useState } from "react";
import SearchResultsBar from "./components/SearchResultsBar";
import { getSearchResults } from "@/services/search";
import SearchResults from "./components/SearchResults";
import { Result } from "@/types";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";

export default function Search({ params }: { params: { query: string } }) {
  const { type, setQuery, page, setPageAmount } = useSearch();
  const [searchResults, setSearchResults] = useState<Result[]>();

  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const pageParam = searchParams.get("page");
  setQuery(query!);

  console.log("search", query);
  console.log("searchResults", searchResults);
  console.log("type", type);

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  console.log("page", currentPage);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchResults(query!, type ?? "multi", currentPage);
      // console.log("fetched Data", data);
      const results = data?.results;
      const pageAmount = data?.total_pages;
      console.log("current results", results);
      setSearchResults(results);
      setPageAmount(pageAmount);
    };
    fetchData();
  }, [query, type, currentPage]);

  return (
    <section className="pt-28 grid grid-cols-3">
      <SearchResultsBar
        searchResults={searchResults!}
        setSearchResults={setSearchResults}
      />
      <SearchResults
        currentPage={currentPage}
        searchResults={searchResults!}
        setSearchResults={setSearchResults}
      />
    </section>
  );
}
