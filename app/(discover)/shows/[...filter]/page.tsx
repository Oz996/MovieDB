"use client";
import FilterMenu from "../../components/FilterMenu";
import TvShowCard from "@/components/Cards/TvShowCard";
import { getTvShows } from "@/services/tvShows";
import { QueryData, TvShow } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import {
  DiscoverContainer,
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DiscoverPagination from "../../components/DiscoverPagination";
import { useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await getTvShows(queryData, currentPage);
        setTvShows(res);
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
      <DiscoverContainer>
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
        <DiscoverMediaDiv isLoading={isLoading} isEmpty={tvShows.length === 0}>
          {tvShows?.map((tvShow) => (
            <TvShowCard key={tvShow.id} tvShow={tvShow} />
          ))}
        </DiscoverMediaDiv>
      </DiscoverContainer>
      <DiscoverPagination
        type="shows"
        params={params}
        currentPage={currentPage}
      />
    </>
  );
}
