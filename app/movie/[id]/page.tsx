"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import Image from "next/image";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();

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

  const date = new Date(movie?.release_date as string);
  const genres = movie?.genres;

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const getReleaseDate = () => {
    if (year) {
      return `${month}/${day}/${year}`;
    } else {
      return null;
    }
  };

  const getRunTime = () => {
    const time = movie?.runtime;
    if (time) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      console.log(minutes);
      return `${hours}h ${minutes}m`;
    } else {
      return null;
    }
  };

  return (
    <section className="pt-24">
      {/* backdrop image */}
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}")`,
        }}
        className="h-[32rem] flex items-center justify-center w-full relative before:bg-black/50 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        {/* image and other content */}
        <div className="z-20 flex gap-10 text-white">
          <Image
            width={300}
            height={350}
            src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
            alt="Movie Poster"
            className="z-20 rounded-lg"
          />
          <div className="flex flex-col">
            <div className="z-20 flex gap-2 text-4xl">
              <h2 className="font-bold">{movie?.title}</h2>
              <p className="opacity-80">({year})</p>
            </div>
            <div className="flex items-center gap-3">
              <p>{getReleaseDate()}</p>
              <div className="pl-3 relative before:absolute before:content-['*'] before:left-0 flex gap-1">
                {genres?.map((genre, i) => (
                  <p key={genre.id}>
                    {genre.name}
                    {i === genres.length - 1 ? "" : ", "}
                  </p>
                ))}
              </div>
              <p className="pl-3 relative before:absolute before:content-['*'] before:left-0">
                {getRunTime()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
