import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ResultSkeleton from "../ResultsSkeleton";
import SearchPagination from "./components/SearchPagination";
import { getBaseUrl, handleDisplayImage } from "@/lib/utils";
import NoResults from "@/components/NoResults";

interface props {
  isLoading: boolean;
  currentPage: number;
  searchParams: any;
  searchResults: Result[];
}

export default function SearchResults({
  currentPage,
  searchParams,
  searchResults,
  isLoading,
}: props) {
  if (isLoading) return <ResultSkeleton />;

  const searchType = searchParams.get("type");

  const handleNavigation = () => {
    if (searchType === "tv") return "tv";
    else if (searchType === "movie") return "movie";
    else if (searchType === "person") return "person";
  };

  return (
    <section className="lg:col-span-2 lg:-ml-20 max-lg:pt-5 space-y-5">
      {searchResults?.length === 0 && <NoResults />}
      {searchResults?.map((item) => {
        const person = item?.known_for_department;
        const title = item?.name || item?.title;
        const date = item?.first_air_date || item?.release_date;
        const imageToDisplay = item?.poster_path || item?.profile_path;
        const image = handleDisplayImage("w342", imageToDisplay!);

        // checking if the title or name has a value before displaying it
        const personKnownFor = () => {
          const knownForList = [
            item?.known_for?.[0]?.title || item?.known_for?.[0]?.name,
            item?.known_for?.[1]?.title || item?.known_for?.[1]?.name,
            item?.known_for?.[2]?.title || item?.known_for?.[2]?.name,
          ];

          const hasValue = knownForList.filter(Boolean);
          return hasValue;
        };

        const listKnownFor = () => {
          const knownFor = personKnownFor();
          return knownFor?.map((item, i) => (
            <Link key={i} href={""}>
              <p className="text-gray-500 truncate line-clamp-1">
                {item}
                {i === knownFor.length - 1 ? "" : ","}
              </p>
            </Link>
          ));
        };

        return (
          <div key={item.id} className="flex gap-3 rounded-lg border">
            <Link
              href={
                getBaseUrl() +
                `/${item.media_type || handleNavigation()}/${item.id}`
              }
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
                <Link
                  href={
                    getBaseUrl() +
                    `/${item.media_type || handleNavigation()}/${item.id}`
                  }
                >
                  <h2 className="text-lg font-semibold">{title}</h2>
                </Link>
                <span className="text-gray-500">{date}</span>
                {person && (
                  <div className="flex gap-2 items-center truncate">
                    <span className="text-lg">
                      {item?.known_for_department} •
                    </span>
                    <div className="flex gap-1 truncate line-clamp-1">
                      {listKnownFor()}
                    </div>
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
