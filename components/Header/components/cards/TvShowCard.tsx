import { TvShow } from "@/types";
import {
  MediaCard,
  MediaCardBody,
  MediaCardDate,
  MediaCardImage,
  MediaCardTitle,
} from "./Card";

interface props {
  tvShow: TvShow;
}

export default function TvShowCard({ tvShow }: props) {
  return (
    <MediaCard type="tv" id={tvShow.id}>
      <MediaCardImage image={tvShow.poster_path} />
      <MediaCardBody>
        <MediaCardTitle title={tvShow.name} />
        <MediaCardDate date={tvShow.first_air_date} />
      </MediaCardBody>
    </MediaCard>
  );
}
