import { Cast, Crew } from "@/types";
import classNames from "classnames";
import Link from "next/link";

interface props {
  array: Crew[] | Cast[];
  item: Crew | Cast;
  i: number;
}

const dateToDisplay = (year: number) => {
  if (!year) return "";
  else return year;
};

const getDate = (item: any) => {
  const date = new Date(
    item.release_date || item.first_air_date!
  ).getFullYear();
  return date;
};

export default function FilmographyCard({ item, array, i }: props) {
  const title = item.name || item.title;
  const date = getDate(item);
  const nextDate = array[i + 1] ? getDate(array[i + 1]) : null;
  const lastIndex = array.length - 1;

  return (
    <li
      key={item.id}
      className={classNames({
        "border-b border-slate-300": date !== nextDate && i !== lastIndex,
      })}
    >
      <div className="flex gap-2">
        <p
          className={classNames({
            "pb-2": date !== nextDate && "character" in item,
          })}
        >
          {dateToDisplay(date)}
        </p>
        <Link href={`http://localhost:3000/${item.media_type}/${item.id}`}>
          <p
            className={classNames({
              "font-semibold": true,
              "pb-2": date !== nextDate && "character" in item,
            })}
          >
            {title}
          </p>
        </Link>
      </div>
      {"character" in item && (
        <p
          className={classNames({
            "text-gray-400 pl-10": true,
            "pb-2": date !== nextDate && item.character,
          })}
        >
          {item.episode_count && `(${item.episode_count} episodes)`} as{" "}
          <span className="text-gray-600">{item.character}</span>
        </p>
      )}
      {"job" in item && (
        <p
          className={classNames({
            "text-gray-400 pl-10": true,
            "pb-2": date !== nextDate && item.job,
          })}
        >
          {item.episode_count && `(${item.episode_count} episodes)`}{" "}
          <span className="text-gray-600">...{item.job}</span>
        </p>
      )}
    </li>
  );
}
