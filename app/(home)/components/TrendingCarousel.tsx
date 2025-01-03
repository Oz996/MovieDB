"use client";
import { getAllTrending } from "@/services/all";
import { Media } from "@/types";
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
import { dateToDisplay, imageToDisplay, titleToDisplay } from "@/lib/utils";

interface props {
  initialData: Media[];
}

export default function TrendingCarousel({ initialData }: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState<Media[]>(initialData);
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

        {isLoading ? (
          <LoaderCarousel />
        ) : (
          <>
            <TabsContent value="day">
              <Carousel>
                <CarouselContent className="-ml-1">
                  {trending.map((item) => (
                    <CarouselCard
                      type={item.media_type!}
                      key={item.id}
                      id={item.id}
                      title={titleToDisplay(item)}
                      date={dateToDisplay(item)!}
                      image={imageToDisplay(item)}
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
                      type={item.media_type!}
                      key={item.id}
                      id={item.id}
                      title={titleToDisplay(item)}
                      date={dateToDisplay(item)!}
                      image={imageToDisplay(item)}
                    />
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
          </>
        )}
      </Tabs>
    </section>
  );
}
