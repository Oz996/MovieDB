import { Result, ResultObject } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface props {
  searchResults: Result[];
}

export default function SearchResults({ searchResults }: props) {
  return (
    <section className="col-span-2 -ml-20 space-y-5">
      {searchResults?.map((item) => {
        const title = item?.name || item?.title;
        const date = item?.first_air_date || item?.release_date;
        const image = item.poster_path
          ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
        return (
          <div key={item.id} className="flex gap-3 rounded-lg border">
            <Image
              className="rounded-l-lg"
              src={image}
              width={100}
              height={100}
              alt=""
            />
            <div className="flex flex-col justify-center gap-4 px-1">
              <div>
                <Link href="">
                  <h2 className="text-xl font-semibold">{title}</h2>
                </Link>
                <p className="text-gray-500">{date}</p>
              </div>
              <p className="line-clamp-2">{item.overview}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
