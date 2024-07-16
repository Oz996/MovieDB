"use client";
import { formatDate, handleDisplayImage } from "@/lib/utils";
import { getMovies } from "@/services/movies";
import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState<Result[] | undefined>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies();
      setMovies(res);
    };
    fetchMovies();
  }, []);

  console.log("mov", movies);

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-4">
        <div>
          <div className="w-[20rem] h-[10rem] border"></div>
        </div>
        <div className="grid grid-cols-4 gap-3 col-span-3">
          {movies?.map((movie) => {
            return (
              <Link
                key={movie.id}
                href={`http://localhost:3000/movie/${movie.id}`}
                className="border rounded-lg shadow-md"
              >
                <Image
                  className="rounded-lg"
                  src={handleDisplayImage("w342", movie.poster_path!)}
                  width={180}
                  height={180}
                  alt=""
                />

                <div className="flex flex-col gap-1 p-2">
                  <p className="font-semibold max-w-[10rem] line-clamp-2">
                    {movie.title}
                  </p>
                  <p className="text-gray-500">
                    {formatDate(movie.release_date!)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
