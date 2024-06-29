"use client";
import { getMovieDetails, getMovieVideos } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie, Trailer } from "@/types";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SideContent from "@/components/SideContent";
import "react-circular-progressbar/dist/styles.css";
import ReviewSection from "@/components/ReviewSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Image from "next/image";
import TrailerIframe from "@/components/TrailerIframe";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerToDisplay, setTrailerToDisplay] = useState("");
  const [movie, setMovie] = useState<IMovie>();
  const [videos, setVideos] = useState<Trailer[] | undefined>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(Number(params.id));
        setMovie(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [params]);

  const [mediaRef, mediaEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (mediaEntry?.isIntersecting && videos?.length === 0) {
      fetchVideos();
    }
  }, [mediaEntry]);

  const fetchVideos = async () => {
    if (!movie) return null;
    try {
      const res = await getMovieVideos(movie?.id);
      setVideos(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  const handleShowTrailer = (key: string) => {
    setPlayTrailer(true);
    setTrailerToDisplay(key);
  };

  const reviews = movie?.reviews.results;

  return (
    <section className="flex flex-col">
      <Banner movie={movie!} videos={videos!} setVideos={setVideos} />
      <section className="grid grid-cols-4">
        <div className="col-span-3 space-y-5">
          <PersonCarousel movie={movie!} />
          <ReviewSection reviews={reviews!} />
          <section ref={mediaRef}>
            <div className="flex gap-10">
              <div className="flex gap-5 font-semibold items-center">
                <h2 className="text-title font-semibold py-5">Media</h2>
                <Tabs defaultValue="videos">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                  </TabsList>
                  <TabsContent value="videos">
                    <div>
                      <Carousel>
                        <CarouselContent>
                          {videos?.map((video) => (
                            <CarouselItem
                              key={video.id}
                              className="pr-6 md:basis-1/4 lg:basis-1/3"
                            >
                              <button
                                className="w-full h-full"
                                onClick={() => handleShowTrailer(video.key)}
                              >
                                <Image
                                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                  alt={video.name}
                                  width={320}
                                  height={180}
                                  className="rounded-lg"
                                />
                              </button>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <TrailerIframe
              play={playTrailer}
              trailer={trailerToDisplay!}
              handleClose={handleCloseTrailer}
            />
          </section>
        </div>
        <SideContent movie={movie!} />
      </section>
    </section>
  );
}
