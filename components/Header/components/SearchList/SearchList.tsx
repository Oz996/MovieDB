import { Result } from "@/types";
import { ArrowRight, Search, TrendingUp } from "lucide-react";
import SearchListCard from "./components/SearchListCard";
import { RefObject, useEffect, useRef } from "react";
import NoResults from "@/components/NoResults";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface props {
  value: string;
  inputRef: RefObject<HTMLInputElement>;
  isLoading: boolean;
  searchList: Result[];
  handleCloseInput: () => void;
}

export default function SearchList({
  value,
  inputRef,
  searchList,
  isLoading,
  handleCloseInput,
}: props) {
  const listRef = useRef<HTMLDivElement>(null);
  const title = value ? "Search" : "Trending";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        listRef.current &&
        inputRef.current &&
        !listRef.current.contains(e.target as Node) &&
        !inputRef.current.contains(e.target as Node)
      )
        handleCloseInput();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={listRef}
      className="absolute border border-gray-300 w-full max-h-[calc(100vh-6.8rem)] lg:max-h-[40rem] top-[2.4rem] lg:top-[3.1rem] rounded-b bg-white text-black overflow-auto z-50 animate-expand-down"
    >
      <div className="flex gap-2 ml-5 py-2 border-b">
        {value ? (
          <>
            <Search />
            <h2 className="text-xl font-bold">{title}</h2>
          </>
        ) : (
          <>
            <TrendingUp />
            <h2 className="text-xl font-bold">{title}</h2>
          </>
        )}
      </div>
      <ScrollArea>
        <ul>
          {searchList?.length === 0 && (
            <div className="py-5 px-4">
              <NoResults />
            </div>
          )}
          {value && searchList?.length !== 0 && (
            <Link
              href={`/search/multi?query=${value}`}
              className="py-2 px-4 flex items-center gap-1"
            >
              Search for <span className="font-bold">{value}</span> in a
              multi-search
              <ArrowRight size={15} />
            </Link>
          )}
          {searchList?.map((item, index) => (
            <SearchListCard
              key={item.id}
              item={item}
              index={index}
              isLoading={isLoading}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
