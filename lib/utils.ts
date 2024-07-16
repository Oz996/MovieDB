import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToDollars = (number: number) => {
  if (!number) return;
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
