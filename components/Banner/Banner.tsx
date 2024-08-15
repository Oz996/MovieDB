"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Movie, Trailer, TvShow } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { getMovieVideos } from "@/services/movies";
import TrailerIframe from "../TrailerIframe";
import BannerLoader from "./components/BannerLoader";
import { useMediaQuery } from "@uidotdev/usehooks";
import { getTvShowVideos } from "@/services/tvShows";
import { filterByTrailers, handleDisplayImage } from "@/lib/utils";
import MovieDetails from "./components/MovieDetails";
import TvShowDetails from "./components/TvShowDetails";

interface props {
  movie?: Movie;
  tvShow?: TvShow;
  videos: Trailer[];
  isLoading: boolean;
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function Banner({
  movie,
  tvShow,
  videos,
  isLoading,
  setVideos,
}: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  const image = movie?.poster_path || tvShow?.poster_path;
  const backdrop = movie?.backdrop_path || tvShow?.backdrop_path;

  console.log("tvtv", tvShow);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const fetchVideos = async () => {
    try {
      if (movie) {
        const res = await getMovieVideos(movie?.id);
        const trailers = filterByTrailers(res!);
        setVideos(trailers);
      } else if (tvShow) {
        const res = await getTvShowVideos(tvShow?.id);
        const trailers = filterByTrailers(res!);
        setVideos(trailers);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleShowTrailer = () => {
    setPlayTrailer(true);
    if (videos?.length === 0) {
      fetchVideos();
    }
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  console.log("current movie", movie);

  const imageSize = () => {
    if (isMobile) {
      return 400;
    } else {
      return 300;
    }
  };

  if (isLoading) return <BannerLoader />;

  return (
    <section className="pt-16">
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop}")`,
        }}
        className="md:h-[32rem] flex items-center justify-center w-full relative before:bg-black/60 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        <div className="z-20 flex max-md:flex-col gap-10 text-white container max-md:pb-5">
          <Image
            width={imageSize()}
            height={imageSize()}
            src={handleDisplayImage("w1280", image!)}
            alt="Movie poster"
            className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
          />
          {movie ? (
            <MovieDetails
              title={movie?.title!}
              release={movie?.release_date}
              genres={movie?.genres!}
              runtime={movie?.runtime!}
              tagline={movie?.tagline!}
              overview={movie?.overview!}
              crew={movie?.credits.crew!}
              rating={Math.ceil(movie?.vote_average! * 10)}
              handleShowTrailer={handleShowTrailer}
            />
          ) : (
            <TvShowDetails
              title={tvShow?.name!}
              first_air_date={tvShow?.first_air_date!}
              last_air_date={tvShow?.last_air_date!}
              genres={tvShow?.genres!}
              in_production={tvShow?.in_production!}
              tagline={tvShow?.tagline!}
              overview={tvShow?.overview!}
              crew={tvShow?.created_by!}
              rating={Math.ceil(tvShow?.vote_average! * 10)}
              handleShowTrailer={handleShowTrailer}
            />
          )}
        </div>
      </div>
      <TrailerIframe
        play={playTrailer}
        trailer={videos[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </section>
  );
}
