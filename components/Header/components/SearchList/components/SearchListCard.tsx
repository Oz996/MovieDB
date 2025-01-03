import { Skeleton } from "@/components/ui/skeleton";
import {
  handleDisplayImage,
  imageToDisplay,
  titleToDisplay,
} from "@/lib/utils";
import { Media } from "@/types";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface props {
  item: Media;
  index: number;
  isLoading: boolean;
}

export default function SearchListCard({ isLoading, item, index }: props) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={classNames({
        "py-2 px-4 duration-200 cursor-pointer hover:text-slate-500": true,
        "bg-slate-100": index % 2 === 1,
      })}
    >
      <Link
        href={`/${item.media_type}/${item.id}`}
        className="flex gap-3 items-center"
      >
        {isLoading ? (
          <>
            <Skeleton className="w-8 h-12" />
            <Skeleton className="w-[20rem] h-[1.3rem]" />
          </>
        ) : (
          <>
            <Image
              src={handleDisplayImage("w92", imageToDisplay(item))}
              width={30}
              height={30}
              alt=""
              className="object-cover"
            />
            <div>
              <p>{titleToDisplay(item)}</p>
            </div>
          </>
        )}{" "}
      </Link>
    </motion.li>
  );
}
