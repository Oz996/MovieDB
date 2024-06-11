"use client";
import { useEffect, useState } from "react";
import SearchResultsBar from "./components/SearchResultsBar";
import { getMultiSearch } from "@/services/search";
import SearchResults from "./components/SearchResults";
import { ResultObject } from "@/types";

export default function Search({ params }: { params: { query: string } }) {
  const [searchResults, setSearchResults] = useState<ResultObject>();
  console.log("params", params);

  console.log("searchResults", searchResults);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMultiSearch(params.query);
      setSearchResults(res);
    };
    fetchData();
  }, [params.query]);

  return (
    <section className="w-screen h-screen pt-24">
      <SearchResultsBar searchResults={searchResults!} />
      <SearchResults searchResults={searchResults!} />
    </section>
  );
}
