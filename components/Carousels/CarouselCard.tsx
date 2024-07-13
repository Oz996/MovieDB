import { Result } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { handleDisplayImage } from "@/lib/utils";
import { CarouselItem } from "../ui/carousel";

interface props {
  item: Result;
  type?: "tv" | "movie";
}

export default function CarouselCard({ item, type }: props) {
  const title = item?.name || item?.title;
  const date = item?.first_air_date || item?.release_date;
  const imageToDisplay = item?.poster_path || item?.profile_path;
  const image = handleDisplayImage("w342", imageToDisplay!);
  return (
    <CarouselItem
      key={item.id}
      className="pl-1 basis-1/1 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
    >
      <Link
        href={`http://localhost:3000/${item.media_type ?? type}/${item.id}`}
      >
        <motion.div
          className="p-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-5">
            <div className="flex">
              <Image
                className="rounded-lg"
                src={image}
                width={150}
                height={150}
                alt=""
              />
            </div>
            <div className="">
              <p className="font-semibold max-w-[10rem] line-clamp-2">
                {title}
              </p>
              <p className="text-gray-500">{date}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    </CarouselItem>
  );
}
