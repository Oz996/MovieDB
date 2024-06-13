"use client";

import { Input } from "@/components/ui/input";
import { getAllTrending } from "@/services/all";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import TrendingList from "./TrendingList";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [trending, setTrending] = useState([]);

  const { query, setQuery, setCached, setType } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // resetting these values so that the caching logic works
  useEffect(() => {
    setCached(false);
    setType(null);
  }, [value]);

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
    setTrending(data);
    // console.log("trending", trending);
  };

  const handleMultiSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(value);
    router.push(`/search/query?search=${value}`);
  };

  return (
    <div className="ml-auto flex gap-1 items-center w-full justify-end relative">
      <AnimatePresence>
        {showInput ? (
          <>
            <motion.form
              onSubmit={handleMultiSearch}
              key="search-input"
              initial={{ width: "0%" }}
              animate={{ width: "90%" }}
              exit={{ width: "0%" }}
              transition={{ duration: 0.5 }}
              className="h-9 flex items-center"
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
              className="cursor-pointer"
              onClick={handleCloseInput}
            />
          </>
        ) : (
          <motion.div
            key="icon"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Search onClick={handleOpenInput} className="cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
      {showInput && query === "" && <TrendingList trending={trending} />}
    </div>
    // // value !== "" && value.length > 1 &&
  );
}
