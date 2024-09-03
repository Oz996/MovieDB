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
import { Genre } from "@/types";
import classNames from "classnames";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GenresLoader from "@/components/GenresLoader";
import {
  languages,
  monetizationOptions,
  sortOptions,
} from "@/lib/constants/mediaFilters";
import { formatQueryDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useQueries from "@/hooks/useQueries";

interface props {
  type: "movie" | "tv";
  params: { filter: string[] };
  url: URL;
}

export default function FilterMenu({ type, params, url }: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [genreList, setGenreList] = useState<Genre[]>([]);

  const voteNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const userVoteNumbers = [0, 100, 200, 300, 400, 500];

  const topRatedPage = params.filter.includes("top-rated");
  const upcomingPage = params.filter.includes("upcoming");
  const popularPage = params.filter.includes("popular");
  const moviesPage = type === "movie";

  const router = useRouter();

  const {
    currentGenres,
    currentMonetizations,
    voteAvgFrom,
    voteAvgTo,
    userVotes,
    fromDate,
    toDate,
    language,
    sortBy,
    resetPage,
  } = useQueries();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (moviesPage) {
          const res = await getMovieGenres();
          setGenreList(res);
        } else {
          const res = await getTvShowGenres();
          setGenreList(res);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const handleRoute = () => {
    resetPage(url);
    return router.push(url?.toString()!, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    url?.searchParams.set("sort_by", value);
    handleRoute();
  };

  const handleLangChange = (value: string) => {
    url?.searchParams.set("with_original_language", value);
    handleRoute();
  };

  const handleFromDate = (date: Date) => {
    const format = formatQueryDate(date);
    url?.searchParams.set("primary_release_date.gte", format);
    handleRoute();
  };

  const handleToDate = (date: Date) => {
    const format = formatQueryDate(date);
    url?.searchParams.set("primary_release_date.lte", format);
    handleRoute();
  };

  const displayFromDate = fromDate ?? "Choose Date";
  const displayToDate = toDate ?? "Choose Date";

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
    const stringId = id.toString();

    if (currentGenres.includes(stringId)) {
      const newGenres = currentGenres.filter((genre) => genre !== stringId);
      if (newGenres.length > 0) {
        url?.searchParams.set("with_genres", newGenres.join(","));
      } else {
        url?.searchParams.delete("with_genres");
      }
    } else {
      currentGenres.push(stringId);
      url?.searchParams.set("with_genres", currentGenres.join(","));
    }
    handleRoute();
  };

  const handleScoreFrom = (value: any) => {
    if (value[0] === 0) {
      url?.searchParams.delete("vote_average.gte");
    } else {
      url?.searchParams.set("vote_average.gte", value);
    }
    handleRoute();
  };

  const handleScoreTo = (value: any) => {
    if (value[0] === 0) {
      url?.searchParams.delete("vote_average.lte");
    } else {
      url?.searchParams.set("vote_average.lte", value);
    }
    handleRoute();
  };

  const handleUserScore = (value: any) => {
    url?.searchParams.set("vote_count.gte", value);
    handleRoute();
  };

  const handleSelectMonetization = (value: string) => {
    if (currentMonetizations.includes(value)) {
      const newMonetizations = currentMonetizations.filter(
        (monetization) => monetization !== value
      );
      if (newMonetizations.length > 0) {
        url?.searchParams.set(
          "with_watch_monetization_types",
          newMonetizations.join(",")
        );
      } else {
        url?.searchParams.delete("with_watch_monetization_types");
      }
    } else {
      currentMonetizations.push(value);
      url?.searchParams.set(
        "with_watch_monetization_types",
        currentMonetizations.join(",")
      );
    }
    handleRoute();
  };

  return (
    <div className="w-[90%] md:w-[17rem] md:border md:shadow-lg rounded-lg p-5">
      <div className="relative">
        <h1 className="text-2xl">{displayHeading()}</h1>
      </div>
      <Accordion type="multiple" className="w-full" defaultValue={["item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Sort</AccordionTrigger>
          <AccordionContent>
            <p className="py-2">Sort Results By</p>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder={sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.name} value={option.value}>
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
            <p className="text-md py-2">Availabilities</p>
            <div className="space-y-5">
              {monetizationOptions.map((option) => (
                <div key={option.name} className="flex items-center gap-1">
                  <Checkbox
                    id={option.name}
                    defaultChecked={currentMonetizations.includes(option.value)}
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
            <p className="text-md py-2">Release Dates</p>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-5">
                  <p className="w-12">From:</p>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between w-full"
                  >
                    <p>{displayFromDate}</p>
                    <CalendarIcon />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <Calendar
                  mode="single"
                  selected={fromDate as any}
                  onSelect={(date) => handleFromDate(date!)}
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
                    <p>{displayToDate}</p>
                    <CalendarIcon />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <Calendar
                  mode="single"
                  selected={toDate as any}
                  onSelect={(date) => handleToDate(date!)}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
            <p className="text-md py-2">Genres</p>
            <div>
              <ul className="flex flex-wrap gap-2 items-center">
                {isLoading ? (
                  <GenresLoader />
                ) : (
                  genreList.map((genre) => (
                    <li
                      key={genre.id}
                      onClick={() => handleSelectGenre(genre.id)}
                      className={classNames({
                        "rounded-full border border-gray-300 px-3 py-1 cursor-pointer duration-200":
                          true,
                        "bg-black text-white": currentGenres?.includes(
                          genre.id.toString()
                        ),
                      })}
                    >
                      {genre.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md py-2">User Score</p>
              <p>From:</p>
              <Slider
                value={[Number(voteAvgFrom)!]}
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
                      "text-blue-600": Number(voteAvgFrom) === num,
                    })}
                  >
                    {num}
                  </span>
                ))}
              </div>
              <p>To:</p>
              <Slider
                value={[Number(voteAvgTo)!]}
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
                      "text-blue-600": Number(voteAvgTo) === num,
                    })}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <p className="py-2">Minimum User Votes</p>
            <Slider
              value={[Number(userVotes)!]}
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
                    "text-blue-600": Number(userVotes) === num,
                  })}
                >
                  {num}
                </span>
              ))}
            </div>
            <div>
              <p className="text-md py-2">Language</p>
              <Select value={language} onValueChange={handleLangChange}>
                <SelectTrigger>
                  <SelectValue placeholder={language} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {languages.map((language) => (
                      <SelectItem key={language.name} value={language.value}>
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
