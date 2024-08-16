"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie, Trailer } from "@/types";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SideContent from "@/components/SideContent";
import MediaCarousel from "@/components/Carousels/MediaCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import MovieBanner from "@/components/Banner/MovieBanner";

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

  return (
    <section className="flex flex-col">
      <MovieBanner
        movie={movie!}
        videos={videos!}
        setVideos={setVideos!}
        isLoading={isLoading}
      />
      <section className="grid grid-cols-1 md:grid-cols-4 container">
        <div className="col-span-3 space-y-5">
          <PersonCarousel movie={movie!} isLoading={isLoading} />
          <ReviewSection movie={movie!} />
          <MediaCarousel
            id={params.id}
            videos={videos}
            setVideos={setVideos}
            type="movie"
          />
          <SimilarCarousel id={params.id} type="movie" />
        </div>
        <SideContent movie={movie!} />
      </section>
    </section>
  );
}
