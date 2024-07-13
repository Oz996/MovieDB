"use client";
import Banner from "@/components/Banner/Banner";
import MediaCarousel from "@/components/Carousels/MediaCarousel";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import ReviewSection from "@/components/ReviewSection";
import SideContent from "@/components/SideContent";
import { getTvShowDetails } from "@/services/tvShows";
import { Trailer, TvShow } from "@/types";
import { useEffect, useState } from "react";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tvShow, setTvShow] = useState<TvShow>();
  const [videos, setVideos] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getTvShowDetails(params.id);
        setTvShow(res);
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
      <Banner
        tvShow={tvShow!}
        videos={videos!}
        setVideos={setVideos!}
        isLoading={isLoading}
      />
      <section className="grid grid-cols-1 md:grid-cols-4 container">
        <div className="col-span-3 space-y-5">
          <PersonCarousel tvShow={tvShow!} isLoading={isLoading} />
          <ReviewSection tvShow={tvShow!} />
          <MediaCarousel
            id={params.id}
            videos={videos}
            setVideos={setVideos}
            type="tv"
          />
          {/*  <SimilarCarousel id={params.id} /> */}
        </div>
        <SideContent tvShow={tvShow!} />
      </section>
    </section>
  );
}
