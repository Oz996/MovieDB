import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearch } from "@/hooks/useSearch";
import { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface props {
  currentPage: number;
  searchResults: Result[];
}

export default function SearchResults({ currentPage, searchResults }: props) {
  const { query, pageAmount, type } = useSearch();
  const lastPage = pageAmount;

  // console.log("amount", pageAmount);

  const paginationLink = (page: number) => {
    return `/search/query?search=${query}${
      type ? `&type=${type}` : ""
    }&page=${page}`;
  };

  return (
    <section className="col-span-2 -ml-20 space-y-5">
      {searchResults?.length === 0 && (
        <p className="text-lg">There are no movies that matched your query.</p>
      )}
      {searchResults?.map((item) => {
        const person = item?.media_type === "person";
        const title = item?.name || item?.title;
        const date = item?.first_air_date || item?.release_date;
        const image = item.poster_path
          ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
          : item.profile_path
          ? `https://image.tmdb.org/t/p/w185/${item.profile_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

        const knownForList = [
          item?.known_for?.[0]?.title,
          item?.known_for?.[1]?.title,
          item?.known_for?.[2]?.title,
        ].join(", ");

        return (
          <div key={item.id} className="flex gap-3 rounded-lg border">
            <Link href="" className="w-28 h-40 flex-shrink-0">
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
                  <h2 className="text-xl font-semibold">{title}</h2>
                </Link>
                <p className="text-lg text-gray-500">{date}</p>
                {person && (
                  <div className="flex gap-2 items-center">
                    <p className="text-lg">{item?.known_for_department} •</p>
                    <p className="text-gray-500">{knownForList}</p>
                  </div>
                )}
              </div>
              <p className="line-clamp-2">{item.overview}</p>
            </div>
          </div>
        );
      })}
      <Pagination className="py-10">
        <PaginationContent>
          <PaginationItem>
            <Button
              className="p-0 bg-white text-black hover:bg-white duration-0"
              disabled={currentPage === 1}
            >
              <Link href={paginationLink(currentPage - 1)}>
                <PaginationPrevious />
              </Link>
            </Button>
          </PaginationItem>
          {currentPage > 2 && (
            <PaginationItem>
              <Link href={paginationLink(currentPage - 2)}>
                <PaginationLink>{currentPage - 2}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <Link href={paginationLink(currentPage - 1)}>
                <PaginationLink>{currentPage - 1}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink className="bg-slate-200">
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage === lastPage ? null : (
            <PaginationItem>
              <Link href={paginationLink(currentPage + 1)}>
                <PaginationLink>{currentPage + 1}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          {currentPage === lastPage || currentPage === lastPage - 1 ? null : (
            <PaginationItem>
              <Link href={paginationLink(currentPage + 2)}>
                <PaginationLink>{currentPage + 2}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          {currentPage + 2 === lastPage ||
          currentPage + 1 === lastPage ||
          currentPage === lastPage ? null : (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage + 2 === lastPage ||
          currentPage + 1 === lastPage ||
          currentPage === lastPage ? null : (
            <PaginationItem>
              <Link href={paginationLink(lastPage)}>
                <PaginationLink>{lastPage}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          <PaginationItem>
            <Button
              className="p-0 bg-white text-black hover:bg-white duration-0"
              disabled={currentPage === lastPage}
            >
              <Link href={paginationLink(currentPage + 1)}>
                <PaginationNext />
              </Link>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
