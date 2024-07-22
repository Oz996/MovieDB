"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
  userVotes: number | null;
  language: string;
  monetizations: string[] | undefined;
}

export default function Movies({ params }: { params: { movies: string[] } }) {
  const [movies, setMovies] = useState<Result[] | undefined>([]);
  const [genreList, setGenreList] = useState<Genre[] | undefined>([]);
  const [genres, setGenres] = useState<number[]>([]);
  const [monetizations, setMonetizations] = useState<string[]>([]);

  const initialData: QueryData = {
    sort: "popularity.desc",
    fromDate: "",
    toDate: "",
    genres,
    voteAvgFrom: null,
    voteAvgTo: null,
    userVotes: null,
    language: "en",
    monetizations,
  };
  const [queryData, setQueryData] = useState<QueryData>(initialData);

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

  const languages = [
    { name: "English", value: "en" },
    { name: "French", value: "fr" },
    { name: "Spanish", value: "es" },
    { name: "German", value: "de" },
    { name: "Japanese", value: "ja" },
    { name: "Portugese", value: "pt" },
    { name: "Chinese", value: "zh" },
    { name: "Italian", value: "it" },
    { name: "Russian", value: "ru" },
    { name: "Korean", value: "ko" },
    { name: "Turkish", value: "tr" },
    { name: "Swedish", value: "sv" },
  ];

  const monetizationOptions = [
    { name: "Flatrate", value: "flatrate" },
    { name: "Free", value: "free" },
    { name: "Ads", value: "ads" },
    { name: "Buy", value: "buy" },
    { name: "Rent", value: "rent" },
  ];

  console.log("params", params);
  const voteNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const userVoteNumbers = [0, 100, 200, 300, 400, 500];

  const topRatedPage = params.movies.includes("top-rated");
  const upcomingPage = params.movies.includes("upcoming");
  const {
    fromDate,
    toDate,
    voteAvgFrom,
    voteAvgTo,
    userVotes,
    sort,
    language,
  } = queryData;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies(queryData);
      setMovies(res);
    };
    fetchMovies();
  }, [queryData]);

  useEffect(() => {
    if (topRatedPage) {
      setQueryData((data) => ({
        ...data,
        sort: "vote_average.desc",
        userVotes: 300,
      }));
    } else if (upcomingPage) {
      const date = new Date();
      const todaysDate = formatQueryDate(date);
      const toDate = new Date(date);
      toDate.setMonth(toDate.getMonth() + 1);
      const untilDate = formatQueryDate(toDate);
      setQueryData((data) => ({ ...data, fromDate: todaysDate }));
    }
  }, [params]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await getGenres();
      setGenreList(res);
    };
    fetchGenres();
  }, []);

  const handleSortChange = (value: string) => {
    setQueryData((data) => ({
      ...data,
      sort: value,
    }));
  };

  const handleLangChange = (value: string) => {
    setQueryData((data) => ({
      ...data,
      language: value,
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
    setQueryData((data) => ({ ...data, fromDate: format }));
  };

  const handleToDate = (date: Date) => {
    const format = formatQueryDate(date);
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

  const displayHeading = () => {
    if (topRatedPage) {
      return "Top Rated Movies";
    } else if (upcomingPage) {
      return "Upcoming Movies";
    } else {
      return "Popular Movies";
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

  const handleUserScore = (value: any) => {
    setQueryData((data) => ({ ...data, userVotes: value[0] }));
  };

  const handleSelectMonetization = (value: string) => {
    if (monetizations.includes(value)) {
      const removedMonetization = monetizations.filter((val) => val !== value);
      setMonetizations(removedMonetization);
      setQueryData((data) => ({ ...data, monetizations: removedMonetization }));
      return;
    }
    setMonetizations((prevVals) => [...prevVals, value]);
    setQueryData((data) => ({
      ...data,
      monetizations: [...monetizations, value],
    }));
  };

  console.log("queryData", queryData);

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-4">
        <div className="w-[17rem] border shadow-lg rounded-lg p-5">
          <h2 className="text-2xl">{displayHeading()}</h2>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["item-2"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Sort</AccordionTrigger>
              <AccordionContent>
                <p className="">Sort Results By</p>
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={sort} />
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
              <AccordionTrigger>Filters</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <p className="text-md">Availabilities</p>
                <div className="space-y-5">
                  {monetizationOptions.map((option) => (
                    <div className="flex items-center gap-1">
                      <Checkbox
                        id={option.name}
                        onCheckedChange={() =>
                          handleSelectMonetization(option.value)
                        }
                      />
                      <label
                        htmlFor={option.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
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
                    value={[voteAvgFrom!]}
                    onValueChange={(value) => handleScoreFrom(value)}
                    max={10}
                    step={1}
                    className=""
                  />
                  <div className="flex justify-between">
                    {voteNumbers.map((num) => (
                      <span
                        key={num}
                        className={classNames({
                          "text-blue-600": voteAvgFrom === num,
                        })}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <p>To:</p>
                  <Slider
                    value={[voteAvgTo!]}
                    onValueChange={(value) => handleScoreTo(value)}
                    max={10}
                    step={1}
                    className=""
                  />
                  <div className="flex justify-between">
                    {voteNumbers.map((num) => (
                      <span
                        key={num}
                        className={classNames({
                          "text-blue-600": voteAvgTo === num,
                        })}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <p>Minimum User Votes</p>
                <Slider
                  value={[userVotes!]}
                  onValueChange={(value) => handleUserScore(value)}
                  max={500}
                  step={100}
                  className=""
                />
                <div className="flex justify-between">
                  {userVoteNumbers.map((num) => (
                    <span
                      key={num}
                      className={classNames({
                        "text-blue-600": userVotes === num,
                      })}
                    >
                      {num}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-md">Language</p>
                  <Select value={language} onValueChange={handleLangChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={language} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {languages.map((language) => (
                          <SelectItem value={language.value}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
