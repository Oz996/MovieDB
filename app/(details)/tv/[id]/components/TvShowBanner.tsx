"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Trailer, TvShow } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { fetchVideos, handleDisplayImage } from "@/lib/utils";
import BannerContainer from "../../../../../components/Banner/Banner";
import TvShowDetails from "./TvShowDetails";
import TrailerModal from "../../../../../components/TrailerModal";

interface props {
  tvShow: TvShow;
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function TvShowBanner({ tvShow, videos, setVideos }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  console.log("vidsz", videos);
  console.log("current tvShow", tvShow);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const handleShowTrailer = () => {
    setPlayTrailer(true);
    if (videos.length === 0) {
      fetchVideos("tv", tvShow?.id, setVideos);
    }
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
        trailer={videos[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
