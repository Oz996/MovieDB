import { useState } from "react";
import { Crew, Movie } from "@/types";
import Image from "next/image";
import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface props {
  movie: Movie;
}

export default function Banner({ movie }: props) {
  const [trailer, setTrailer] = useState(false);

  const date = new Date(movie?.release_date as string);
  const year = date.getFullYear();
  const genres = movie?.genres;

  const crewToList = ["Director", "Writer", "Screenplay", "Story"];
  const crew = movie?.credits.crew.filter((crew) => {
    if (typeof crew.job === "string") return crewToList.includes(crew.job);
  });

  const formattedDate = date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const time = movie?.runtime;
  const getRunTime = () => {
    if (!time) return null;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
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

  const trailers = movie?.videos.results;
  const trailerToDisplay = trailers ? trailers[trailers.length - 1].key : null;
  const handleShowTrailer = () => {
    setTrailer(true);
  };
  const handleCloseTrailer = () => {
    setTrailer(false);
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
            height={350}
            src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
            alt="Movie Poster"
            className="z-20 rounded-lg"
          />
          <div className="flex flex-col justify-center pr-10">
            <div className="z-20 flex gap-2 text-4xl">
              <h2 className="font-bold">{movie?.title}</h2>
              <p className="opacity-80">({year})</p>
            </div>
            <div className="flex items-center gap-3">
              <p>{formattedDate}</p>
              <div
                className={classNames({
                  "pl-3 relative flex gap-1": true,
                  "before:absolute before:content-['•'] before:left-0":
                    genres?.length! > 0,
                })}
              >
                {genres?.map((genre, i) => (
                  <p key={genre.id}>
                    {genre.name}
                    {i === genres.length - 1 ? "" : ", "}
                  </p>
                ))}
              </div>
              <p
                className={classNames({
                  "pl-3 relative flex gap-1": true,
                  "before:absolute before:content-['•'] before:left-0": time,
                })}
              >
                {getRunTime()}
              </p>
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
                <p className="font-semibold">Play Trailer</p>
              </div>
              <p className="italic opacity-80">{movie?.tagline}</p>
              <p className="text-xl">Overview</p>
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
      <AnimatePresence>
        {trailer && (
          <motion.div
            key="video-player"
            className="absolute left-[20rem] top-[5rem] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="fixed inset-0 w-full h-full bg-black/80" />
            <div className="relative top-0 py-2 px-4 flex justify-between items-center w-[1387px] h-[4rem] text-white bg-black z-50">
              <p className="text-lg">Play Trailer</p>
              <X className="cursor-pointer" onClick={handleCloseTrailer} />
            </div>
            <div className="z-50">
              <iframe
                className="absolute inset-0"
                width="1387"
                height="780"
                src={`https://www.youtube.com/embed/${trailerToDisplay}?autoplay=1`}
                allow="autoplay"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
