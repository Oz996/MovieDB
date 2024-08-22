"use client";
import FilterMenu from "@/components/FilterMenu";
import TvShowCard from "@/components/Cards/TvShowCard";
import { getTvShows } from "@/services/tvShows";
import { QueryData, TvShow } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import MediaLoader from "@/components/Banner/components/MediaLoader";
import {
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";
import NoResults from "@/components/NoResults";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Shows({ params }: { params: { filter: string[] } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
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

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

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
      {isMobile && (
        <Dialog>
          <DialogTrigger asChild>
            <FilterMenuButton>Filters</FilterMenuButton>
          </DialogTrigger>
          <DialogContent>
            <FilterMenu
              type="tv"
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
        ) : tvShows.length == 0 ? (
          <div className="col-span-2">
            <NoResults />
          </div>
        ) : (
          tvShows?.map((tvShow) => (
            <TvShowCard key={tvShow.id} tvShow={tvShow} />
          ))
        )}
      </DiscoverMediaDiv>
    </>
  );
}
