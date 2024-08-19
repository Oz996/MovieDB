import { Review } from "@/types";
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
  reviews: Review[];
}

export default function ReviewSection({ reviews }: props) {
  const [showAll, setShowAll] = useState(false);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setReviewList(reviews.slice(startIndex, endIndex));
  }, [currentPage, reviews]);

  const review = reviewList[0];

  const handleShowReviews = () => {
    setShowAll(true);
  };

  const handleHideReviews = () => {
    if (currentPage !== 1) {
      setReviewList(reviews.slice(0, 5));
      setCurrentPage(1);
    }
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

  if (reviewList.length === 0)
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
          {reviewList.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviewList.length > 1 && (
            <Button
              onClick={handleHideReviews}
              className="bg-transparent border-none p-0 hover:bg-transparent text-black"
            >
              Show Less Reviews
              <ChevronUp size={20} />
            </Button>
          )}
          {reviews.length > 5 && (
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
          <ReviewCard review={review} />

          {reviewList.length > 1 && (
            <Button
              onClick={handleShowReviews}
              className="bg-transparent border-none p-0 hover:bg-transparent text-black"
            >
              Show All Reviews
              <ChevronDown size={20} />
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
