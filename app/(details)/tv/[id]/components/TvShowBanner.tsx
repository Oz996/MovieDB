"use client";
import { useState } from "react";
import { TvShow } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { filterByTrailers, handleDisplayImage } from "@/lib/utils";
import BannerContainer from "../../../../../components/Banner/Banner";
import TvShowDetails from "./TvShowDetails";
import TrailerModal from "../../../components/TrailerModal";
import { toast } from "sonner";

interface props {
  tvShow: TvShow;
}

export default function TvShowBanner({ tvShow }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  console.log("current tvShow", tvShow);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const handleShowTrailer = () => {
    if (tvShow.videos.results.length === 0) {
      return toast.error("No trailer found");
    }
    setPlayTrailer(true);
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  return (
    <BannerContainer background={tvShow.backdrop_path}>
      <div className="w-full col-span-1">
        <Image
          width={isMobile ? 400 : 300}
          height={isMobile ? 400 : 300}
          src={handleDisplayImage("w1280", tvShow.poster_path)}
          alt="Tv show poster"
          className="z-20 rounded lg:rounded-lg w-full max-md:max-w-[20rem] max-sm:mx-auto object-cover hidden md:block"
        />
        <div className="w-full relative md:hidden">
          <Image
            src={handleDisplayImage(
              "w1000_and_h450_multi_faces",
              tvShow.backdrop_path
            )}
            alt="Tv show poster"
            width={1000}
            height={450}
            className="rounded z-50"
          />
          {/* <div className="absolute -left-2 -top-3 -bottom-2 -right-2 bg-black/80 rounded z-40" /> */}
        </div>
      </div>
      <TvShowDetails tvShow={tvShow} handleShowTrailer={handleShowTrailer} />
      <TrailerModal
        play={playTrailer}
        trailer={filterByTrailers(tvShow.videos.results)[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
