"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import "react-circular-progressbar/dist/styles.css";
import Banner from "@/components/Banner/Banner";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import PersonCarousel from "@/components/Carousels/PersonCarousel";

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

  return (
    <>
      <Banner movie={movie!} />
      <PersonCarousel movie={movie!} />
    </>
  );
}
