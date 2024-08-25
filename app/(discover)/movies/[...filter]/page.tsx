"use client";
import FilterMenu from "@/components/FilterMenu";
import MovieCard from "@/components/Cards/MovieCard";
import { getMovies } from "@/services/movies";
import { Movie, QueryData } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import MediaLoader from "@/components/Banner/components/MediaLoader";
import {
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";
import NoResults from "@/components/NoResults";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { getBaseUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DiscoverPagination from "../../components/DiscoverPagination";

export default function Movies({ params }: { params: { filter: string[] } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
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

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies(queryData, currentPage);
        setMovies(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [queryData, currentPage]);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <>
      {!isMobile && (
        <FilterMenu
          type="movie"
          params={params}
          queryData={queryData}
          setQueryData={setQueryData}
        />
      )}
      {isMobile && (
        <Dialog>
          <DialogTrigger asChild>
            <FilterMenuButton>Filters</FilterMenuButton>
          </DialogTrigger>
          <DialogContent>
            <FilterMenu
              type="movie"
              params={params}
              queryData={queryData}
              setQueryData={setQueryData}
            />
          </DialogContent>
        </Dialog>
      )}
      <DiscoverMediaDiv>
        {isLoading ? (
          <MediaLoader />
        ) : movies.length === 0 ? (
          <div className="col-span-2">
            <NoResults />
          </div>
        ) : (
          <>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            <DiscoverPagination
              type="movies"
              params={params}
              currentPage={currentPage}
            />
          </>
        )}
      </DiscoverMediaDiv>
    </>
  );
}
