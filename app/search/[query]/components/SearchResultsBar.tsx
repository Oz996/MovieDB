import { Result, ResultObject } from "@/types";
import { useEffect, useState } from "react";

interface props {
  searchResults: Result[];
}

export default function SearchResultsBar({ searchResults }: props) {
  const [mediaCounts, setMediaCounts] = useState({
    movies: 0,
    tvShows: 0,
    people: 0,
  });

  const TypesToDisplay = [
    { name: "Movies", results: mediaCounts.movies },
    { name: "TV Shows", results: mediaCounts.tvShows },
    { name: "People", results: mediaCounts.people },
  ];

  useEffect(() => {
    if (searchResults) {
      const movies = searchResults.filter(
        (result) => result.media_type === "movie"
      ).length;
      const tvShows = searchResults.filter(
        (result) => result.media_type === "tv"
      ).length;
      const people = searchResults.filter(
        (result) => result.media_type === "person"
      ).length;

      setMediaCounts({ movies, tvShows, people });
    }
  }, [searchResults]);

  return (
    <div className="w-[20rem] rounded-lg border">
      <h2 className="p-6 text-xl font-semibold text-white bg-black rounded-t-lg">
        Search Results
      </h2>
      <ul className="pb-2">
        {TypesToDisplay.map((type) => (
          <li
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
