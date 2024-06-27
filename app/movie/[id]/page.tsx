"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import "react-circular-progressbar/dist/styles.css";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import SideContent from "@/components/SideContent";

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

  // const linksToDisplay = ["facebook", "instagram", "twitter"];
  // const getLinksToDisplay = () => {};
  return (
    <>
      <Banner movie={movie!} />
      <section className="flex">
        <PersonCarousel movie={movie!} />
        <SideContent movie={movie!} />
      </section>
    </>
  );
}
