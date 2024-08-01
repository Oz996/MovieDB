import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate, handleDisplayImage } from "@/lib/utils";
import { Review } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";

interface props {
  review: Review;
}

export default function ReviewCard({ review }: props) {
  const [expanded, setExpanded] = useState(false);

  const username = review?.author_details?.username ?? "Unknown";
  const rating = review?.author_details?.rating
    ? Math.ceil(review?.author_details?.rating) * 10
    : null;
  const image = review?.author_details?.avatar_path;

  const longReview = review?.content.length > 677;

  const handleExpandCard = () => {
    setExpanded(true);
  };

  const handleCloseCard = () => {
    setExpanded(false);
  };

  return (
    <Card className="mr-6">
      <CardHeader>
        <div className="flex gap-5">
          <div>
            <Image
              src={handleDisplayImage("w45_and_h45_face", image!)}
              height={50}
              width={50}
              alt=""
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">A review by {username}</h2>
            <div className="flex gap-2 text-sm max-md:items-start">
              {rating && (
                <div className="bg-slate-800 text-white px-3 flex gap-1 items-center rounded-lg">
                  <FaStar size={10} /> <p>{rating}%</p>
                </div>
              )}
              <span>
                Written by <span className="font-semibold">{username}</span> on{" "}
                {formatDate(review?.created_at!)}
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
              Show Less
              <ChevronUp size={20} />
            </Button>
          </>
        ) : (
          <>
            <p className="line-clamp-5">{review?.content}</p>
            {longReview && (
              <Button
                onClick={handleExpandCard}
                className="bg-transparent border-none p-0 hover:bg-transparent text-black"
              >
                Show More
                <ChevronDown size={20} />
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
