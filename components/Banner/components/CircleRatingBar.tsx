import { CircularProgressbar } from "react-circular-progressbar";

interface props {
  rating: number;
}

export default function CircleRatingBar({ rating }: props) {
  const getColor = () => {
    if (rating >= 70) {
      return "#21d07a";
    } else if (rating >= 40) {
      return "#d2d531";
    } else {
      return "#db2360";
    }
  };

  return (
    <>
      <CircularProgressbar
        value={rating!}
        text={`${rating}%`}
        styles={{
          text: {
            fontSize: "2rem",
            fill: "white",
          },
          trail: {
            opacity: "40%",
          },
          path: {
            stroke: getColor(),
          },
        }}
        className="font-semibold"
      />
      <p className="font-semibold">
        User <br /> Score
      </p>
    </>
  );
}
