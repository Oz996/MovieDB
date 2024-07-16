"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, handleDisplayImage } from "@/lib/utils";
import { getMovies } from "@/services/movies";
import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface QueryData {
  sort: string;
  releasedBefore: string;
  releasedAfter: string;
}

export default function Movies() {
  const initialData = {
    sort: "",
    releasedBefore: "",
    releasedAfter: "",
  };
  const [movies, setMovies] = useState<Result[] | undefined>([]);
  const [queryData, setQueryData] = useState<QueryData>(initialData);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(queryData);
      setMovies(res);
    };
    fetchMovies();
  }, [queryData]);

  const handleChange = (value: string) => {
    setQueryData((data) => ({
      ...data,
      sort: value,
    }));
  };

  console.log("queryData", queryData);

  const sortOptions = [
    { name: "Popularity Descending", value: "popularity.desc" },
    { name: "Popularity Ascending", value: "popularity.asc" },
    { name: "Rating Descending", value: "vote_average.desc" },
    { name: "Rating Ascending", value: "vote_average.asc" },
    { name: "Release Date Descending", value: "primary_release_date.desc" },
    { name: "Release Date Ascending", value: "1" },
    { name: "Title (A-Z)", value: "title.desc" },
    { name: "Title (Z-A)", value: "title.asc" },
  ];

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-4">
        <div className="w-[17rem]">
          <h2 className="text-2xl">Popular Movies</h2>
          <Accordion
            type="multiple"
            collapsible
            className="w-full"
            defaultValue="item-3"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Sort</AccordionTrigger>
              <AccordionContent>
                <p className="">Sort Results By</p>
                <Select onValueChange={handleChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={sortOptions[0].name} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sortOptions.map((option) => (
                        <SelectItem value={option.value}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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
