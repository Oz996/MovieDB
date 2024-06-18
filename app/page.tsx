"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Result } from "@/types";
import { getAllTrending } from "@/services/all";
import Image from "next/image";

export default function Home() {
  const [trending, setTrending] = useState<Result[]>([]);
  const [trendingTime, setTrendingTime] = useState("day");

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getAllTrending(trendingTime);
      setTrending(data);
    };
    fetchTrending();
  }, [trendingTime]);

  return (
    <>
      <section className="pt-24 px-[5rem]">
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
                {trending.map((item, index) => {
                  const title = item?.name || item?.title;
                  const date = item?.first_air_date || item?.release_date;
                  const image = item.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
                    : item.profile_path
                    ? `https://image.tmdb.org/t/p/w342/${item.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                  return (
                    <CarouselItem
                      key={item.id}
                      className="pl-1 md:basis-1/2 lg:basis-1/6"
                    >
                      <div className="p-1">
                        <div className="space-y-5">
                          <div className="flex items-centerjustify-center">
                            <Image
                              className="rounded-lg"
                              src={image}
                              width={150}
                              height={150}
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{title}</p>
                            <p className="text-gray-500">{date}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
          <TabsContent value="week">
            <Carousel>
              <CarouselContent className="-ml-1">
                {trending.map((item, index) => {
                  const title = item?.name || item?.title;
                  const date = item?.first_air_date || item?.release_date;
                  const image = item.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
                    : item.profile_path
                    ? `https://image.tmdb.org/t/p/w342/${item.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                  return (
                    <CarouselItem
                      key={item.id}
                      className="pl-1 md:basis-1/2 lg:basis-1/6"
                    >
                      <div className="p-1">
                        <div className="space-y-5">
                          <div className="flex items-centerjustify-center">
                            <Image
                              className="rounded-lg"
                              src={image}
                              width={150}
                              height={150}
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{title}</p>
                            <p className="text-gray-500">{date}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
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
