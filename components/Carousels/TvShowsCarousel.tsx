"use client";
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
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { getTvShowsDiscover } from "@/services/tvShows";
import LoaderCarousel from "./LoaderCarousel";
import CarouselCard from "./CarouselCard";
export default function TvShowsCarousel() {
  const [isLoading, setIsLoading] = useState(false);
  const [shows, setShows] = useState<Result[] | undefined>([]);
  const [showsType, setshowsType] = useState("free");
  const [hasRendered, setHasRendered] = useState(false);

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
    if (showsEntry?.isIntersecting && hasRendered) {
      setIsLoading(true);
      try {
        const fetchShows = async () => {
          const data = await getTvShowsDiscover(showsType);
          setShows(data);
        };
        fetchShows();
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [showsType, showsEntry?.isIntersecting, hasRendered]);

  const handleSelectChange = (type: string) => {
    setshowsType(type);
  };

  if (isLoading) return <LoaderCarousel />;

  return (
    <section className="pt-12 px-5 pb-5 container" ref={showsRef}>
      <Tabs defaultValue="free">
        <div className="w-full flex max-sm:flex-col items-center gap-5">
          <h2 className="text-xl font-semibold">Discover Shows</h2>

          <div className="md:hidden w-full">
            <Select value={showsType} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder={showsType} />
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>

          <TabsList className="hidden md:inline">
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
                <CarouselCard key={item.id} item={item} type="tv" />
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
                <CarouselCard key={item.id} item={item} type="tv" />
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
                <CarouselCard key={item.id} item={item} type="tv" />
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
