import { Movie, TvShow } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import ReviewCard from "./components/ReviewCard";
import { AnimatePresence, motion } from "framer-motion";

interface props {
  movie?: Movie;
  tvShow?: TvShow;
}

export default function ReviewSection({ movie, tvShow }: props) {
  const [showAll, setShowAll] = useState(false);

  const reviews = movie?.reviews?.results || tvShow?.reviews?.results;
  console.log("rev", reviews);
  const review = reviews?.[0];

  const handleShowReviews = () => {
    setShowAll(true);
  };

  const handleHideReviews = () => {
    setShowAll(false);
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
