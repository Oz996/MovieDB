import { getMovieVideos } from "@/services/movies";
import { getTvShowVideos } from "@/services/tvShows";
import { Trailer } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  } else if (process.env.NETLIFY_URL) {
    return `https://${process.env.NETLIFY_URL}`;
  } else {
    return `http://localhost:3000`;
  }
};

export const formatToDollars = (number: number) => {
  if (!number) return "N/A";
  const formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNumber;
};

export const formatDate = (date: string) => {
  const dateToFormat = new Date(date);
  const formattedDate = dateToFormat.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

export const handleDisplayImage = (width: string, path: string) => {
  if (path) {
    return `https://image.tmdb.org/t/p/${width}/${path}`;
  } else {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  }
};

export const filterByTrailers = (arr: Trailer[]) => {
  const trailers = arr?.filter((item) => item.type === "Trailer");
  return trailers;
};

export const fetchVideos = async (
  type: "movie" | "tv",
  id: number,
  setState: Dispatch<SetStateAction<Trailer[]>>,
  setIsLoading?: Dispatch<SetStateAction<boolean>>
) => {
  const getVideos = type === "movie" ? getMovieVideos : getTvShowVideos;
  try {
    const res = await getVideos(id);
    const trailers = filterByTrailers(res);
    setState(trailers);
  } catch (error: any) {
    console.error(error.message);
  } finally {
    setIsLoading && setIsLoading(false);
  }
};
