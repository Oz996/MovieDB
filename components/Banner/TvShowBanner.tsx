"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Trailer, TvShow } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { fetchVideos, handleDisplayImage } from "@/lib/utils";
import BannerContainer from "./Banner";
import TvShowDetails from "./components/TvShowDetails";
import TrailerModal from "../TrailerModal";

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
      fetchVideos("movie", tvShow?.id, setVideos);
    }
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  return (
    <BannerContainer backdrop_path={tvShow.backdrop_path}>
      <Image
        width={isMobile ? 400 : 300}
        height={isMobile ? 400 : 300}
        src={handleDisplayImage("w1280", tvShow.poster_path)}
        alt="Movie poster"
        className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
      />
      <TvShowDetails tvShow={tvShow} handleShowTrailer={handleShowTrailer} />
      <TrailerModal
        play={playTrailer}
        trailer={videos[0]?.key}
        handleClose={handleCloseTrailer}
      />
    </BannerContainer>
  );
}
