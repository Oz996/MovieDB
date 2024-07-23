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
import { getMovieGenres } from "@/services/movies";
import { getTvShowGenres } from "@/services/tvShows";
import { Genre, QueryData } from "@/types";
import classNames from "classnames";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  type: "movie" | "tv";
  params: { filter: string[] };
  queryData: QueryData;
  setQueryData: Dispatch<SetStateAction<QueryData>>;
}

export default function FilterMenu({
  type,
  params,
  queryData,
  setQueryData,
}: props) {
  const [genreList, setGenreList] = useState<Genre[] | undefined>([]);
  const [genres, setGenres] = useState<number[]>([]);
  const [monetizations, setMonetizations] = useState<string[]>([]);

  console.log("list", genreList);

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

  const voteNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const userVoteNumbers = [0, 100, 200, 300, 400, 500];

  const topRatedPage = params.filter.includes("top-rated");
  const upcomingPage = params.filter.includes("upcoming");
  const moviesPage = type === "movie";

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
      setQueryData((data) => ({ ...data, toDate: untilDate }));
    }
  }, [params]);

  useEffect(() => {
    const fetchGenres = async () => {
      if (moviesPage) {
        const res = await getMovieGenres();
        setGenreList(res);
      } else {
        const res = await getTvShowGenres();
        setGenreList(res);
      }
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
    if (moviesPage && topRatedPage) {
      return "Top Rated Movies";
    } else if (moviesPage && upcomingPage) {
      return "Upcoming Movies";
    } else if (moviesPage) {
      return "Popular Movies";
    } else if (topRatedPage) {
      return "Top Rated TV Shows";
    } else {
      return "Popular TV Shows";
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

  return (
    <div className="w-[17rem] border shadow-lg rounded-lg p-5">
      <h2 className="text-2xl">{displayHeading()}</h2>
      <Accordion type="multiple" className="w-full" defaultValue={["item-2"]}>
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
                    <SelectItem value={option.value}>{option.name}</SelectItem>
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
  );
}
