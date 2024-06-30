import { Cast, Result } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToDollars = (number: number) => {
  if (!number) return null;
  const formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNumber;
};

export const handleDisplayImage = (width: string, item: Result | Cast) => {
  if ("poster_path" in item && item.poster_path) {
    return `https://image.tmdb.org/t/p/${width}/${item.poster_path}`;
  } else if ("profile_path" in item && item.profile_path) {
    return `https://image.tmdb.org/t/p/${width}/${item.profile_path}`;
  } else {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  }
};
