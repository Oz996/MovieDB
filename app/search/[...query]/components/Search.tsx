"use client";
import { useEffect } from "react";
import { Result } from "@/types";
import { useSearch } from "@/hooks/useSearch";
import SearchResults from "./SearchResults/SearchResults";
import SearchResultsBar from "./SearchResultsBar/SearchResultsBar";

interface props {
  searchParams: Record<"query" | "page", string>;
  data: Result[];
  pageAmount: number;
  currentPage: number;
  mediaType: string;
}

export default function Search({
  searchParams,
  pageAmount,
  data,
  currentPage,
  mediaType,
}: props) {
  const { setQuery, setPageAmount, setType } = useSearch();
  const search = searchParams.query;

  useEffect(() => {
    console.log("current results", data);
    setPageAmount(pageAmount);
    setType(mediaType);
    setQuery(search);
  }, [search, currentPage, mediaType]);

  return (
    <section className="pt-28 grid grid-cols-1 lg:grid-cols-3 container">
      <SearchResultsBar searchResults={data} />
      <SearchResults
        mediaType={mediaType}
        currentPage={currentPage}
        searchResults={data}
      />
    </section>
  );
}
