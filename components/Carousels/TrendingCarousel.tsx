"use client";
import { getAllTrending } from "@/services/all";
import { Result } from "@/types";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@uidotdev/usehooks";
import LoaderCarousel from "./LoaderCarousel";
import CarouselCard from "./CarouselCard";

export default function TrendingCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState<Result[] | undefined>([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getAllTrending(trendingTime);
        setTrending(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, [trendingTime]);

  const handleSelectChange = (type: string) => {
    setTrendingTime(type);
  };

  if (isLoading) return <LoaderCarousel />;
  return (
    <section className="pt-12 px-5 container">
      <Tabs defaultValue="today">
        <div className="w-full flex max-sm:flex-col items-center gap-5">
          <h2 className="text-xl font-semibold">Trending</h2>
          {isMobile ? (
            <Select value={trendingTime} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder={trendingTime} />
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </SelectTrigger>
            </Select>
          ) : (
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
          )}
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
  );
}
