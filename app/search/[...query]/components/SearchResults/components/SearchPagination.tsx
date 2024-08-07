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
import classNames from "classnames";
import Link from "next/link";

interface props {
  isLoading: boolean;
  currentPage: number;
}

export default function SearchPagination({ isLoading, currentPage }: props) {
  const { query, pageAmount, type } = useSearch();
  const lastPage = pageAmount;

  const paginationLink = (page: number) => {
    return `/search/query?search=${query}${
      type ? `&type=${type}` : ""
    }&page=${page}`;
  };

  const hidePagination = isLoading || pageAmount <= 1;

  return (
    <Pagination
      className={classNames({
        "py-10": true,
        hidden: hidePagination,
      })}
    >
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
          <PaginationItem className="max-sm:hidden">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage + 2 === lastPage ||
        currentPage + 1 === lastPage ||
        currentPage === lastPage ? null : (
          <PaginationItem className="max-sm:hidden">
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
  );
}
