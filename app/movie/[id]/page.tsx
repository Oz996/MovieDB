"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie, Trailer } from "@/types";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SideContent from "@/components/SideContent";
import "react-circular-progressbar/dist/styles.css";
import ReviewSection from "@/components/ReviewSection";
import MediaCarousel from "@/components/MediaCarousel";
import SimilarCarousel from "@/components/SimilarCarousel";

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
      <Banner movie={movie!} videos={videos!} setVideos={setVideos!} />
      <section className="grid grid-cols-4">
        <div className="col-span-3 space-y-5">
          <PersonCarousel movie={movie!} />
          <ReviewSection movie={movie!} />
          <MediaCarousel id={params.id} videos={videos} setVideos={setVideos} />
          <SimilarCarousel id={params.id} />
        </div>
        <SideContent movie={movie!} />
      </section>
    </section>
  );
}
