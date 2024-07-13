import { Movie, TvShow } from "@/types";
import ExternalLinks from "./ExternalLinks";
import { formatToDollars, handleDisplayImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface props {
  movie?: Movie;
  tvShow?: TvShow;
}

export default function SideContent({ movie, tvShow }: props) {
  const keywords = movie?.keywords?.keywords || tvShow?.keywords?.results;
  const status = movie?.status || tvShow?.status;
  const original_language =
    movie?.original_language || tvShow?.original_language;
  return (
    <aside>
      <div className="flex flex-col gap-4 pt-12 w-[15rem]">
        <ExternalLinks movie={movie!} />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Status</p>
          <p>{status}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Original Language</p>
          <p>{original_language}</p>
        </div>
        {tvShow && (
          <>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Network</p>
              <ul className="flex flex-col gap-2">
                {tvShow?.networks.map((network) => (
                  <li key={network.id}>
                    <Link href="">
                      <Image
                        width={100}
                        height={100}
                        src={handleDisplayImage("w342", network.logo_path)}
                        alt=""
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {movie && (
          <>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Budget</p>
              <p>{formatToDollars(movie?.budget!)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Revenue</p>
              <p>{formatToDollars(movie?.revenue!)}</p>
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Keywords</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {keywords?.map((keyword) => (
              <div
                key={keyword.id}
                className="rounded-lg py-1 px-3 bg-gray-200"
              >
                <p>{keyword.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
