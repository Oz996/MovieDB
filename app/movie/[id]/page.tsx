"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Movie } from "@/types";

export default function Movie() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();
  const params = useParams();

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
    <section className="pt-24">
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}")`,
        }}
        className="h-[32rem] w-full relative"
      >
        <div className="absolute inset-0 w-full bg-cover bg-black/50"></div>
      </div>
    </section>
  );
}
