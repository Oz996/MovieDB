"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import "react-circular-progressbar/dist/styles.css";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import { formatToDollars } from "@/lib/utils";
import ExternalLinks from "@/components/ExternalLinks";

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
        <div>
          <div className="flex flex-col gap-4 pt-12 w-[15rem]">
            <ExternalLinks movie={movie!} />
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Status</p>
              <p>{movie?.status}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Original Language</p>
              <p>{movie?.original_language}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Budget</p>
              <p>{formatToDollars(movie?.budget!)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Revenue</p>
              <p>{formatToDollars(movie?.revenue!)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Keywords</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {movie?.keywords.keywords.map((keyword) => (
                  <div
                    key={keyword.id}
                    className="rounded-lg py-1 px-3 bg-gray-200"
                  >
                    <p>{keyword.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
