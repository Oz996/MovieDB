"use client";
import { getTvShowDetails } from "@/services/tvShows";
import { Trailer } from "@/types";
import { useEffect, useState } from "react";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState();
  const [videos, setVideos] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getTvShowDetails(params.id);
        setShows(res);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [params.id]);
}
