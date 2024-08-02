import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { handleDisplayImage } from "@/lib/utils";
import { Overview, Person } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  person: Person;
}

export default function KnownForCarousel({ person }: props) {
  const [knownFor, setKnownFor] = useState<Overview[]>([]);

  useEffect(() => {
    const mostPopular = () => {
      const cast = person?.combined_credits.cast;
      const crew = person?.combined_credits.crew;
      // filtering to make sure we dont display duplicates of a show/movie
      if (cast && crew) {
        const combined = [...cast, ...crew];
        const uniqueMedia = new Map();

        for (const media of combined) {
          const title = media.original_title || media.original_name;
          if (!uniqueMedia.has(title)) {
            uniqueMedia.set(title, media);
          }
          const filtered = Array.from(uniqueMedia.values());
          const sorted = filtered.sort((a, b) => b.popularity - a.popularity);
          setKnownFor(sorted.slice(0, 8));
        }
      }
    };
    mostPopular();
  }, [person]);

  return (
    <section>
      <h2 className="text-xl font-semibold pb-2">Known For</h2>
      <Carousel>
        <CarouselContent>
          {knownFor?.map((media) => {
            const title = media.title || media.name;
            return (
              <CarouselItem
                key={media.id}
                className="pl-1 basis-1/1 sm:basis-1/3 md:basis-1/3 lg:basis-1/6"
              >
                <Link
                  href={`/${media.media_type}/${media.id}`}
                  className="flex flex-col gap-3"
                >
                  <Image
                    alt=""
                    src={handleDisplayImage("w342", media.poster_path)}
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
        <CarouselPrevious />
        <CarouselNext className="max-md:mr-5" />
      </Carousel>
    </section>
  );
}
