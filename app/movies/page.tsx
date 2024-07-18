"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatDate, handleDisplayImage } from "@/lib/utils";
import { getGenres, getMovies } from "@/services/movies";
import { Genre, Result } from "@/types";
import classNames from "classnames";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface QueryData {
  sort: string;
  fromDate: string;
  toDate: string;
  genres: number[] | undefined;
  voteAvgFrom: number | null;
  voteAvgTo: number | null;
}

export default function Movies() {
  const [movies, setMovies] = useState<Result[] | undefined>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [genreList, setGenreList] = useState<Genre[] | undefined>([]);
  const [genres, setGenres] = useState<number[]>([]);

  const initialData: QueryData = {
    sort: "",
    fromDate,
    toDate,
    genres,
    voteAvgFrom: null,
    voteAvgTo: null,
  };
  const [queryData, setQueryData] = useState<QueryData>(initialData);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(queryData);
      setMovies(res);
    };
    fetchMovies();
  }, [queryData, fromDate]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await getGenres();
      setGenreList(res);
    };
    fetchGenres();
  }, []);

  const handleChange = (value: string) => {
    setQueryData((data) => ({
      ...data,
      sort: value,
    }));
  };

  const formatQueryDate = (date: Date) => {
    const formattedDate = date.toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  const handleFromDate = (date: Date) => {
    const format = formatQueryDate(date);
    setFromDate(format);
    setQueryData((data) => ({ ...data, fromDate: format }));
  };

  const handleToDate = (date: Date) => {
    const format = formatQueryDate(date);
    setToDate(format);
    setQueryData((data) => ({ ...data, toDate: format }));
  };

  const displayFromDate = () => {
    if (fromDate) {
      return fromDate;
    } else {
      return "Choose Date";
    }
  };

  const displayToDate = () => {
    if (toDate) {
      return toDate;
    } else {
      return "Choose Date";
    }
  };

  const handleSelectGenre = (id: number) => {
    if (genres.includes(id)) {
      const removedGenre = genres.filter((prevId) => prevId !== id);
      setGenres(removedGenre);
      setQueryData((data) => ({ ...data, genres: removedGenre }));
      return;
    }
    setGenres((ids) => [...ids, id]);
    setQueryData((data) => ({ ...data, genres: [...genres, id] }));
  };

  const handleScoreFrom = (value: any) => {
    setQueryData((data) => ({ ...data, voteAvgFrom: value[0] }));
  };

  const handleScoreTo = (value: any) => {
    setQueryData((data) => ({ ...data, voteAvgTo: value[0] }));
  };

  console.log("queryData", queryData);

  const sortOptions = [
    { name: "Popularity Descending", value: "popularity.desc" },
    { name: "Popularity Ascending", value: "popularity.asc" },
    { name: "Rating Descending", value: "vote_average.desc" },
    { name: "Rating Ascending", value: "vote_average.asc" },
    { name: "Release Date Descending", value: "primary_release_date.desc" },
    { name: "Release Date Ascending", value: "primary_release_date.asc" },
    { name: "Title (A-Z)", value: "title.desc" },
    { name: "Title (Z-A)", value: "title.asc" },
  ];

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-4">
        <div className="w-[17rem] border shadow-lg rounded-lg p-5">
          <h2 className="text-2xl">Popular Movies</h2>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["item-3"]}
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
              <AccordionTrigger>Filters</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p className="text-md">Release Dates</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-5">
                      <p className="w-12">From:</p>
                      <Button
                        variant="outline"
                        className="flex items-center justify-between w-full"
                      >
                        <p>{displayFromDate()}</p>
                        <CalendarIcon />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={handleFromDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-5">
                      <p className="w-12">To:</p>
                      <Button
                        variant="outline"
                        className="flex items-center justify-between w-full"
                      >
                        <p>{displayToDate()}</p>
                        <CalendarIcon />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={handleToDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-md">Genres</p>
                <div>
                  <ul className="flex flex-wrap gap-2 items-center">
                    {genreList?.map((genre) => (
                      <li
                        key={genre.id}
                        onClick={() => handleSelectGenre(genre.id)}
                        className={classNames({
                          "rounded-full border border-gray-300 px-3 py-1 cursor-pointer duration-200":
                            true,
                          "bg-black text-white": genres?.includes(genre.id),
                        })}
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-md">User Score</p>
                  <p>From:</p>
                  <Slider
                    defaultValue={[0]}
                    onValueChange={(value) => handleScoreFrom(value)}
                    max={10}
                    step={1}
                    className=""
                  />
                  <span>{queryData.voteAvgFrom ?? 0}</span>
                  <p>To:</p>
                  <Slider
                    defaultValue={[0]}
                    onValueChange={(value) => handleScoreTo(value)}
                    max={10}
                    step={1}
                    className=""
                  />
                  <span>{queryData.voteAvgTo ?? 0}</span>
                </div>
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