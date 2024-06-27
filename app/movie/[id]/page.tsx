"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import "react-circular-progressbar/dist/styles.css";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import { formatToDollars } from "@/lib/utils";

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

  return (
    <>
      <Banner movie={movie!} />
      <section className="flex">
        <PersonCarousel movie={movie!} />
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Status</p>
              <p>{movie?.status}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Original Language</p>
              <p>{movie?.original_language}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Budget</p>
              <p>{formatToDollars(movie?.budget!)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Revenue</p>
              <p>{formatToDollars(movie?.revenue!)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
