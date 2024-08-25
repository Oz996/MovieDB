import { Result } from "@/types";
import { Search, TrendingUp } from "lucide-react";
import SearchListCard from "./components/SearchListCard";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import NoResults from "@/components/NoResults";
import { ScrollArea } from "@/components/ui/scroll-area";

interface props {
  title: "Search" | "Trending";
  inputRef: RefObject<HTMLInputElement>;
  isLoading: boolean;
  searchList: Result[];
  setShowInput: Dispatch<SetStateAction<boolean>>;
}

export default function SearchList({
  title,
  inputRef,
  searchList,
  isLoading,
  setShowInput,
}: props) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        listRef.current &&
        inputRef.current &&
        !listRef.current.contains(e.target as Node) &&
        !inputRef.current.contains(e.target as Node)
      )
        setShowInput(false);
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
        {title === "Search" ? (
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
          {searchList?.map((item, index) => (
            <SearchListCard
              key={item.id}
              item={item}
              index={index}
              isLoading={isLoading}
              setShowInput={setShowInput}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
