import { getSearchResults } from "@/services/search";
import { Result, ResultObject } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  query: string;
  searchResults: Result[];
  setSearchResults: Dispatch<SetStateAction<Result[] | undefined>>;
}

export default function SearchResultsBar({
  query,
  searchResults,
  setSearchResults,
}: props) {
  const [mediaCounts, setMediaCounts] = useState({
    movies: 0,
    tvShows: 0,
    people: 0,
    cached: false,
  });

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
    if (searchResults && mediaCounts.cached === false) {
      const movies = searchResults.filter(
        (result) => result.media_type === "movie"
      ).length;
      const tvShows = searchResults.filter(
        (result) => result.media_type === "tv"
      ).length;
      const people = searchResults.filter(
        (result) => result.media_type === "person"
      ).length;

      setMediaCounts({ movies, tvShows, people, cached: true });
    }
  }, [searchResults, mediaCounts.cached]);

  const handleTypeClick = async (type: mediaType) => {
    const searchType = type.value;
    const results = await getSearchResults(query, searchType);
    setSearchResults(results);
  };

  return (
    <div className="w-[20rem] rounded-lg border">
      <h2 className="p-6 text-xl font-semibold text-white bg-black rounded-t-lg">
        Search Results
      </h2>
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
