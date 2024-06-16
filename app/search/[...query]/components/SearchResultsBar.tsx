import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearch } from "@/hooks/useSearch";
import { Result } from "@/types";
import { CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  searchResults: Result[];
  setSearchResults: Dispatch<SetStateAction<Result[] | undefined>>;
}

export default function SearchResultsBar({
  searchResults,
  setSearchResults,
}: props) {
  const storedMediaCounts = sessionStorage.getItem("cached");
  const initalMediaState = storedMediaCounts
    ? JSON.parse(storedMediaCounts)
    : {
        movies: 0,
        tvShows: 0,
        people: 0,
      };

  const { query, cached, setType, setCached } = useSearch();
  const [mediaCounts, setMediaCounts] = useState(initalMediaState);

  interface mediaType {
    name: string;
    value: string;
    results: number;
  }

  const TypesToDisplay: mediaType[] = [
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

  console.log("cached", cached);

  const router = useRouter();

  const handleTypeClick = async (type: mediaType) => {
    const searchType = type.value;
    setType(searchType);
    router.push(`/search/query?search=${query}&type=${type.value}`);
  };

  return (
    <div className="w-[20rem] rounded-lg border h-[14rem]">
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
        {TypesToDisplay.map((type) => (
          <li
            onClick={() => handleTypeClick(type)}
            key={type.name}
            className="dropdown-list-item flex justify-between items-center"
          >
            <p>{type.name}</p>
            <span className="bg-gray-200 p-1 px-4 rounded">
              {type?.results}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
