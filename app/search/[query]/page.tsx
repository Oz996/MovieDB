"use client";
import { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import { getMultiSearch } from "@/services/search";

export default function Search({ params }: { params: { query: string } }) {
  const [searchResults, setSearchResults] = useState([]);
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
      <SearchResults />
    </section>
  );
}
