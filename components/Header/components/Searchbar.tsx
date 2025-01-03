"use client";

import { Input } from "@/components/ui/input";
import { getAllTrending } from "@/services/all";
import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import SearchList from "./SearchList/SearchList";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { getSearchResults } from "@/services/search";
import { useDebounce } from "@uidotdev/usehooks";
import { Media } from "@/types";

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [searchList, setSearchList] = useState<Media[]>([]);

  const pathname = usePathname();
  const { setQuery, setCached, setType } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // using debounce to add a delay when user types in the input, less api calls made
  const debouncedValue = useDebounce(value, 300);
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    reset();
  }, [pathname]);

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
    if (value === "" && showInput) {
      const handleFetchTrending = async () => {
        setIsLoading(true);
        try {
          const data = await getAllTrending();
          setSearchList(data);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      handleFetchTrending();
    }
  }, [value, showInput]);

  useEffect(() => {
    if (debouncedValue) {
      const searchValue = async () => {
        setIsLoading(true);
        try {
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
  };

  const handleCloseInput = () => {
    reset();
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleMultiSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(value);
    router.push(`/search/multi?query=${value}`);
    reset();
  };

  const reset = () => {
    setShowInput(false);
    setValue("");
  };

  return (
    <div className="ml-auto flex gap-1 items-center w-full justify-end relative max-md:absolute max-md:left-0 max-md:right-0 max-md:top-[4.2rem]">
      {showInput ? (
        <>
          <form
            onSubmit={handleMultiSearch}
            className="h-9 flex items-center max-md:px-1 animate-expand-searchbar w-full z-30"
          >
            <Input
              ref={inputRef}
              value={value}
              onChange={handleQueryChange}
              type="text"
              className="h-full w-full text-black lg:rounded-full"
            />
          </form>

          <button onClick={handleCloseInput}>
            <X
              size={28}
              className="cursor-pointer max-md:absolute max-md:-top-[3rem] max-md:right-4"
            />
          </button>
        </>
      ) : (
        <button onClick={handleOpenInput} aria-label="Open search input">
          <Search className="cursor-pointer max-md:absolute max-md:-top-[3rem] max-md:right-4" />
        </button>
      )}

      {showInput && (
        <SearchList
          value={value}
          inputRef={inputRef}
          isLoading={isLoading}
          searchList={searchList}
          handleCloseInput={handleCloseInput}
        />
      )}
    </div>
  );
}
