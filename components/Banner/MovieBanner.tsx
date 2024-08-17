"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Movie, Trailer } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { getMovieVideos } from "@/services/movies";
import TrailerIframe from "../TrailerIframe";
import { useMediaQuery } from "@uidotdev/usehooks";
import { filterByTrailers, handleDisplayImage } from "@/lib/utils";
import MovieDetails from "./components/MovieDetails";
import BannerContainer from "./Banner";

interface props {
  movie: Movie;
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function MovieBanner({ movie, videos, setVideos }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  console.log("current movie", movie);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const fetchVideos = async () => {
    try {
      const res = await getMovieVideos(movie.id);
      const trailers = filterByTrailers(res);
      setVideos(trailers);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleShowTrailer = () => {
    setPlayTrailer(true);
    if (videos.length === 0) {
      fetchVideos();
    }
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  const imageSize = () => {
    if (isMobile) {
      return 400;
    } else {
      return 300;
    }
  };

  return (
    <BannerContainer backdrop_path={movie.backdrop_path}>
      <Image
        width={imageSize()}
        height={imageSize()}
        src={handleDisplayImage("w1280", movie.poster_path)}
        alt="Movie poster"
        className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
      />
      <MovieDetails
        title={movie.title}
        release={movie.release_date}
        genres={movie.genres}
        runtime={movie.runtime}
        tagline={movie.tagline}
        overview={movie.overview}
        crew={movie.credits.crew}
        rating={Math.ceil(movie.vote_average * 10)}
        handleShowTrailer={handleShowTrailer}
      />
      <TrailerIframe
        play={playTrailer}
        trailer={videos[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
