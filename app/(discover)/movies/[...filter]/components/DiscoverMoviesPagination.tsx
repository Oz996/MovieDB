import { Button } from "@/components/ui/button";
import { getMovies } from "@/services/movies";
import { Movie } from "@/types";
import { useIntersectionObserver, useWindowScroll } from "@uidotdev/usehooks";
import { ArrowUp, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  resultLength: number;
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  query: string;
}

export default function DiscoverMoviesPagination({
  query,
  setMovies,
  resultLength,
}: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchMore, setFetchMore] = useState(false);
  const [{ y }, scrollTo] = useWindowScroll();
  const [page, setPage] = useState(2);

  const [ref, refEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (refEntry?.isIntersecting && fetchMore) {
      fetchMoreMovies();
    }
  }, [refEntry?.isIntersecting, fetchMore]);

  // displaying load more button if user applies a filter/sort and resetting page state
  useEffect(() => {
    setPage(2);
    setFetchMore(false);
  }, [query]);

  const fetchMoreMovies = async () => {
    setIsLoading(true);
    try {
      const data = await getMovies(query + `&page=${page}`);
      setMovies((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-md:pb-16 max-md:pt-6 lg:p-10 relative flex-centered flex-col">
      {!fetchMore && resultLength > 19 && (
        <Button
          onClick={() => setFetchMore(true)}
          className="text-2xl bg black"
        >
          Load more
        </Button>
      )}
      {(y as number) > 2000 && (
        <Button
          className="fixed bottom-16 left-6 md:left-[35%] bg-black p-2 rounded-full"
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
          <ArrowUp />
        </Button>
      )}
      {isLoading && fetchMore && <Loader2 size={40} className="animate-spin" />}
      <div ref={ref} className="absolute bottom-0 size-10 bg-transparent" />
    </div>
  );
}
