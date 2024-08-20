import {
  MediaCard,
  MediaCardBody,
  MediaCardDate,
  MediaCardImage,
  MediaCardTitle,
} from "./MediaCard";
import { Movie } from "@/types";

interface props {
  movie: Movie;
}

export default function MovieCard({ movie }: props) {
  return (
    <MediaCard type="movie" id={movie.id}>
      <MediaCardImage image={movie.poster_path} />
      <MediaCardBody>
        <MediaCardTitle title={movie.title} />
        <MediaCardDate date={movie.release_date} />
      </MediaCardBody>
    </MediaCard>
  );
}
