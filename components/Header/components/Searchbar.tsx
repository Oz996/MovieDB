"use client";

import { Input } from "@/components/ui/input";
import { getAllTrending } from "@/services/all";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import SearchList from "./SearchList/SearchList";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { getSearchResults } from "@/services/search";
import { useDebounce } from "@uidotdev/usehooks";

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const { setQuery, setCached, setType } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const indexPage = pathname === "/";
  const searchPage = pathname.startsWith("/search");

  // using debounce to add a delay when user types in the input, less api calls made
  const debouncedValue = useDebounce(value, 300);
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    if (indexPage) setShowInput(false);
  }, [indexPage]);

  // resetting these states so that the caching logic works
  useEffect(() => {
    setCached({
      movies: 0,
      tvShows: 0,
      people: 0,
    });
    sessionStorage.removeItem("cached");
    setType(null);
  }, [value]);

  useEffect(() => {
    if (debouncedValue.length > 1 && indexPage) {
      const searchValue = async () => {
        try {
          setIsLoading(true);
          const data = await getSearchResults(value);
          const results = data?.results;
          setSearchList(results);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      searchValue();
    }
  }, [debouncedValue]);

  const router = useRouter();

  const handleOpenInput = () => {
    setShowInput(true);
    handleFetchTrending();
  };

  const handleCloseInput = () => {
    setShowInput(false);
    setValue("");
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFetchTrending = async () => {
    const data = await getAllTrending();
    setSearchList(data);
  };

  const handleMultiSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(value);
    router.push(`/search/query?search=${value}`);
  };

  return (
    <div className="ml-auto flex gap-1 items-center w-full justify-end relative max-md:absolute max-md:left-0 max-md:right-0 max-md:top-[4.2rem]">
      <AnimatePresence>
        {showInput ? (
          <>
            <motion.form
              onSubmit={handleMultiSearch}
              key="search-input"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "0%" }}
              transition={{ duration: 0.3 }}
              className="h-9 flex items-center max-md:px-1"
            >
              <Input
                ref={inputRef}
                value={value}
                onChange={handleQueryChange}
                type="text"
                className="h-full w-full focus-visible:ring-0 text-black"
              />
            </motion.form>

            <X
              size={28}
              className="cursor-pointer max-md:absolute max-md:-top-[3rem] max-md:right-4"
              onClick={handleCloseInput}
            />
          </>
        ) : (
          <Search
            onClick={handleOpenInput}
            className="cursor-pointer max-md:absolute max-md:-top-[3rem] max-md:right-4"
          />
        )}
      </AnimatePresence>
      {showInput && !searchPage && (
        <SearchList isLoading={isLoading} searchList={searchList} />
      )}
    </div>
  );
}
