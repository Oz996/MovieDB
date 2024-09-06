"use client";
import TvShowBanner from "./../components/TvShowBanner";
import MediaCarousel from "../../../components/MediaCarousel";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import TvShowAside from "./../components/TvShowAside";
import { Trailer, TvShow as ITvShow } from "@/types";
import { useState } from "react";
import {
  DetailsContainer,
  DetailsGridDiv,
} from "../../../components/DetailsContainer";

interface props {
  tvShow: ITvShow;
  params: { id: string };
}

export default function TvShow({ params, tvShow }: props) {
  const [videos, setVideos] = useState<Trailer[]>([]);

  return (
    <DetailsContainer>
      <TvShowBanner tvShow={tvShow} videos={videos} setVideos={setVideos} />
      <DetailsGridDiv>
        <div className="col-span-3 space-y-5 lg:-mr-8">
          <PersonCarousel cast={tvShow.credits.cast.slice(0, 8)} />
          <ReviewSection reviews={tvShow.reviews.results} />
          <MediaCarousel
            type="tv"
            id={params.id}
            videos={videos}
            setVideos={setVideos}
          />
          <SimilarCarousel
            type="tv"
            id={params.id}
            rating={Math.ceil(tvShow.vote_average * 10)}
          />
        </div>
        <TvShowAside tvShow={tvShow} />
      </DetailsGridDiv>
    </DetailsContainer>
  );
}
