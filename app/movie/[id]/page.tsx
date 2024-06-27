"use client";
import { getMovieDetails } from "@/services/movies";
import { useEffect, useState } from "react";
import { Movie as IMovie } from "@/types";
import "react-circular-progressbar/dist/styles.css";
import Banner from "@/components/Banner/Banner";
import PersonCarousel from "@/components/Carousels/PersonCarousel";
import { formatToDollars } from "@/lib/utils";
import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              {movie?.external_ids.facebook_id && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`https://www.facebook.com/${movie?.external_ids.facebook_id}`}
                        target="_blank"
                      >
                        <FaFacebook size={25} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white border-none">
                      <p className="text-lg">Visit Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {movie?.external_ids.twitter_id && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`https://twitter.com/${movie?.external_ids.twitter_id}`}
                        target="_blank"
                      >
                        <FaTwitter size={25} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white border-none">
                      <p className="text-lg">Visit Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {movie?.external_ids.facebook_id && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`https://www.instagram.com/${movie?.external_ids.instagram_id}`}
                        target="_blank"
                      >
                        <FaInstagram size={25} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white border-none">
                      <p className="text-lg">Visit Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={movie?.homepage}
                      target="_blank"
                      className="border-l pl-4"
                    >
                      <FaLink size={23} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white border-none">
                    <p className="text-lg">Visit Homepage</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
          </div>
        </div>
      </section>
    </>
  );
}
