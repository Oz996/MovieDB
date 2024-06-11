"use client";

import { Input } from "@/components/ui/input";
import { getAllTrending } from "@/services/all";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import TrendingList from "./TrendingList";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [showInput, setShowInput] = useState(false);
  const [trending, setTrending] = useState([]);
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const router = useRouter();

  const handleOpenInput = () => {
    setShowInput(true);
    handleFetchTrending();
  };

  const handleCloseInput = () => {
    setShowInput(false);
    setValue("");
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFetchTrending = async () => {
    const data = await getAllTrending();
    setTrending(data);
    console.log("trending", trending);
  };

  const handleMultiSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/${value}`);
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
                onChange={handleValueChange}
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
      {showInput && value === "" && <TrendingList trending={trending} />}
    </div>
    // // value !== "" && value.length > 1 &&
  );
}
