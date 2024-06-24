"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Movie() {
  const [movie, setMovie] = useState([]);
  const params = useParams();

  useEffect(() => {
    getMovieDetails(params.id as string);
  }, [params]);
}
