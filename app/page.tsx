"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Result } from "@/types";
import { getAllTrending } from "@/services/all";
import CarouselCard from "@/components/CarouselCard";
import { getMovieList } from "@/services/movies";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { getTvShows } from "@/services/tvShows";

export default function Home() {
  const [hasRendered, setHasRendered] = useState(false);
  const [trending, setTrending] = useState<Result[] | undefined>([]);
  const [trendingTime, setTrendingTime] = useState("day");

  const [popular, setPopular] = useState<Result[] | undefined>([]);
  const [popularType, setPopularType] = useState("now_playing");

  const [shows, setShows] = useState<Result[] | undefined>([]);
  const [showsType, setshowsType] = useState("free");

  const [popularRef, popularEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  const [showsRef, showsEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    setTimeout(() => {
      setHasRendered(true);
    }, 500);
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getAllTrending(trendingTime);
      setTrending(data);
    };
    fetchTrending();
  }, [trendingTime]);

  useEffect(() => {
    const fetchPopular = async () => {
      const data = await getMovieList(popularType);
      setPopular(data);
    };
    fetchPopular();
  }, [popularType]);

  useEffect(() => {
    if (showsEntry?.isIntersecting && hasRendered) {
      const fetchShows = async () => {
        const data = await getTvShows(showsType);
        setShows(data);
      };
      fetchShows();
    }
  }, [showsType, showsEntry, hasRendered]);

  console.log("is yes yes", popularEntry);

  return (
    <>
      <section className="pt-24">
        <div className="w-full h-[8rem] p-10 bg-black flex flex-col justify-center text-white rounded">
          <h2 className="text-4xl">Welcome.</h2>
          <p className="text-2xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
      </section>

      <section className="pt-12 px-5">
        <Tabs defaultValue="today">
          <div className="w-full flex items-center gap-5">
            <h2 className="text-xl font-semibold">Trending</h2>
            <TabsList>
              <TabsTrigger
                value="today"
                className="text-md"
                onClick={() => setTrendingTime("day")}
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="text-md"
                onClick={() => setTrendingTime("week")}
              >
                This Week
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="today">
            <Carousel>
              <CarouselContent className="-ml-1">
                {trending?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="week">
            <Carousel>
              <CarouselContent className="-ml-1">
                {trending?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
      </section>

      <section className="pt-12 px-5" ref={popularRef}>
        <Tabs defaultValue="now_playing">
          <div className="w-full flex items-center gap-5">
            <h2 className="text-xl font-semibold">What's Popular</h2>
            <TabsList>
              <TabsTrigger
                value="now_playing"
                className="text-md"
                onClick={() => setPopularType("now_playing")}
              >
                Now Playing
              </TabsTrigger>
              <TabsTrigger
                value="top_rated"
                className="text-md"
                onClick={() => setPopularType("top_rated")}
              >
                Top Rated
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="text-md"
                onClick={() => setPopularType("upcoming")}
              >
                Upcoming
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="now_playing">
            <Carousel>
              <CarouselContent className="-ml-1">
                {popular?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="top_rated">
            <Carousel>
              <CarouselContent className="-ml-1">
                {popular?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="upcoming">
            <Carousel>
              <CarouselContent className="-ml-1">
                {popular?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
      </section>

      <section className="pt-12 px-5" ref={showsRef}>
        <Tabs defaultValue="free">
          <div className="w-full flex items-center gap-5">
            <h2 className="text-xl font-semibold">Discover Shows</h2>
            <TabsList>
              <TabsTrigger
                value="free"
                className="text-md"
                onClick={() => setshowsType("free")}
              >
                Free
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className="text-md"
                onClick={() => setshowsType("rent")}
              >
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="buy"
                className="text-md"
                onClick={() => setshowsType("buy")}
              >
                Buy
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="free">
            <Carousel>
              <CarouselContent className="-ml-1">
                {shows?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="rent">
            <Carousel>
              <CarouselContent className="-ml-1">
                {shows?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="buy">
            <Carousel>
              <CarouselContent className="-ml-1">
                {shows?.map((item) => (
                  <CarouselCard key={item.id} item={item} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
