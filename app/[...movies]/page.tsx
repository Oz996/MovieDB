"use client";

import { formatDate, handleDisplayImage } from "@/lib/utils";
import { getMovies } from "@/services/movies";
import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterMenu from "./components/FilterMenu";

export interface QueryData {
  sort: string;
  fromDate: string;
  toDate: string;
  genres: number[] | undefined;
  voteAvgFrom: number | null;
  voteAvgTo: number | null;
  userVotes: number | null;
  language: string;
  monetizations: string[] | undefined;
}

export default function Movies({ params }: { params: { movies: string[] } }) {
  const [movies, setMovies] = useState<Result[] | undefined>([]);

  const initialData: QueryData = {
    sort: "popularity.desc",
    fromDate: "",
    toDate: "",
    genres: [],
    voteAvgFrom: null,
    voteAvgTo: null,
    userVotes: null,
    language: "en",
    monetizations: [],
  };
  const [queryData, setQueryData] = useState<QueryData>(initialData);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(queryData);
      setMovies(res);
    };
    fetchMovies();
  }, [queryData]);

  console.log("queryData", queryData);

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-4">
        <FilterMenu
          params={params}
          queryData={queryData}
          setQueryData={setQueryData}
        />
        <div className="grid grid-cols-4 gap-y-8 col-span-3">
          {movies?.map((movie) => {
            return (
              <Link
                key={movie.id}
                href={`http://localhost:3000/movie/${movie.id}`}
                className="border rounded-lg shadow-md w-[11rem]"
              >
                <Image
                  className="rounded-t-lg"
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
