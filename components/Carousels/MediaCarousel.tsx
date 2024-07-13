import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie, Image as ImageType, Trailer } from "@/types";
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
import { FaPlay } from "react-icons/fa6";
import LoaderCarousel from "./LoaderCarousel";
import { getTvShowImages, getTvShowVideos } from "@/services/tvShows";

interface props {
  id: string;
  type: "movie" | "tv";
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function MediaCarousel({ id, videos, type, setVideos }: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerToDisplay, setTrailerToDisplay] = useState("");

  const movie = type === "movie";
  const tvShow = type === "tv";

  const [mediaRef, mediaEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  console.log("media", mediaEntry);
  useEffect(() => {
    if (mediaEntry?.isIntersecting) {
      fetchVideos();
    }
  }, [mediaEntry?.isIntersecting]);

  const fetchVideos = async () => {
    if (videos?.length > 0) return;
    setIsLoading(true);
    try {
      if (movie) {
        const res = await getMovieVideos(id);
        setVideos(res!);
      } else if (tvShow) {
        const res = await getTvShowVideos(id);
        setVideos(res!);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImages = async () => {
    if (images.length > 0) return;
    try {
      if (movie) {
        const res = await getMovieImages(id);
        setImages(res!);
      } else if (tvShow) {
        const res = await getTvShowImages(id);
        setImages(res!);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
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

  if (isLoading) return <LoaderCarousel />;

  return (
    <section ref={mediaRef} className="py-10">
      <Tabs defaultValue="videos">
        <div className="w-full flex flex-col gap-5">
          <div className="flex items-center">
            <h2 className="text-title font-semibold pr-5">Media</h2>
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
                {videos?.length === 0 && <p className="pl-10"> No videos</p>}
                {videos?.map((video) => (
                  <CarouselItem
                    key={video.id}
                    className="basis-1/2 md:basis-1/3 pr-6 group"
                  >
                    <button
                      className="w-full h-full relative"
                      onClick={() => handleShowTrailer(video.key)}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        width={320}
                        height={180}
                        className="rounded-lg"
                      />
                      <div className="size-12 bg-black/60 rounded-full absolute top-[45%] left-[45%] flex items-center justify-center">
                        <FaPlay
                          size={18}
                          className="text-white group-hover:text-white/80 duration-300"
                        />
                      </div>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext className="max-md:mr-5" />
            </Carousel>
          </TabsContent>
          <TabsContent value="images">
            <Carousel>
              <CarouselContent>
                {imagesToDisplay?.length === 0 && (
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
              <CarouselNext className="max-md:mr-5" />
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
