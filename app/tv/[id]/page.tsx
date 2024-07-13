"use client";
import Banner from "@/components/Banner/Banner";
import { getTvShowDetails } from "@/services/tvShows";
import { Trailer } from "@/types";
import { useEffect, useState } from "react";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState();
  const [videos, setVideos] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getTvShowDetails(params.id);
        setShow(res);
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
        tvShow={show!}
        videos={videos!}
        setVideos={setVideos!}
        isLoading={isLoading}
      />
      {/* <section className="grid grid-cols-1 md:grid-cols-4 container">
      <div className="col-span-3 space-y-5">
        <PersonCarousel movie={movie!} isLoading={isLoading} />
        <ReviewSection movie={movie!} />
        <MediaCarousel id={params.id} videos={videos} setVideos={setVideos} />
        <SimilarCarousel id={params.id} />
      </div>
      <SideContent movie={movie!} />
    </section> */}
    </section>
  );
}
