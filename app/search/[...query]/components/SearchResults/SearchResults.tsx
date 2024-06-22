import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ResultSkeleton from "../ResultsSkeleton";
import SearchPagination from "./components/SearchPagination";

interface props {
  isLoading: boolean;
  currentPage: number;
  searchResults: Result[];
}

export default function SearchResults({
  currentPage,
  searchResults,
  isLoading,
}: props) {
  const { query, pageAmount, type } = useSearch();

  // console.log("amount", pageAmount);

  if (isLoading) return <ResultSkeleton />;

  return (
    <section className="lg:col-span-2 lg:-ml-20 max-lg:pt-5 space-y-5">
      {searchResults?.length === 0 && (
        <p className="text-lg">There are no results that matched your query.</p>
      )}
      {searchResults?.map((item) => {
        // console.log(`item, ${i}`, item);
        const person = item?.known_for_department;
        const title = item?.name || item?.title;
        const date = item?.first_air_date || item?.release_date;
        const image = item.poster_path
          ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
          : item.profile_path
          ? `https://image.tmdb.org/t/p/w342/${item.profile_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

        // checking if the title or name has a value before displaying it
        const knownFor = () => {
          const knownForList = [
            item?.known_for?.[0]?.title || item?.known_for?.[0]?.name,
            item?.known_for?.[1]?.title || item?.known_for?.[1]?.name,
            item?.known_for?.[2]?.title || item?.known_for?.[2]?.name,
          ];

          const hasValue = knownForList.filter(Boolean);
          const listedTitles = hasValue.join(", ");
          return listedTitles;
        };

        return (
          <div key={item.id} className="flex gap-3 rounded-lg border">
            <Link
              href=""
              className="w-[5.5rem] h-32 lg:w-28 lg:h-40 flex-shrink-0"
            >
              <Image
                className="rounded-l-lg object-cover w-full h-full"
                src={image}
                width={100}
                height={100}
                alt=""
              />
            </Link>
            <div className="flex flex-col justify-center gap-4 px-1">
              <div className="w-full">
                <Link href="">
                  <h2 className="text-lg font-semibold">{title}</h2>
                </Link>
                <p className="text-gray-500">{date}</p>
                {person && (
                  <div className="flex gap-2 items-center truncate">
                    <p className="text-lg">{item?.known_for_department} •</p>
                    <p className="text-gray-500">{knownFor()}</p>
                  </div>
                )}
              </div>
              <p className="line-clamp-2">{item.overview}</p>
            </div>
          </div>
        );
      })}
      {searchResults?.length > 0 && (
        <SearchPagination isLoading={isLoading} currentPage={currentPage} />
      )}
    </section>
  );
}
