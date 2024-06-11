import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";

interface props {
  trending: [];
}

export default function TrendingList({ trending }: props) {
  const trendingList = trending?.results;

  return (
    <AnimatePresence>
      <motion.div
        key="trending-container"
        className="absolute border border-black w-[60rem] top-[3.1rem] z-10 bg-white text-black"
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
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.4 }}
        >
          {trendingList?.map((item, index) => (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              key={item.id}
              className={classNames({
                "py-2 px-4 duration-200 cursor-pointer flex gap-3 hover:text-slate-500":
                  true,
                "bg-slate-200": index % 2 === 1,
              })}
            >
              <Search className="text-slate-600" />
              <div>
                <p>{item?.name}</p>
                <p>{item?.title}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
}
