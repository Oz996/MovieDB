import { Skeleton } from "@/components/ui/skeleton";
import { Result } from "@/types";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import SearchListCard from "./components/SearchListCard";

interface props {
  isLoading: boolean;
  searchList: Result[];
}

export default function SearchList({ searchList, isLoading }: props) {
  console.log("isloading", isLoading);
  return (
    <AnimatePresence>
      <motion.div
        key="trending-container"
        className="absolute border border-black w-full max-h-[calc(100vh-6.8rem)] lg:max-h-[calc(100vh-4rem)] top-[2.4rem] lg:top-[3.1rem] z-10 bg-white text-black overflow-auto duration-200"
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
            <p className="text-lg px-2 py-5">
              There are no results that matched your query.
            </p>
          )}
          {searchList?.map((item, index) => (
            <SearchListCard
              key={item.id}
              item={item}
              index={index}
              isLoading={isLoading}
            />
          ))}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
}
