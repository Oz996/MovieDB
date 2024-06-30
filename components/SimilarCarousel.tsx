import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getMovieSimilar } from "@/services/movies";
import { Movie, Similar } from "@/types";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  id: string;
}

export default function SimilarCarousel({ id }: props) {
  const [similar, setSimilar] = useState<Similar[] | undefined>([]);

  const [similarRef, similarEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    // if (similarEntry?.isIntersecting && similar.length === 0) {
    const fetchSimilar = async () => {
      const res = await getMovieSimilar(id);
      setSimilar(res);
    };
    fetchSimilar();
    // }
  }, [similarEntry]);

  const similarsToDisplay = similar?.slice(0, 19);

  return (
    <section ref={similarRef} className="pb-10">
      <h2 className="text-title font-semibold py-5 pr-5">Recommendations</h2>
      <Carousel>
        <CarouselContent>
          {similarsToDisplay?.map((item) => {
            const rating = Math.ceil(item?.vote_average! * 10);

            return (
              <CarouselItem
                key={item.id}
                className="md:basis-1/4 lg:basis-1/4 pr-6 space-y-2"
              >
                <Link href={`http://localhost:3000/movie/${item.id}`}>
                  <Image
                    src={`https://media.themoviedb.org/t/p/w250_and_h141_face${item.poster_path}`}
                    width={270}
                    height={270}
                    alt=""
                    className="rounded-lg"
                  />
                </Link>
                <div className="flex justify-between">
                  <Link
                    href={`http://localhost:3000/movie/${item.id}`}
                    className="truncate pr-3"
                  >
                    <span>{item.title}</span>
                  </Link>
                  <span>{rating}%</span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
