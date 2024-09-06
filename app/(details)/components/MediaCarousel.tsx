import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageType, Trailer } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMovieImages } from "@/services/movies";
import { FaPlay } from "react-icons/fa6";
import LoaderCarousel from "../../../components/Carousels/LoaderCarousel";
import { getTvShowImages } from "@/services/tvShows";
import { fetchVideos } from "@/lib/utils";
import TrailerModal from "./TrailerModal";

interface props {
  id: string;
  type: "movie" | "tv";
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function MediaCarousel({ id, videos, type, setVideos }: props) {
  const [isLoading, setIsLoading] = useState(videos ? false : true);
  const [images, setImages] = useState<ImageType[]>([]);
  const [fetched, setFetched] = useState(false);
  const [mediaValue, setMediaValue] = useState("videos");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerToDisplay, setTrailerToDisplay] = useState("");

  const movie = type === "movie";
  const [mediaRef, mediaEntry] = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (mediaEntry?.isIntersecting && videos.length === 0 && !fetched) {
      fetchVideos(type, Number(id), setVideos, setIsLoading);
      setFetched(true);
    }
  }, [mediaEntry?.isIntersecting]);

  const fetchImages = async () => {
    if (images.length > 0) return;
    try {
      if (movie) {
        const res = await getMovieImages(id);
        setImages(res);
      } else {
        const res = await getTvShowImages(id);
        setImages(res);
      }
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

  if (isLoading)
    return (
      <section ref={mediaRef}>
        <LoaderCarousel />
      </section>
    );

  return (
    <section ref={mediaRef} className="py-10">
      <Tabs value={mediaValue} onValueChange={(value) => setMediaValue(value)}>
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
            {videos?.length === 0 ? (
              <p>No videos</p>
            ) : (
              <Carousel className="pr-6">
                <CarouselContent>
                  {videos?.map((video) => (
                    <CarouselItem
                      key={video.id}
                      className="flex-centered group"
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
                          className="rounded-lg object-cover"
                        />
                        <div className="size-12 bg-black/60 rounded-full absolute top-[45%] left-[45%] flex-centered">
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
            )}
          </TabsContent>
          <TabsContent value="images">
            {images?.length === 0 ? (
              <p> No images</p>
            ) : (
              <Carousel className="pr-6">
                <CarouselContent>
                  {imagesToDisplay?.map((image) => (
                    <CarouselItem
                      key={image.file_path}
                      className="flex-centered"
                    >
                      <Image
                        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${image.file_path}`}
                        alt="Poster"
                        width={150}
                        height={100}
                        className="rounded object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="max-md:mr-5" />
              </Carousel>
            )}
          </TabsContent>
        </div>
      </Tabs>
      <TrailerModal
        play={playTrailer}
        trailer={trailerToDisplay}
        handleClose={handleCloseTrailer}
      />
    </section>
  );
}
