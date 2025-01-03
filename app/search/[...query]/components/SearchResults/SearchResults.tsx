import { Media, MediaType, Movie, Person, TvShow } from "@/types";
import Image from "next/image";
import Link from "next/link";
import SearchPagination from "./components/SearchPagination";
import { handleDisplayImage } from "@/lib/utils";
import NoResults from "@/components/NoResults";
import SearchLink from "./components/SearchLink";

interface props {
  search: string;
  mediaType: MediaType;
  pageAmount: number;
  currentPage: number;
  searchResults: Media[];
}

export default function SearchResults({
  search,
  mediaType,
  pageAmount,
  currentPage,
  searchResults,
}: props) {
  const isMovie = (item: Media): item is Movie => {
    return item.media_type === "movie" || mediaType === "movie";
  };

  const isShow = (item: Media): item is TvShow => {
    return item.media_type === "tv" || mediaType === "tv";
  };

  const isPerson = (item: Media): item is Person => {
    return item.media_type === "person" || mediaType === "person";
  };

  console.log("resulsts", searchResults);

  return (
    <section className="lg:col-span-2 lg:-ml-20 max-lg:pt-5 space-y-5">
      {searchResults?.length === 0 && <NoResults />}

      {searchResults?.map((item) => {
        if (isMovie(item)) {
          return (
            <div key={item.id} className="flex gap-3 rounded-lg border">
              <SearchLink type={item.media_type ?? mediaType} id={item.id} main>
                <Image
                  className="rounded-l-lg object-cover w-full h-full"
                  src={handleDisplayImage("w185", item.poster_path)}
                  width={100}
                  height={100}
                  alt=""
                />
              </SearchLink>
              <div className="flex flex-col gap-4 px-1 py-5">
                <div className="w-full">
                  <SearchLink type={item.media_type ?? mediaType} id={item.id}>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                  </SearchLink>
                  <span className="text-gray-500">{item.release_date}</span>
                </div>
                <p className="line-clamp-2">{item.overview}</p>
              </div>
            </div>
          );
        }

        if (isShow(item)) {
          return (
            <div key={item.id} className="flex gap-3 rounded-lg border">
              <SearchLink type={item.media_type ?? mediaType} id={item.id} main>
                <Image
                  className="rounded-l-lg object-cover w-full h-full"
                  src={handleDisplayImage("w185", item.poster_path)}
                  width={100}
                  height={100}
                  alt=""
                />
              </SearchLink>
              <div className="flex flex-col gap-4 px-1 py-5">
                <div className="w-full">
                  <SearchLink type={item.media_type ?? mediaType} id={item.id}>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                  </SearchLink>
                  <span className="text-gray-500">{item.first_air_date}</span>
                </div>
                <p className="line-clamp-2">{item.overview}</p>
              </div>
            </div>
          );
        }

        if (isPerson(item)) {
          const personKnownFor = () => {
            const knownForList = [
              item?.known_for?.[0]?.title ?? item?.known_for?.[0]?.name,
              item?.known_for?.[1]?.title ?? item?.known_for?.[1]?.name,
              item?.known_for?.[2]?.title ?? item?.known_for?.[2]?.name,
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
              <SearchLink type={item.media_type ?? mediaType} id={item.id} main>
                <Image
                  className="rounded-l-lg object-cover w-full h-full"
                  src={handleDisplayImage("w185", item.profile_path)}
                  width={100}
                  height={100}
                  alt=""
                />
              </SearchLink>
              <div className="flex flex-col gap-4 px-1 py-5">
                <div className="w-full">
                  <SearchLink type={item.media_type ?? mediaType} id={item.id}>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                  </SearchLink>

                  <div className="flex gap-2 items-center truncate">
                    <span className="text-lg">
                      {item?.known_for_department} •
                    </span>
                    <div className="flex gap-1 truncate line-clamp-1">
                      {listKnownFor()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}

      {searchResults?.length > 0 && (
        <SearchPagination
          search={search}
          currentPage={currentPage}
          mediaType={mediaType}
          pageAmount={pageAmount}
        />
      )}
    </section>
  );
}
