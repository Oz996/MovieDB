import { Result } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import SearchListCard from "./components/SearchListCard";
import { Dispatch, SetStateAction } from "react";
import NoResults from "@/components/NoResults";

interface props {
  isLoading: boolean;
  searchList: Result[] | undefined;
  setShowInput: Dispatch<SetStateAction<boolean>>;
}

export default function SearchList({
  searchList,
  isLoading,
  setShowInput,
}: props) {
  return (
    <AnimatePresence>
      <motion.div
        key="trending-container"
        className="absolute border border-black w-full max-h-[calc(100vh-6.8rem)] lg:max-h-[calc(100vh-4rem)] top-[2.4rem] lg:top-[3.1rem] bg-white text-black overflow-auto duration-200 z-50"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex gap-2 ml-5 py-2 border-b">
          <TrendingUp />
          <h2 className="text-xl font-bold">Trending</h2>
        </div>
        <motion.ul
          className="overflow-auto"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
}
