import { Result } from "@/types";
import { Search, TrendingUp } from "lucide-react";
import SearchListCard from "./components/SearchListCard";
import { Dispatch, SetStateAction } from "react";
import NoResults from "@/components/NoResults";

interface props {
  title: "Search" | "Trending";
  isLoading: boolean;
  searchList: Result[];
  setShowInput: Dispatch<SetStateAction<boolean>>;
}

export default function SearchList({
  title,
  searchList,
  isLoading,
  setShowInput,
}: props) {
  return (
    <div
      key="trending-container"
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
      <ul className="overflow-auto">
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
    </div>
  );
}
