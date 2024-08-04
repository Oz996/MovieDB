import { Cast, Crew } from "@/types";
import classNames from "classnames";
import Link from "next/link";

interface props {
  array: Crew[] | Cast[];
  item: Crew | Cast;
  i: number;
}

const dateToDisplay = (year: number) => {
  if (!year) return "TBA";
  else return year;
};

const getDate = (item: any) => {
  const date = new Date(item.release_date || item.first_air_date).getFullYear();
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
        "border-b border-slate-300":
          date !== nextDate && i !== lastIndex && getDate(item),
      })}
    >
      <div className="flex gap-2">
        <p>{dateToDisplay(date)}</p>
        <Link href={`http://localhost:3000/${item.media_type}/${item.id}`}>
          <p className="font-semibold">{title}</p>
        </Link>
      </div>
      {"character" in item && (
        <p className="text-gray-400 pl-10 pb-2">
          {item.episode_count && `(${item.episode_count} episodes)`}
          {item.character && " as "}
          <span className="text-gray-600">{item.character}</span>
        </p>
      )}
      {"job" in item && (
        <p className="text-gray-400 pl-10 pb-2">
          {item.episode_count && `(${item.episode_count} episodes)`}{" "}
          <span className="text-gray-600">...{item.job}</span>
        </p>
      )}
    </li>
  );
}
