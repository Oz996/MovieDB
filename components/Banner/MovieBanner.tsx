"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Movie, Trailer } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { fetchVideos, handleDisplayImage } from "@/lib/utils";
import MovieDetails from "./components/MovieDetails";
import BannerContainer from "./Banner";
import TrailerModal from "../TrailerModal";

interface props {
  movie: Movie;
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function MovieBanner({ movie, videos, setVideos }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  console.log("current movie", movie);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const handleShowTrailer = () => {
    setPlayTrailer(true);
    if (videos.length === 0) {
      fetchVideos("movie", movie?.id, setVideos);
    }
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  return (
    <BannerContainer backdrop_path={movie.backdrop_path}>
      <Image
        width={isMobile ? 400 : 300}
        height={isMobile ? 400 : 300}
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
      <TrailerModal
        play={playTrailer}
        trailer={videos[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
