"use client";
import { useState } from "react";
import { Movie } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { filterByTrailers, handleDisplayImage } from "@/lib/utils";
import MovieDetails from "./MovieDetails";
import BannerContainer from "../../../../../components/Banner/Banner";
import TrailerModal from "../../../components/TrailerModal";
import { toast } from "sonner";

interface props {
  movie: Movie;
}

export default function MovieBanner({ movie }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  console.log("current movie", movie);

  const trailers = filterByTrailers(movie.videos.results);

  const handleShowTrailer = () => {
    if (trailers.length === 0) {
      return toast.error("No trailer found");
    }
    setPlayTrailer(true);
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  return (
    <BannerContainer background={movie.backdrop_path}>
      <div className="w-full col-span-1">
        <Image
          priority
          width={300}
          height={300}
          src={handleDisplayImage("w1280", movie.poster_path)}
          alt="Movie poster"
          className="rounded lg:rounded-lg w-full max-md:max-w-[20rem] max-sm:mx-auto object-cover hidden md:block"
        />
        <div className="w-full relative md:hidden">
          <Image
            priority
            src={handleDisplayImage(
              "w1000_and_h450_multi_faces",
              movie.backdrop_path
            )}
            alt="Movie poster"
            width={1000}
            height={450}
            className="rounded"
          />
          {/* <div className="absolute -left-2 -top-3 -bottom-2 -right-2 bg-black/80 rounded " /> */}
        </div>
      </div>
      <MovieDetails movie={movie} handleShowTrailer={handleShowTrailer} />
      <TrailerModal
        play={playTrailer}
        trailer={trailers[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
