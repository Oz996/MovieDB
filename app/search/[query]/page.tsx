"use client";
import { useEffect, useState } from "react";
import SearchResultsBar from "./components/SearchResultsBar";
import { getSearchResults } from "@/services/search";
import SearchResults from "./components/SearchResults";
import { Result, ResultObject } from "@/types";

export default function Search({ params }: { params: { query: string } }) {
  const [searchResults, setSearchResults] = useState<Result[]>();
  console.log("params", params);

  console.log("searchResults", searchResults);
  useEffect(() => {
    const fetchData = async () => {
      const results = await getSearchResults(params.query);
      setSearchResults(results);
    };
    fetchData();
  }, [params.query]);

  return (
    <section className="pt-24 grid grid-cols-3">
      <SearchResultsBar searchResults={searchResults!} />
      <SearchResults searchResults={searchResults!} />
    </section>
  );
}
