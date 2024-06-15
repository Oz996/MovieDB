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
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  cached: boolean;
  setCached: Dispatch<SetStateAction<boolean>>;
  pageAmount: number;
  setPageAmount: Dispatch<SetStateAction<number>>;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [type, setType] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [cached, setCached] = useState(false);
  const [pageAmount, setPageAmount] = useState(0);
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
