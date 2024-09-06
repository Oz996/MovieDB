"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie, Trailer } from "@/types";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import MediaCarousel from "../../components/MediaCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import MovieBanner from "./components/MovieBanner";
import MovieAside from "./components/MovieAside";
import BannerLoader from "@/components/Banner/components/BannerLoader";
import LoaderCarousel from "@/components/Carousels/LoaderCarousel";
import {
  DetailsContainer,
  DetailsGridDiv,
} from "../../components/DetailsContainer";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<IMovie>();
  const [videos, setVideos] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(params.id);
        setMovie(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [params.id]);

  if (isLoading || !movie)
    return (
      <>
        <BannerLoader />
        <div className="container pt-20">
          <LoaderCarousel />
        </div>
      </>
    );

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
