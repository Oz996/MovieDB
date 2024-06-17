import { Skeleton } from "@/components/ui/skeleton";
import { Result } from "@/types";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Image from "next/image";

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
          {searchList?.map((item, index) => {
            const image = item.poster_path
              ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
              : item.profile_path
              ? `https://image.tmdb.org/t/p/w185/${item.profile_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
            const title = item?.name || item?.title;
            return (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                key={item.id}
                className={classNames({
                  "py-2 px-4 duration-200 cursor-pointer flex gap-3 items-center hover:text-slate-500":
                    true,
                  "bg-slate-200": index % 2 === 1,
                })}
              >
                {isLoading ? (
                  <Skeleton className="w-8 h-10" />
                ) : (
                  <Image src={image} width={30} height={30} alt="" />
                )}
                {isLoading ? (
                  <Skeleton className="w-[20rem] h-[1.3rem]" />
                ) : (
                  <div>
                    <p>{title}</p>
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
}
