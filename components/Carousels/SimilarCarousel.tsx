import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { handleDisplayImage } from "@/lib/utils";
import { getMovieSimilar } from "@/services/movies";
import { Similar } from "@/types";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoaderCarousel from "./LoaderCarousel";

interface props {
  id: string;
}

export default function SimilarCarousel({ id }: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [similar, setSimilar] = useState<Similar[] | undefined>([]);

  const [similarRef, similarEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (similarEntry?.isIntersecting && similar!.length === 0) {
      const fetchSimilar = async () => {
        try {
          const res = await getMovieSimilar(id);
          setSimilar(res);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSimilar();
    }
  }, [similarEntry?.isIntersecting]);

  const similarsToDisplay = similar?.slice(0, 19);

  if (isLoading) return <LoaderCarousel />;

  return (
    <section ref={similarRef} className="pb-10">
      <h2 className="text-title font-semibold pb-8 pr-5">Similar</h2>
      <Carousel>
        <CarouselContent>
          {similarsToDisplay?.map((item) => {
            const rating = Math.ceil(item?.vote_average! * 10);

            return (
              <CarouselItem
                key={item.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 shrink-0 pr-6 space-y-2 self-center"
              >
                <Link href={`http://localhost:3000/movie/${item.id}`}>
                  <Image
                    src={handleDisplayImage(
                      "w250_and_h141_face",
                      item.poster_path
                    )}
                    width={270}
                    height={270}
                    alt=""
                    className="rounded-lg max-h-[7.5rem]"
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
        <CarouselNext className="max-md:mr-5" />
      </Carousel>
    </section>
  );
}
