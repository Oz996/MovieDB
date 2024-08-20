import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { handleDisplayImage } from "@/lib/utils";
import { Cast, Crew, Person } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  cast: Cast[];
  crew: Crew[];
}

export default function KnownForCarousel({ cast, crew }: props) {
  const [knownFor, setKnownFor] = useState<(Cast | Crew)[]>([]);

  useEffect(() => {
    const mostPopular = () => {
      // filtering to make sure we dont display duplicates of a show/movie
      if (cast && crew) {
        const combined = [...cast, ...crew];

        const sorted = combined.sort((a, b) => b.popularity - a.popularity);
        const results = sorted.filter((media, index, array) => {
          return array.findIndex((item) => item.id === media.id) === index;
        });
        setKnownFor(results.slice(0, 8));
      }
    };
    mostPopular();
  }, [cast, crew]);

  return (
    <section>
      <h2 className="text-xl font-semibold pb-2">Known For</h2>
      <Carousel>
        <CarouselContent>
          {knownFor?.map((item) => {
            const title = item.title || item.name;
            return (
              <CarouselItem
                key={item.id}
                className="pl-5 basis-1/1 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
              >
                <Link
                  href={`/${item.media_type}/${item.id}`}
                  className="flex flex-col gap-3"
                >
                  <Image
                    alt=""
                    src={handleDisplayImage("w342", item.poster_path!)}
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                  <p>{title}</p>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-3" />
        <CarouselNext className="max-md:mr-5" />
      </Carousel>
    </section>
  );
}
