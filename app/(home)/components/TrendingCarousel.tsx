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
import LoaderCarousel from "@/components/Carousels/LoaderCarousel";
import CarouselCard from "@/components/Carousels/CarouselCard";

interface props {
  initialData: Result[];
}

export default function TrendingCarousel({ initialData }: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState<Result[]>(initialData);
  const [trendingTime, setTrendingTime] = useState("day");

  useEffect(() => {
    const fetchTrending = async () => {
      if (trendingTime !== "day") {
        setIsLoading(true);
        try {
          const data = await getAllTrending(trendingTime);
          setTrending(data);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setTrending(initialData);
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
      <Tabs
        value={trendingTime}
        onValueChange={(value) => setTrendingTime(value)}
      >
        <div className="w-full flex max-sm:flex-col items-center gap-5">
          <h2 className="text-xl font-semibold">Trending</h2>

          <div className="md:hidden w-full">
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
          </div>

          <TabsList className="hidden md:inline">
            <TabsTrigger value="day" className="text-md">
              Today
            </TabsTrigger>
            <TabsTrigger value="week" className="text-md">
              This Week
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="day">
          <Carousel>
            <CarouselContent className="-ml-1">
              {trending.map((item) => (
                <CarouselCard
                  type={item.media_type}
                  key={item.id}
                  id={item.id}
                  title={item.title ?? item.name!}
                  date={item.release_date ?? item.first_air_date!}
                  image={item.poster_path!}
                />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsContent>
        <TabsContent value="week">
          <Carousel>
            <CarouselContent className="-ml-1">
              {trending.map((item) => (
                <CarouselCard
                  type={item.media_type}
                  key={item.id}
                  id={item.id}
                  title={item.title ?? item.name!}
                  date={item.release_date ?? item.first_air_date!}
                  image={item.poster_path!}
                />
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
