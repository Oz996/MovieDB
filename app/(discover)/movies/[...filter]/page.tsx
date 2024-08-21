"use client";
import FilterMenu from "@/components/FilterMenu";
import MovieCard from "@/components/Cards/MovieCard";
import { getMovies } from "@/services/movies";
import { Movie, QueryData } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import MediaLoader from "@/components/Banner/components/MediaLoader";
import {
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";
import { Frown } from "lucide-react";
import NoResults from "@/components/NoResults";

export default function Movies({ params }: { params: { filter: string[] } }) {
  const [isLoading, setIsLoading] = useState(true);
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
      try {
        const res = await getMovies(queryData);
        setMovies(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
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
    <>
      {!isMobile && (
        <FilterMenu
          type="movie"
          params={params}
          queryData={queryData}
          setQueryData={setQueryData}
        />
      )}
      {isMobile && !filterMenu && (
        <FilterMenuButton onClick={handleFilterMenu}>Filters</FilterMenuButton>
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
      <DiscoverMediaDiv>
        {isLoading ? (
          <MediaLoader />
        ) : movies.length === 0 ? (
          <div className="col-span-2">
            <NoResults />
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </DiscoverMediaDiv>
    </>
  );
}
