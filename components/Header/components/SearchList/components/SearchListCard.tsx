import { Skeleton } from "@/components/ui/skeleton";
import { handleDisplayImage } from "@/lib/utils";
import { Result } from "@/types";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface props {
  item: Result;
  index: number;
  isLoading: boolean;
}

export default function SearchListCard({ isLoading, item, index }: props) {
  const imageToDisplay = item?.poster_path ?? item?.profile_path;
  const image = handleDisplayImage("w185", imageToDisplay!);
  const title = item?.name ?? item?.title;

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
              src={image}
              width={30}
              height={30}
              alt=""
              className="object-cover"
            />
            <div>
              <p>{title}</p>
            </div>
          </>
        )}{" "}
      </Link>
    </motion.li>
  );
}
