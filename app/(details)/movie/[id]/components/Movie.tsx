"use client";
import { useState } from "react";
import { Movie as IMovie, Trailer } from "@/types";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import MediaCarousel from "../../../components/MediaCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import MovieBanner from "./../components/MovieBanner";
import MovieAside from "./../components/MovieAside";
import {
  DetailsContainer,
  DetailsGridDiv,
} from "../../../components/DetailsContainer";

interface props {
  movie: IMovie;
  params: { id: string };
}

export default function Movie({ params, movie }: props) {
  const [videos, setVideos] = useState<Trailer[]>([]);

  return (
    <DetailsContainer>
      <MovieBanner movie={movie} videos={videos} setVideos={setVideos} />
      <DetailsGridDiv>
        <div className="col-span-3 space-y-5 lg:-mr-8">
          <PersonCarousel cast={movie.credits.cast.slice(0, 8)} />
          <ReviewSection reviews={movie.reviews.results} />
          <MediaCarousel
            type="movie"
            id={params.id}
            videos={videos}
            setVideos={setVideos}
          />
          <SimilarCarousel
            type="movie"
            id={params.id}
            rating={Math.ceil(movie.vote_average * 10)}
          />
        </div>
        <MovieAside movie={movie} />
      </DetailsGridDiv>
    </DetailsContainer>
  );
}
