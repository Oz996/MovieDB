"use client";
import { useEffect, useState } from "react";
import SearchResultsBar from "./components/SearchResultsBar";
import { getSearchResults } from "@/services/search";
import SearchResults from "./components/SearchResults";
import { Result } from "@/types";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";

export default function Search({ params }: { params: { query: string } }) {
  const { type, setQuery } = useSearch();
  const [searchResults, setSearchResults] = useState<Result[]>();
  console.log("params", params);

  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  setQuery(query!);

  console.log("search", query);
  console.log("searchResults", searchResults);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getSearchResults(query!, type ?? "multi");
      setSearchResults(results);
    };
    fetchData();
  }, [query, type]);

  return (
    <section className="pt-24 grid grid-cols-3">
      <SearchResultsBar
        searchResults={searchResults!}
        setSearchResults={setSearchResults}
      />
      <SearchResults searchResults={searchResults!} />
    </section>
  );
}
