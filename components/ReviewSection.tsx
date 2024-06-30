import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Movie, Review } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Button } from "./ui/button";

interface props {
  movie: Movie;
}

export default function ReviewSection({ movie }: props) {
  const [expanded, setExpanded] = useState(false);
  const reviews = movie?.reviews.results;
  const reviewToDisplay = reviews?.slice(0, 1);

  const handleExpandCard = () => {
    setExpanded(true);
  };

  const handleCloseCard = () => {
    setExpanded(false);
  };

  return (
    <section>
      <h2 className="text-title font-semibold py-5">Reviews</h2>
      {reviews?.length === 0 && <p>No reviews</p>}
      {reviewToDisplay?.map((review) => {
        const date = new Date(review.created_at);

        const formattedDate = date.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <Card key={review.id} className="mr-6">
            <CardHeader>
              <div className="flex gap-5">
                <div>
                  <Image
                    src={`https://media.themoviedb.org/t/p/w45_and_h45_face${review.author_details.avatar_path}`}
                    height={50}
                    width={50}
                    alt=""
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-lg">
                    A review by {review.author_details.name}
                  </h2>
                  {review.author_details.rating !== null && (
                    <div className="bg-slate-800 text-white p-2 flex gap-1 items-center rounded-lg">
                      <FaStar /> <p>{review.author_details.rating}</p>
                    </div>
                  )}
                  <p className="text-sm">
                    Written by{" "}
                    <span className="font-semibold">
                      {review.author_details.name}
                    </span>{" "}
                    on {formattedDate}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {expanded ? (
                <>
                  <p>{review.content}</p>
                  <Button
                    onClick={handleCloseCard}
                    className="bg-transparent border-none p-0 hover:bg-transparent text-black"
                  >
                    show less
                    <ChevronUp size={20} />
                  </Button>
                </>
              ) : (
                <>
                  <p className="line-clamp-5">{review.content}</p>
                  <Button
                    onClick={handleExpandCard}
                    className="bg-transparent border-none p-0 hover:bg-transparent text-black"
                  >
                    show more
                    <ChevronDown size={20} />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
