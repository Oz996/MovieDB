"use client";
import { useEffect, useState } from "react";
import { Result } from "@/types";
import { useSearch } from "@/hooks/useSearch";
import SearchResults from "./SearchResults/SearchResults";
import SearchResultsBar from "./SearchResultsBar/SearchResultsBar";

interface props {
  params: { query: string[] };
  searchParams: Record<"query" | "page", string>;
  data: Result[];
  pageAmount: number;
}

export default function Search({
  params,
  searchParams,
  pageAmount,
  data,
}: props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setQuery, setPageAmount, setType } = useSearch();

  const mediaType = params.query[0];
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const search = searchParams.query;
  console.log("new", search);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("current results", data);
        setPageAmount(pageAmount);
        setType(mediaType);
        setQuery(search);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [search, currentPage, mediaType]);

  return (
    <section className="pt-28 grid grid-cols-1 lg:grid-cols-3 container">
      <SearchResultsBar isLoading={isLoading} searchResults={data} />
      <SearchResults
        isLoading={isLoading}
        mediaType={mediaType}
        currentPage={currentPage}
        searchResults={data}
      />
    </section>
  );
}
