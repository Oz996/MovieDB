import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Movie } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Button } from "./ui/button";
import { handleDisplayImage } from "@/lib/utils";

interface props {
  movie: Movie;
}

export default function ReviewSection({ movie }: props) {
  const [expanded, setExpanded] = useState(false);
  const reviews = movie?.reviews.results;
  const review = reviews?.[0];

  const date = new Date(review?.created_at);

  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const username = review?.author_details.username ?? "Unknown";
  const rating = Math.ceil(review?.author_details.rating!) * 10;
  const image = review?.author_details.avatar_path;

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
      <Card key={review?.id} className="mr-6">
        <CardHeader>
          <div className="flex gap-5">
            <div>
              <Image
                src={handleDisplayImage("w45_and_h45_face", image)}
                height={50}
                width={50}
                alt=""
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-lg">A review by {username}</h2>
              <div className="flex gap-2 text-sm">
                {rating != null && (
                  <div className="bg-slate-800 text-white px-3 flex gap-1 items-center rounded-lg">
                    <FaStar size={10} /> <p>{rating}%</p>
                  </div>
                )}
                <span>
                  Written by <span className="font-semibold">{username}</span>{" "}
                  on {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {expanded ? (
            <>
              <p>{review?.content}</p>
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
              <p className="line-clamp-5">{review?.content}</p>
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
    </section>
  );
}
