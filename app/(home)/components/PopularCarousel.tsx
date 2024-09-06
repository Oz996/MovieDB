"use client";
import { Movie } from "@/types";
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
import { getMovieList } from "@/services/movies";
import LoaderCarousel from "@/components/Carousels/LoaderCarousel";
import CarouselCard from "@/components/Carousels/CarouselCard";

interface props {
  initialData: Movie[];
}

export default function PopularCarousel({ initialData }: props) {
  const [isLoading, setIsLoading] = useState(true);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [popularType, setPopularType] = useState("now_playing");

  useEffect(() => {
    const fetchPopular = async () => {
      if (popularType !== "now_playing") {
        setIsLoading(true);
        try {
          const data = await getMovieList(popularType);
          setPopular(data);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPopular(initialData);
        setIsLoading(false);
      }
    };
    fetchPopular();
  }, [popularType]);

  const handleSelectChange = (type: string) => {
    setPopularType(type);
  };

  return (
    <section className="pt-12 px-5 container">
      <Tabs
        value={popularType}
        onValueChange={(value) => setPopularType(value)}
      >
        <div className="w-full flex max-sm:flex-col items-center gap-5">
          <h2 className="text-xl font-semibold">What&apos;s Popular</h2>

          <div className="md:hidden w-full">
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
          </div>

          <TabsList className="hidden md:inline">
            <TabsTrigger value="now_playing" className="text-md">
              Now Playing
            </TabsTrigger>
            <TabsTrigger value="top_rated" className="text-md">
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="text-md">
              Upcoming
            </TabsTrigger>
          </TabsList>
        </div>

        {isLoading ? (
          <LoaderCarousel />
        ) : (
          <>
            <TabsContent value="now_playing">
              <Carousel className="rounded-xl pl-2">
                <CarouselContent className="-ml-1">
                  {popular.map((movie) => (
                    <CarouselCard
                      type="movie"
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      date={movie.release_date}
                      image={movie.poster_path}
                    />
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
            <TabsContent value="top_rated">
              <Carousel>
                <CarouselContent className="-ml-1">
                  {popular.map((movie) => (
                    <CarouselCard
                      type="movie"
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      date={movie.release_date}
                      image={movie.poster_path}
                    />
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
            <TabsContent value="upcoming">
              <Carousel>
                <CarouselContent className="-ml-1">
                  {popular.map((movie) => (
                    <CarouselCard
                      type="movie"
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      date={movie.release_date}
                      image={movie.poster_path}
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
