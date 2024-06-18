import { Result } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { CarouselItem } from "./ui/carousel";

interface props {
  item: Result;
}

export default function CarouselCard({ item }: props) {
  const title = item?.name || item?.title;
  const date = item?.first_air_date || item?.release_date;
  const image = item.poster_path
    ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
    : item.profile_path
    ? `https://image.tmdb.org/t/p/w342/${item.profile_path}`
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  return (
    <CarouselItem
      key={item.id}
      className="pl-1 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
    >
      <motion.div
        className="p-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="space-y-5">
          <div className="flex items-centerjustify-center">
            <Image
              className="rounded-lg"
              src={image}
              width={150}
              height={150}
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-gray-500">{date}</p>
          </div>
        </div>
      </motion.div>
    </CarouselItem>
  );
}
