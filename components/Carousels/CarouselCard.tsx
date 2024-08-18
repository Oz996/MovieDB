import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { getBaseUrl, handleDisplayImage } from "@/lib/utils";
import { CarouselItem } from "../ui/carousel";

interface props {
  id: number;
  type: string;
  title: string;
  date: string;
  image: string;
}

export default function CarouselCard({ id, type, title, date, image }: props) {
  return (
    <CarouselItem className="pl-1">
      <Link href={getBaseUrl() + `/${type}/${id}`}>
        <motion.div
          className="p-1 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-5">
            <div className="flex">
              <Image
                className="rounded-lg"
                src={handleDisplayImage("w342", image)}
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
