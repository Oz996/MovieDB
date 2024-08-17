"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Trailer, TvShow } from "@/types";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import TrailerIframe from "../TrailerIframe";
import { useMediaQuery } from "@uidotdev/usehooks";
import { filterByTrailers, handleDisplayImage } from "@/lib/utils";
import BannerContainer from "./Banner";
import { getTvShowVideos } from "@/services/tvShows";
import TvShowDetails from "./components/TvShowDetails";

interface props {
  tvShow: TvShow;
  videos: Trailer[];
  setVideos: Dispatch<SetStateAction<Trailer[]>>;
}

export default function TvShowBanner({ tvShow, videos, setVideos }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  console.log("current tvShow", tvShow);

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const fetchVideos = async () => {
    try {
      const res = await getTvShowVideos(tvShow?.id);
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
    <BannerContainer backdrop_path={tvShow?.backdrop_path}>
      <Image
        width={imageSize()}
        height={imageSize()}
        src={handleDisplayImage("w1280", tvShow?.poster_path)}
        alt="Movie poster"
        className="z-20 lg:rounded-lg max-sm:object-cover max-sm:w-full max-md:self-center"
      />
      <TvShowDetails
        title={tvShow?.name}
        first_air_date={tvShow?.first_air_date}
        last_air_date={tvShow?.last_air_date}
        genres={tvShow?.genres}
        tagline={tvShow?.tagline}
        overview={tvShow?.overview}
        crew={tvShow?.credits.crew}
        rating={Math.ceil(tvShow?.vote_average * 10)}
        in_production={tvShow?.in_production}
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
