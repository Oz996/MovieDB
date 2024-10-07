"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { handleDisplayImage } from "@/lib/utils";
import { PersonCast, PersonCrew } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  cast: PersonCast[];
  crew: PersonCrew[];
}

export default function KnownForCarousel({ cast, crew }: props) {
  const [knownFor, setKnownFor] = useState<(PersonCast | PersonCrew)[]>([]);

  useEffect(() => {
    const mostPopular = () => {
      // filtering to make sure we dont display duplicates of a show/movie
      const combined = [...cast, ...crew];

      const sorted = combined.sort((a, b) => b.vote_average - a.vote_average);
      const results = sorted.filter((media, index, array) => {
        if (media.vote_count >= 100)
          return array.findIndex((item) => item.id === media.id) === index;
      });
      setKnownFor(results.slice(0, 8));
    };
    mostPopular();
  }, [cast, crew]);

  if (knownFor.length === 0) {
    return <p>Nothing to display</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold pb-2">Known For</h2>
      <Carousel>
        <CarouselContent>
          {knownFor?.map((item) => (
            <CarouselItem key={item.id}>
              <Link href={`/${item.media_type}/${item.id}`}>
                <div className="flex-centered flex-col gap-2">
                  <div>
                    <Image
                      alt=""
                      src={handleDisplayImage("w185", item.poster_path)}
                      width={150}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="line-clamp-2 max-w-[10rem]">
                      {item.title ?? item.name}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-3" />
        <CarouselNext className="max-md:mr-5" />
      </Carousel>
    </section>
  );
}
