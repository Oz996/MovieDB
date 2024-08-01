import { Movie, Review, TvShow } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ReviewCard from "./components/ReviewCard";
import classNames from "classnames";

interface props {
  movie?: Movie;
  tvShow?: TvShow;
}

export default function ReviewSection({ movie, tvShow }: props) {
  const [showAll, setShowAll] = useState(false);
  const [reviews, setReviews] = useState<Review[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const allReviews = movie?.reviews?.results || tvShow?.reviews?.results;
  const totalPages = Math.ceil(allReviews?.length! / reviewsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setReviews(allReviews?.slice(startIndex, endIndex));
  }, [currentPage, allReviews]);

  const review = reviews?.[0];

  const handleShowReviews = () => {
    setShowAll(true);
  };

  const handleHideReviews = () => {
    setShowAll(false);
  };

  const handleNextPage = () => {
    setCurrentPage((current) => current + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleClickPage = (page: number) => {
    setCurrentPage(page);
  };

  const totalArray = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (reviews?.length === 0)
    return (
      <section>
        <h2 className="text-title font-semibold py-5">Reviews</h2>
        <p>No reviews</p>
      </section>
    );

  return (
    <section>
      <h2 className="text-title font-semibold py-5">Reviews</h2>
      {showAll ? (
        <div className="space-y-5">
          {reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <Button
            onClick={handleHideReviews}
            className="bg-transparent border-none p-0 hover:bg-transparent text-black"
          >
            Show Less Reviews
            <ChevronUp size={20} />
          </Button>
          {allReviews?.length! > 5 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    className="p-0 bg-white text-black hover:bg-white duration-0 cursor-pointer"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <PaginationPrevious />
                  </Button>
                </PaginationItem>
                {totalArray().map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handleClickPage(page)}
                      className={classNames({
                        "bg-slate-200": currentPage === page,
                        "cursor-pointer": currentPage !== page,
                      })}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <Button
                    className="p-0 bg-white text-black hover:bg-white duration-0 cursor-pointer"
                    disabled={currentPage === totalPages}
                  >
                    <PaginationNext onClick={handleNextPage} />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <div>
          <ReviewCard review={review!} />

          <Button
            onClick={handleShowReviews}
            className="bg-transparent border-none p-0 hover:bg-transparent text-black"
          >
            Show All Reviews
            <ChevronDown size={20} />
          </Button>
        </div>
      )}
    </section>
  );
}
