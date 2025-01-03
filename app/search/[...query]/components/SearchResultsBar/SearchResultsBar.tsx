"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearch } from "@/hooks/useSearch";
import { Media } from "@/types";
import { CircleHelp } from "lucide-react";
import { useEffect, useState } from "react";
import SearchResultsCard from "./components/SearchResultsCard";

interface props {
  searchResults: Media[];
  search: string;
}

export interface MediaDisplay {
  name: string;
  value: string;
  results: number;
}

export default function SearchResultsBar({ searchResults, search }: props) {
  const storedMediaCounts = sessionStorage.getItem("cached");
  const initalMediaState = storedMediaCounts
    ? JSON.parse(storedMediaCounts)
    : {
        movies: 0,
        tvShows: 0,
        people: 0,
      };

  const { setCached } = useSearch();
  const [mediaCounts, setMediaCounts] = useState(initalMediaState);

  const typesToDisplay: MediaDisplay[] = [
    { name: "Movies", value: "movie", results: mediaCounts.movies },
    { name: "TV Shows", value: "tv", results: mediaCounts.tvShows },
    { name: "People", value: "person", results: mediaCounts.people },
  ];

  useEffect(() => {
    if (searchResults && !storedMediaCounts) {
      const movies = searchResults.filter(
        (result) => result.media_type === "movie"
      ).length;
      const tvShows = searchResults.filter(
        (result) => result.media_type === "tv"
      ).length;
      const people = searchResults.filter(
        (result) => result.media_type === "person"
      ).length;

      const mediaCounts = { movies, tvShows, people };
      setCached(mediaCounts);
      setMediaCounts(mediaCounts);
    }
  }, [searchResults]);

  return (
    <div className="lg:w-[20rem] rounded-lg border lg:h-[14rem]">
      <div className="p-6 text-white bg-black rounded-t-lg flex gap-1 items-center justify-between">
        <h2 className="text-xl font-semibold">Search Results</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleHelp
                size={22}
                className="hover:text-gray-400 duration-200"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Only displays the results of the first page in order to not make
                too many API calls
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ul className="pb-2">
        {typesToDisplay.map((type) => (
          <SearchResultsCard key={type.value} type={type} search={search} />
        ))}
      </ul>
    </div>
  );
}
