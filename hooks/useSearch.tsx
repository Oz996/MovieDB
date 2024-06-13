import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw Error("Failed to use SearchContext");
  return context;
};
