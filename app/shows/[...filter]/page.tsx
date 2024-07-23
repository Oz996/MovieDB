"use client";
import FilterMenu from "@/components/FilterMenu";
import { formatDate, handleDisplayImage } from "@/lib/utils";
import { getTvShows } from "@/services/tvShows";
import { QueryData, Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Shows({ params }: { params: { filter: string[] } }) {
  const [tvShows, setTvShows] = useState<Result[] | undefined>([]);
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
      const res = await getTvShows(queryData);
      setTvShows(res);
    };
    fetchMovies();
  }, [queryData]);

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-4">
        <FilterMenu
          type="tv"
          params={params}
          queryData={queryData}
          setQueryData={setQueryData}
        />
        <div className="grid grid-cols-4 gap-y-8 col-span-3">
          {tvShows?.map((show) => {
            return (
              <Link
                key={show.id}
                href={`http://localhost:3000/tv/${show.id}`}
                className="border rounded-lg shadow-md w-[11rem]"
              >
                <Image
                  className="rounded-t-lg"
                  src={handleDisplayImage("w342", show.poster_path!)}
                  width={180}
                  height={180}
                  alt=""
                />

                <div className="flex flex-col gap-1 p-2">
                  <p className="font-semibold max-w-[10rem] line-clamp-2">
                    {show.title}
                  </p>
                  <p className="text-gray-500">
                    {formatDate(show.first_air_date!)}
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
