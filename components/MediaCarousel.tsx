import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie as IMovie, Image as ImageType, Movie, Trailer } from "@/types";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMovieImages, getMovieVideos } from "@/services/movies";

interface props {
  movie: Movie;
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function MediaCarousel({ movie, videos, setVideos }: props) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerToDisplay, setTrailerToDisplay] = useState("");

  const [mediaRef, mediaEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (mediaEntry?.isIntersecting) {
      fetchVideos();
    }
  }, [mediaEntry]);

  const fetchVideos = async () => {
    if (!movie || videos.length > 0) return;
    try {
      const res = await getMovieVideos(movie.id);
      setVideos(res!);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const fetchImages = async () => {
    if (!movie || images.length > 0) return;
    try {
      const res = await getMovieImages(movie.id);
      setImages(res!);
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
  const imagesToDisplay = images?.slice(0, 20);

  return (
    <section ref={mediaRef} className="pb-10">
      <Tabs defaultValue="videos">
        <div className="w-full flex flex-col gap-5">
          <div className="flex items-center">
            <h2
              className="text-title font-semibold py-5 pr-5"
              onClick={fetchImages}
            >
              Media
            </h2>
            <TabsList>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="images" onMouseEnter={fetchImages}>
                Images
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="videos">
            <Carousel>
              <CarouselContent>
                {videos.length === 0 && <p className="pl-10"> No videos</p>}
                {videos?.map((video) => (
                  <CarouselItem
                    key={video.id}
                    className="pl-1 md:basis-1/4 lg:basis-1/3"
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
          </TabsContent>
          <TabsContent value="images">
            <Carousel>
              <CarouselContent>
                {imagesToDisplay.length === 0 && (
                  <p className="pl-10"> No images</p>
                )}
                {imagesToDisplay?.map((image) => (
                  <CarouselItem
                    key={image.file_path}
                    className="pl-1 md:basis-1/4 lg:basis-1/6"
                  >
                    <Image
                      src={`https://media.themoviedb.org/t/p/w220_and_h330_face${image.file_path}`}
                      alt="Poster"
                      width={150}
                      height={100}
                      className="rounded"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </div>
      </Tabs>
      <TrailerIframe
        play={playTrailer}
        trailer={trailerToDisplay!}
        handleClose={handleCloseTrailer}
      />
    </section>
  );
}
