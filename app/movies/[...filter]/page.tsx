"use client";
import FilterMenu from "@/components/FilterMenu";
import MovieCard from "@/components/Cards/MovieCard";
import { Button } from "@/components/ui/button";
import { getMovies } from "@/services/movies";
import { Movie, QueryData, Result } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

export default function Movies({ params }: { params: { filter: string[] } }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterMenu, setFilterMenu] = useState(false);
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

  const handleFilterMenu = () => {
    setFilterMenu(!filterMenu);
    const dialogOpen = dialogRef.current?.hasAttribute("open");
    if (dialogOpen) dialogRef.current?.close();
    else dialogRef.current?.showModal();
  };

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const dialogRef = useRef<HTMLDialogElement>(null);
  console.log("queryData", queryData);

  return (
    <section className="pt-24 container">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {!isMobile && (
          <FilterMenu
            type="movie"
            params={params}
            queryData={queryData}
            setQueryData={setQueryData}
          />
        )}
        {isMobile && !filterMenu && (
          <Button
            className="bg-black text-white text-lg rounded-full fixed bottom-5 left-5 px-10"
            onClick={handleFilterMenu}
          >
            Filters
          </Button>
        )}
        <dialog ref={dialogRef} className="fixed top-0">
          {isMobile && filterMenu && (
            <FilterMenu
              type="movie"
              params={params}
              queryData={queryData}
              setQueryData={setQueryData}
              handleFilterMenu={handleFilterMenu}
            />
          )}
        </dialog>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 sm:col-span-3">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
