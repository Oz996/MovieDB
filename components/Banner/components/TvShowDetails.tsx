import { Crew, Genre } from "@/types";
import classNames from "classnames";
import Link from "next/link";
import CircleRatingBar from "./CircleRatingBar";
import { Play } from "lucide-react";
import CrewList from "./CrewList";

interface props {
  title: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  genres: Genre[];
  rating: number;
  tagline: string;
  overview: string;
  crew: Crew[];
  handleShowTrailer: () => void;
}

export default function TvShowDetails({
  title,
  first_air_date,
  last_air_date,
  in_production,
  genres,
  rating,
  tagline,
  overview,
  crew,
  handleShowTrailer,
}: props) {
  const getTvShowDate = () => {
    const first = first_air_date?.slice(0, 4);
    const last = last_air_date?.slice(0, 4);

    if (in_production) {
      return `${first}-`;
    } else {
      return `${first} - ${last}`;
    }
  };

  return (
    <div className="flex flex-col justify-center md:pr-10">
      <div className="z-20 flex gap-2 text-2xl md:text-4xl">
        <h2 className="font-bold">{title}</h2>
        <span className="opacity-80 max-md:hidden">({getTvShowDate()})</span>
      </div>
      <div className="flex max-md:flex-col lg:items-center max-md:pt-3 gap-3">
        <div
          className={classNames({
            "pl-3 relative": true,
            "before:absolute before:content-['•'] before:left-0":
              genres?.length! > 0,
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
        <CrewList type="tv" crew={crew} />
      </div>
    </div>
  );
}
