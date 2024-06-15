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
import { Dispatch, SetStateAction } from "react";

interface props {
  currentPage: number;
  searchResults: Result[];
  setSearchResults: Dispatch<SetStateAction<Result[] | undefined>>;
}

export default function SearchResults({
  currentPage,
  searchResults,
  setSearchResults,
}: props) {
  const { query, pageAmount, page } = useSearch();
  const lastPage = pageAmount;

  console.log("amount", pageAmount);

  return (
    <section className="col-span-2 -ml-20 space-y-5">
      {searchResults?.length === 0 && (
        <p className="text-lg">There are no movies that matched your query.</p>
      )}
      {searchResults?.map((item) => {
        const title = item?.name || item?.title;
        const date = item?.first_air_date || item?.release_date;
        const image = item.poster_path
          ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
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
                <p className="text-lg text-gray-400">{date}</p>
              </div>
              <p className="line-clamp-2">{item.overview}</p>
            </div>
          </div>
        );
      })}
      <Pagination className="py-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/search/query?search=${query}&page=${currentPage - 1}`}
            />
          </PaginationItem>
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink
                href={`/search/query?search=${query}&page=${currentPage - 2}`}
              >
                {currentPage - 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`/search/query?search=${query}&page=${currentPage - 1}`}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink className="bg-slate-200" href="#">
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage === lastPage ? null : (
            <PaginationItem>
              <PaginationLink
                href={`/search/query?search=${query}&page=${currentPage + 1}`}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage === lastPage || currentPage === lastPage - 1 ? null : (
            <PaginationItem>
              <PaginationLink
                href={`/search/query?search=${query}&page=${currentPage + 2}`}
              >
                {currentPage + 2}
              </PaginationLink>
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
              <PaginationLink
                href={`/search/query?search=${query}&page=${lastPage}`}
              >
                {lastPage}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={`/search/query?search=${query}&page=${currentPage + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
