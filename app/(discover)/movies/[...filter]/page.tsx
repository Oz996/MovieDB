"use client";
import FilterMenu from "../../components/FilterMenu";
import MovieCard from "@/components/Cards/MovieCard";
import { getMovies } from "@/services/movies";
import { Movie } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import {
  DiscoverContainer,
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import DiscoverMoviesPagination from "./components/DiscoverMoviesPagination";

export default function Movies({ params }: { params: { filter: string[] } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [url, setUrl] = useState<URL>();
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await getMovies(query);
        setMovies(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      setUrl(currentUrl);
    }
  }, []);

  return (
    <>
      <DiscoverContainer>
        {!isMobile && <FilterMenu type="movie" url={url!} params={params} />}

        {isMobile && (
          <Dialog>
            <DialogTrigger asChild>
              <FilterMenuButton>Filters</FilterMenuButton>
            </DialogTrigger>
            <DialogContent>
              <FilterMenu type="movie" url={url!} params={params} />
            </DialogContent>
          </Dialog>
        )}

        <DiscoverMediaDiv isLoading={isLoading} isEmpty={movies.length === 0}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </DiscoverMediaDiv>
      </DiscoverContainer>

      <DiscoverMoviesPagination
        query={query}
        setMovies={setMovies}
        resultLength={movies.length}
      />
    </>
  );
}
