"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Movie, Trailer } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { fetchVideos, handleDisplayImage } from "@/lib/utils";
import MovieDetails from "./MovieDetails";
import BannerContainer from "../../../../../components/Banner/Banner";
import TrailerModal from "../../../../../components/TrailerModal";

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
    <BannerContainer background={movie.backdrop_path}>
      <div className="w-full col-span-1">
        <Image
          width={isMobile ? 400 : 300}
          height={isMobile ? 400 : 300}
          src={handleDisplayImage("w1280", movie.poster_path)}
          alt="Movie poster"
          className="z-20 rounded lg:rounded-lg w-full max-md:max-w-[20rem] max-sm:mx-auto"
        />
      </div>
      <MovieDetails movie={movie} handleShowTrailer={handleShowTrailer} />
      <TrailerModal
        play={playTrailer}
        trailer={videos[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
