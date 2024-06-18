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
import { motion } from "framer-motion";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import CarouselCard from "@/components/CarouselCard";

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
                {trending.map((item, index) => (
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
                {trending.map((item, index) => (
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
