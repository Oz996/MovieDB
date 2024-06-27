import { Movie } from "@/types";
import ExternalLinks from "./ExternalLinks";
import { formatToDollars } from "@/lib/utils";

interface props {
  movie: Movie;
}

export default function SideContent({ movie }: props) {
  return (
    <aside>
      <div className="flex flex-col gap-4 pt-12 w-[15rem]">
        <ExternalLinks movie={movie!} />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Status</p>
          <p>{movie?.status}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Original Language</p>
          <p>{movie?.original_language}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Budget</p>
          <p>{formatToDollars(movie?.budget!)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Revenue</p>
          <p>{formatToDollars(movie?.revenue!)}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Keywords</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {movie?.keywords.keywords.map((keyword) => (
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
