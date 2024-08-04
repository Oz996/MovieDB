import { Result } from "@/types";
import { handleDisplayImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface props {
  item: Result;
}

export default function MediaCard({ item }: props) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  return (
    <Link
      key={item.id}
      href={`http://localhost:3000/item/${item.id}`}
      className="border rounded-lg shadow-md w-[11rem]"
    >
      <Image
        className="rounded-t-lg"
        src={handleDisplayImage("w342", item.poster_path!)}
        width={180}
        height={180}
        alt=""
      />

      <div className="flex flex-col gap-1 p-2">
        <p className="font-semibold max-w-[10rem] line-clamp-2">{title}</p>
        <p className="text-gray-500">{date}</p>
      </div>
    </Link>
  );
}
