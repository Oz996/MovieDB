"use client";
import { useEffect, useState } from "react";
import SearchResultsBar from "./components/SearchResultsBar";
import { getSearchResults } from "@/services/search";
import SearchResults from "./components/SearchResults";
import { Result } from "@/types";
import { useSearchParams } from "next/navigation";

export default function Search({ params }: { params: { query: string } }) {
  const [searchResults, setSearchResults] = useState<Result[]>();
  console.log("params", params);

  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  console.log("search", query);
  console.log("searchResults", searchResults);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getSearchResults(query!);
      setSearchResults(results);
    };
    fetchData();
  }, [params.query, query]);

  return (
    <section className="pt-24 grid grid-cols-3">
      <SearchResultsBar
        query={params.query}
        searchResults={searchResults!}
        setSearchResults={setSearchResults}
      />
      <SearchResults searchResults={searchResults!} />
    </section>
  );
}
