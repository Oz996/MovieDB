import { formatDate } from "@/lib/utils";
import { Crew, Genre } from "@/types";
import classNames from "classnames";
import { Play } from "lucide-react";
import Link from "next/link";
import CircleRatingBar from "./CircleRatingBar";
import CrewList from "./CrewList";

interface props {
  title: string;
  release: string;
  genres: Genre[];
  rating: number;
  runtime: number;
  tagline: string;
  overview: string;
  crew: Crew[];
  handleShowTrailer: () => void;
}

export default function MovieDetails({
  title,
  release,
  genres,
  rating,
  runtime,
  tagline,
  overview,
  crew,
  handleShowTrailer,
}: props) {
  const getRunTime = () => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="flex flex-col justify-center md:pr-10">
      <div className="z-20 flex gap-2 text-2xl md:text-4xl">
        <h2 className="font-bold">{title}</h2>
        <span className="opacity-80 max-md:hidden">
          ({new Date(release).getFullYear()})
        </span>
      </div>
      <div className="flex max-md:flex-col lg:items-center max-md:pt-3 gap-3">
        <span>{formatDate(release)}</span>
        <div
          className={classNames({
            "pl-3 relative": true,
            "before:absolute before:content-['•'] before:left-0":
              genres.length > 0,
          })}
        >
          {genres?.map((genre) => (
            <Link
              key={genre.id}
              href=""
              className="after:content-[',_'] last:after:content-['']"
            >
              {genre.name}
            </Link>
          ))}
        </div>
        <span
          className={classNames({
            "pl-3 relative flex gap-1": true,
            "before:absolute before:content-['•'] before:left-0": runtime,
          })}
        >
          {getRunTime()}
        </span>
      </div>
      {rating !== 0 && (
        <div className="size-28 pt-5 flex gap-2 items-center">
          <CircleRatingBar rating={rating} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <button
          className="flex gap-1 cursor-pointer pt-2 pb-3"
          onClick={handleShowTrailer}
        >
          <Play size={22} aria-hidden="true" />
          <span className="font-semibold">Play Trailer</span>
        </button>
        <span className="italic opacity-80">{tagline}</span>
        <span className="text-xl">Overview</span>
        <p>{overview}</p>
        <CrewList type="movie" crew={crew} />
      </div>
    </div>
  );
}
