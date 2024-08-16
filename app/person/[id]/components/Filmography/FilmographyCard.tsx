import { getBaseUrl } from "@/lib/utils";
import { Cast, Crew } from "@/types";
import classNames from "classnames";
import Link from "next/link";

interface props {
  id: number;
  title: string;
  date: string;
  media_type: string;
  episode_count?: number | null;
  character?: string;
  job?: string;
  array: Crew[] | Cast[];
  i: number;
}

export default function FilmographyCard({
  id,
  title,
  date,
  media_type,
  episode_count,
  character,
  job,
  array,
  i,
}: props) {
  const dateToDisplay = (year: number) => {
    if (!year) return "TBA";
    else return year;
  };

  const getYear = (date: any) =>
    new Date(date || date?.release_date || date?.first_air_date).getFullYear();

  const currentDate = getYear(date);
  const nextDate = array[i + 1]
    ? getYear(array[i + 1].release_date || array[i + 1].first_air_date)
    : null;
  const lastIndex = array.length - 1;

  return (
    <li
      className={classNames({
        "border-b border-slate-300 pb-3":
          currentDate !== nextDate && i !== lastIndex && currentDate,
      })}
    >
      <div className="flex gap-2">
        <p>{dateToDisplay(currentDate)}</p>
        <Link href={getBaseUrl() + `/${media_type}/${id}`}>
          <p className="font-semibold">{title}</p>
        </Link>
      </div>
      {character && (
        <p className="text-gray-400 pl-10">
          {episode_count && `(${episode_count} episodes)`} as{" "}
          <span className="text-gray-600">{character}</span>
        </p>
      )}
      {job && (
        <p className="text-gray-400 pl-10">
          {episode_count && `(${episode_count} episodes)`}{" "}
          <span className="text-gray-600">...{job}</span>
        </p>
      )}
    </li>
  );
}
