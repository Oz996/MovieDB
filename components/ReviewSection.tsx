import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Review } from "@/types";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

interface props {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: props) {
  const reviewToDisplay = reviews?.slice(0, 1);

  return (
    <section>
      <h2 className="text-2xl font-semibold py-5">Reviews</h2>
      {reviewToDisplay?.map((review) => {
        const date = new Date(review.created_at);

        const formattedDate = date.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <Card key={review.id}>
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
              <p className="">{review.content}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}