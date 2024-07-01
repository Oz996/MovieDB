import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Link from "next/link";
import { Movie } from "@/types";
import { handleDisplayImage } from "@/lib/utils";

interface props {
  movie: Movie;
}

export default function PersonCarousel({ movie }: props) {
  const cast = movie?.credits.cast.slice(0, 8);

  return (
    <section>
      <h2 className="text-title font-semibold pb-5 pt-8">Top Billed Cast</h2>
      <Carousel className="rounded-xl pl-2 pr-6">
        <CarouselContent className="-ml-1">
          {cast?.map((person) => {
            return (
              <CarouselItem
                key={person.id}
                className="pl-1 basis-1/1 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
              >
                <motion.div>
                  <div className="space-y-5 border flex flex-col items-center w-[8.95rem] rounded-lg pb-2">
                    <Link href={""}>
                      <Image
                        className="rounded-t-lg"
                        src={handleDisplayImage(
                          "original",
                          person.profile_path
                        )}
                        width={140}
                        height={140}
                        alt=""
                      />
                      <div className="p-2">
                        <p className="font-bold max-w-[10rem] line-clamp-2">
                          {person.name}
                        </p>
                        <p>{person.character}</p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="mr-[4.5rem]" />
      </Carousel>
    </section>
  );
}
