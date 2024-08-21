"use client";
import FilterMenu from "@/components/FilterMenu";
import TvShowCard from "@/components/Cards/TvShowCard";
import { getTvShows } from "@/services/tvShows";
import { QueryData, TvShow } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import MediaLoader from "@/components/Banner/components/MediaLoader";
import {
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";

export default function Shows({ params }: { params: { filter: string[] } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tvShows, setTvShows] = useState<TvShow[] | undefined>([]);
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
        const res = await getTvShows(queryData);
        setTvShows(res);
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

  return (
    <>
      {!isMobile && (
        <FilterMenu
          type="tv"
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
            type="tv"
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
        ) : (
          tvShows?.map((tvShow) => (
            <TvShowCard key={tvShow.id} tvShow={tvShow} />
          ))
        )}
      </DiscoverMediaDiv>
    </>
  );
}
