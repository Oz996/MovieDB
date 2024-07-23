"use client";

import { MediaCounts } from "@/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface SearchContextInterface {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  cached: MediaCounts;
  setCached: Dispatch<SetStateAction<MediaCounts>>;
  pageAmount: number;
  setPageAmount: Dispatch<SetStateAction<number>>;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const storedMediaCounts: any = sessionStorage.getItem("cached");
  const [type, setType] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [cached, setCached] = useState<MediaCounts>(
    storedMediaCounts
      ? JSON.parse(storedMediaCounts)
      : { movies: 0, tvShows: 0, people: 0 } || {}
  );
  const [pageAmount, setPageAmount] = useState(0);

  useEffect(() => {
    const hasValue = Object.values(cached).some((value) => value > 0);
    if (hasValue) {
      sessionStorage.setItem("cached", JSON.stringify(cached));
    }
  }, [cached]);

  return (
    <SearchContext.Provider
      value={{
        type,
        setType,
        query,
        setQuery,
        page,
        setPage,
        cached,
        setCached,
        pageAmount,
        setPageAmount,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
