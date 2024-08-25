import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface props {
  type: "movies" | "shows";
  currentPage: number;
  params: { filter: string[] };
}

export default function DiscoverPagination({
  type,
  params,
  currentPage,
}: props) {
  const paginationLink = (page: number) => {
    return `/${type}/${params.filter}?page=${page}`;
  };
  return (
    <div className="col-span-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              className="p-0 bg-white text-black hover:bg-white duration-0"
              disabled={currentPage === 1}
            >
              <Link
                href={paginationLink(currentPage - 1)}
                className="pagination-button"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
          </PaginationItem>

          {currentPage > 4 && (
            <PaginationItem>
              <Link
                href={paginationLink(currentPage - 4)}
                className="pagination-button"
              >
                {currentPage - 4}
              </Link>
            </PaginationItem>
          )}

          {currentPage > 3 && (
            <PaginationItem>
              <Link
                href={paginationLink(currentPage - 3)}
                className="pagination-button"
              >
                {currentPage - 3}
              </Link>
            </PaginationItem>
          )}

          {currentPage > 2 && (
            <PaginationItem>
              <Link
                href={paginationLink(currentPage - 2)}
                className="pagination-button"
              >
                {currentPage - 2}
              </Link>
            </PaginationItem>
          )}

          {currentPage > 1 && (
            <PaginationItem>
              <Link
                href={paginationLink(currentPage - 1)}
                className="pagination-button"
              >
                {currentPage - 1}
              </Link>
            </PaginationItem>
          )}

          <PaginationItem>
            <Link
              href={paginationLink(currentPage)}
              className="bg-slate-200 pagination-button"
            >
              {currentPage}
            </Link>
          </PaginationItem>

          <PaginationItem>
            <Link
              href={paginationLink(currentPage + 1)}
              className="pagination-button"
            >
              {currentPage + 1}
            </Link>
          </PaginationItem>

          <PaginationItem>
            <Link
              href={paginationLink(currentPage + 2)}
              className="pagination-button"
            >
              {currentPage + 2}
            </Link>
          </PaginationItem>

          <PaginationItem>
            <Link
              href={paginationLink(currentPage + 3)}
              className="pagination-button"
            >
              {currentPage + 3}
            </Link>
          </PaginationItem>

          <PaginationItem>
            <Link
              href={paginationLink(currentPage + 4)}
              className="pagination-button"
            >
              {currentPage + 4}
            </Link>
          </PaginationItem>

          <PaginationItem>
            <Link
              href={paginationLink(currentPage + 1)}
              className="pagination-button"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
