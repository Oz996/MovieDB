import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface props {
  currentPage: number;
  url: URL;
}

export default function DiscoverPagination({ currentPage, url }: props) {
  const router = useRouter();

  const paginationLink = (page: number) => {
    if (!url) return "/";
    url?.searchParams.set("page", page.toString());
    return url?.toString();
  };
  return (
    <div className="p-10">
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
