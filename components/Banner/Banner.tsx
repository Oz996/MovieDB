import { useState } from "react";
import { Crew, Movie, Trailer } from "@/types";
import Image from "next/image";
import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Play } from "lucide-react";
import Link from "next/link";
import { getMovieVideos } from "@/services/movies";
import TrailerIframe from "../TrailerIframe";

interface props {
  movie: Movie;
}

export default function Banner({ movie }: props) {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [videos, setVideos] = useState<Trailer[] | undefined>([]);

  const date = new Date(movie?.release_date as string);
  const year = date.getFullYear();
  const genres = movie?.genres;

  const crewToList = ["Director", "Writer", "Screenplay", "Story", "Creator"];
  const crew = movie?.credits.crew.filter((crew) => {
    if (typeof crew.job === "string") return crewToList.includes(crew.job);
  });

  const formattedDate = date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const runtime = movie?.runtime;
  const getRunTime = () => {
    if (!runtime) return null;
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

  const rating = Math.ceil(movie?.vote_average! * 10);
  const getColor = () => {
    if (!rating) return "#ccc";
    if (rating >= 70) {
      return "#21d07a";
    } else if (rating >= 40) {
      return "#d2d531";
    } else {
      return "#db2360";
    }
  };

  // making sure that no person gets duplicated and turning persons job property to an array of all jobs
  const getCrewRoles = () => {
    if (!crew) return null;
    const nameMap = new Map();

    for (const item of crew) {
      if (nameMap.has(item.name)) {
        nameMap.get(item.name).job.push(item.job);
      } else {
        nameMap.set(item.name, { ...item, job: [item.job] });
      }
    }
    const result: Crew[] = [];
    for (const item of crew) {
      const person = nameMap.get(item.name);
      if (person && !result.some((p) => p.name === person.name)) {
        result.push(person);
      }
    }
    return result;
  };

  // const trailers = movie?.videos?.results;
  const trailerToDisplay = videos && videos[videos.length - 1]?.key;

  const fetchVideos = async () => {
    try {
      const res = await getMovieVideos(movie?.id);
      setVideos(res);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleShowTrailer = () => {
    setPlayTrailer(true);
    if (videos?.length === 0) {
      fetchVideos();
    }
  };
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  return (
    <section className="pt-24">
      {/* backdrop image */}
      <div
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}")`,
        }}
        className="h-[32rem] flex items-center justify-center w-full relative before:bg-black/60 bg-no-repeat bg-cover before:absolute before:inset-0"
      >
        {/* image and other content */}
        <div className="z-20 flex gap-10 text-white">
          <Image
            width={300}
            height={300}
            src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
            alt="Movie poster"
            className="z-20 rounded-lg"
          />
          <div className="flex flex-col justify-center pr-10">
            <div className="z-20 flex gap-2 text-4xl">
              <h2 className="font-bold">{movie?.title}</h2>
              <span className="opacity-80">({year})</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{formattedDate}</span>
              <div
                className={classNames({
                  "pl-3 relative flex gap-1": true,
                  "before:absolute before:content-['•'] before:left-0":
                    genres?.length > 0,
                })}
              >
                {genres?.map((genre, i) => (
                  <Link key={genre.id} href="">
                    <span>
                      {genre.name}
                      {i === genres.length - 1 ? "" : ", "}
                    </span>
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
                <CircularProgressbar
                  value={rating!}
                  text={`${rating}%`}
                  styles={{
                    text: {
                      fontSize: "2rem",
                      fill: "white",
                    },
                    trail: {
                      opacity: "40%",
                    },
                    path: {
                      stroke: getColor(),
                    },
                  }}
                  className="font-semibold"
                />
                <p className="font-semibold">
                  User <br /> Score
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div
                className="flex gap-1 cursor-pointer pt-2 pb-3"
                onClick={handleShowTrailer}
              >
                <Play size={22} />
                <span className="font-semibold">Play Trailer</span>
              </div>
              <span className="italic opacity-80">{movie?.tagline}</span>
              <span className="text-xl">Overview</span>
              <p>{movie?.overview}</p>
              <ul className="grid grid-cols-3 pt-5">
                {getCrewRoles()?.map((person) => (
                  <li key={person.id}>
                    <p className="font-semibold">{person.name}</p>
                    <p>
                      {Array.isArray(person.job)
                        ? person.job.join(", ")
                        : person.job}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <TrailerIframe
        play={playTrailer}
        trailer={trailerToDisplay!}
        handleClose={handleCloseTrailer}
      />
    </section>
  );
}
