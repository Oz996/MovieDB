"use client";
import { Result } from "@/types";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "../CarouselCard";
import { getMovieList } from "@/services/movies";
import { useIntersectionObserver, useMediaQuery } from "@uidotdev/usehooks";

export default function PopularCarousel() {
  const [popular, setPopular] = useState<Result[] | undefined>([]);
  const [popularType, setPopularType] = useState("now_playing");
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const [popularRef, popularEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    const fetchPopular = async () => {
      const data = await getMovieList(popularType);
      setPopular(data);
    };
    fetchPopular();
  }, [popularType]);

  const handleSelectChange = (type: string) => {
    setPopularType(type);
  };

  return (
    <section className="pt-12 px-5" ref={popularRef}>
      <Tabs defaultValue="now_playing">
        <div className="w-full flex max-sm:flex-col items-center gap-5">
          <h2 className="text-xl font-semibold">What's Popular</h2>
          {isMobile ? (
            <Select value={popularType} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder={popularType} />
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="now_playing">Now Playing</SelectItem>
                    <SelectItem value="top_rated">Top Rated</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </SelectTrigger>
            </Select>
          ) : (
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
          )}
        </div>
        <TabsContent value="now_playing">
          <Carousel className="bg-slate-100 rounded-xl pl-2">
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
  );
}
