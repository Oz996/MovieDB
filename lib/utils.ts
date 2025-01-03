import { Media, Trailer } from "@/types";
import { type ClassValue, clsx } from "clsx";
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

export const formatQueryDate = (date: Date) => {
  const formattedDate = date.toLocaleString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};

export const handleDisplayImage = (width: string, path: string | undefined) => {
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

// type guard utilities

export const imageToDisplay = (item: Media) => {
  if ("title" in item) return item.poster_path;
  else if ("first_air_date" in item) return item.poster_path;
  else return item.profile_path;
};

export const titleToDisplay = (item: Media) => {
  if ("title" in item) return item.title;
  else return item.name;
};

export const dateToDisplay = (item: Media) => {
  if ("title" in item) return item.release_date;
  else if ("first_air_date" in item) return item.first_air_date;
  else return null;
};

// --------------------

export const handleUpcomingDates = () => {
  const date = new Date();
  const todaysDate = formatQueryDate(date);

  const monthDate = new Date();
  monthDate.setMonth(monthDate.getMonth() + 1);
  const oneMonthFromToday = formatQueryDate(monthDate);

  const weekDate = new Date();
  weekDate.setDate(weekDate.getDate() + 7);
  const oneWeekFromToday = formatQueryDate(weekDate);

  return { todaysDate, oneMonthFromToday, oneWeekFromToday };
};
