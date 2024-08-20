"use client";
import BannerLoader from "@/components/Banner/components/BannerLoader";
import TvShowBanner from "@/components/Banner/TvShowBanner";
import LoaderCarousel from "@/components/Carousels/LoaderCarousel";
import MediaCarousel from "@/components/Carousels/MediaCarousel";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SimilarCarousel from "@/components/Carousels/SimilarCarousel";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import TvShowAside from "./components/TvShowAside";
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

  if (isLoading || !tvShow)
    return (
      <>
        <BannerLoader />
        <LoaderCarousel />
      </>
    );

  return (
    <section className="flex flex-col">
      <TvShowBanner tvShow={tvShow} videos={videos} setVideos={setVideos} />
      <section className="grid grid-cols-1 md:grid-cols-4 container">
        <div className="col-span-3 space-y-5">
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
        <TvShowAside
          homepage={tvShow.homepage}
          networks={tvShow.networks}
          keywords={tvShow.keywords.results}
          language={tvShow.original_language}
          links={tvShow.external_ids}
          status={tvShow.status}
        />
      </section>
    </section>
  );
}
