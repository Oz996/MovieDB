"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import "react-circular-progressbar/dist/styles.css";
import Banner from "@/components/Banner/Banner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(params.id as string);
        setMovie(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [params]);

  const cast = movie?.credits.cast;
  const getCastToDisplay = () => {
    if (!cast) return null;
    return cast.slice(0, 8);
  };
  console.log(getCastToDisplay());

  return (
    <>
      <Banner movie={movie!} />
      <section>
        <h2 className="text-2xl font-semibold py-5">Top Billed Cast</h2>
        <Carousel className="rounded-xl pl-2">
          <CarouselContent className="-ml-1">
            {getCastToDisplay()?.map((person) => {
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
                          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
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
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
}
