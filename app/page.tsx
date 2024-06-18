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
import { getAllTrending, getBackgroundImages } from "@/services/all";
import CarouselCard from "@/components/CarouselCard";
import { getMovieList } from "@/services/movies";
import Image from "next/image";

export default function Home() {
  const [trending, setTrending] = useState<Result[] | undefined>([]);
  const [trendingTime, setTrendingTime] = useState("day");

  const [popular, setPopular] = useState<Result[] | undefined>([]);
  const [popularType, setPopularType] = useState("now_playing");

  const [image, setImage] = useState([]);

  console.log("popop", popular);
  console.log("trended", trending);

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
    const fetchImages = async () => {
      const image = await getBackgroundImages();
      setImage(image);
    };
    fetchImages();
  }, []);

  console.log("current image", image);

  return (
    <>
      <section className="pt-24 px-[5rem]">
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w780${image}')`,
          }}
          className="w-full h-[30rem] p-10 bg-black bg-opacity-40 text-white rounded bg-cover bg-blend-overlay"
        >
          <h2 className="text-4xl">Welcome.</h2>
          <p className="text-2xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
      </section>

      <section className="pt-10 px-[5rem]">
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

      <section className="pt-10 px-[5rem]">
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
    </>
  );
}
