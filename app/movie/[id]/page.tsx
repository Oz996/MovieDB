"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SideContent from "@/components/SideContent";
import "react-circular-progressbar/dist/styles.css";
import ReviewSection from "@/components/ReviewSection";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(params.id as string);
        setMovie(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [params]);

  const reviews = movie?.reviews.results;

  return (
    <section className="flex flex-col">
      <Banner movie={movie!} />
      <section className="grid grid-cols-4">
        <div className="col-span-3 space-y-5">
          <PersonCarousel movie={movie!} />
          <ReviewSection reviews={reviews!} />
        </div>
        <SideContent movie={movie!} />
      </section>
    </section>
  );
}
