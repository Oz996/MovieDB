import { Skeleton } from "@/components/ui/skeleton";
import { handleDisplayImage } from "@/lib/utils";
import { Result } from "@/types";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";

interface props {
  isLoading: boolean;
  index: number;
  item: Result;
}

export default function SearchListCard({ isLoading, item, index }: props) {
  const imageToDisplay = item?.poster_path || item?.profile_path;
  const image = handleDisplayImage("w185", imageToDisplay!);
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
        <Skeleton className="w-8 h-12" />
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
}
