"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface SearchContextInterface {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  cached: boolean;
  setCached: Dispatch<SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [type, setType] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState("");
  const [cached, setCached] = useState(false);
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};