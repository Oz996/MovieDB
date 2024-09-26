import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import PaginationButton from "./PaginationButton";

interface props {
  search: string;
  currentPage: number;
  pageAmount: number;
  mediaType: string;
}

export default function SearchPagination({
  search,
  currentPage,
  pageAmount,
  mediaType,
}: props) {
  const lastPage = pageAmount;

  const paginationLink = (page: number) => {
    return `/search/${mediaType}?query=${search}&page=${page}`;
  };

  const hidePagination = pageAmount <= 1;

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
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <Link href={paginationLink(currentPage - 2)}>
              <PaginationButton>{currentPage - 2}</PaginationButton>
            </Link>
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <Link href={paginationLink(currentPage - 1)}>
              <PaginationButton>{currentPage - 1}</PaginationButton>
            </Link>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationButton active>{currentPage}</PaginationButton>
        </PaginationItem>
        {currentPage === lastPage ? null : (
          <PaginationItem>
            <Link href={paginationLink(currentPage + 1)}>
              <PaginationButton>{currentPage + 1}</PaginationButton>
            </Link>
          </PaginationItem>
        )}
        {currentPage === lastPage || currentPage === lastPage - 1 ? null : (
          <PaginationItem>
            <Link href={paginationLink(currentPage + 2)}>
              <PaginationButton>{currentPage + 2}</PaginationButton>
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
              <PaginationButton>{lastPage}</PaginationButton>
            </Link>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            className="p-0 bg-white text-black hover:bg-white duration-0"
            disabled={currentPage === lastPage}
          >
            <Link href={paginationLink(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
