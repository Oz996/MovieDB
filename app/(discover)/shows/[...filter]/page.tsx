"use client";
import FilterMenu from "../../components/FilterMenu";
import TvShowCard from "@/components/Cards/TvShowCard";
import { getTvShows } from "@/services/tvShows";
import { TvShow } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import {
  DiscoverContainer,
  DiscoverMediaDiv,
  FilterMenuButton,
} from "../../components/DiscoverContainer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import DiscoverShowsPagination from "./components/DiscoverShowsPagination";

export default function Shows({ params }: { params: { filter: string[] } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [url, setUrl] = useState<URL>();

  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await getTvShows(query);
        setTvShows(res);
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

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <>
      <DiscoverContainer>
        {!isMobile && <FilterMenu type="tv" url={url!} params={params} />}

        {isMobile && (
          <Dialog>
            <DialogTrigger asChild>
              <FilterMenuButton>Filters</FilterMenuButton>
            </DialogTrigger>
            <DialogContent>
              <FilterMenu type="tv" url={url!} params={params} />
            </DialogContent>
          </Dialog>
        )}

        <DiscoverMediaDiv isLoading={isLoading} isEmpty={tvShows.length === 0}>
          {tvShows?.map((tvShow) => (
            <TvShowCard key={tvShow.id} tvShow={tvShow} />
          ))}
        </DiscoverMediaDiv>
      </DiscoverContainer>

      <DiscoverShowsPagination query={query} setTvShows={setTvShows} />
    </>
  );
}
