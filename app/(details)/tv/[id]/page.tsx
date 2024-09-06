import { getTvShowDetails } from "@/services/tvShows";
import TvShow from "./components/TvShow";

export default async function TvShowPage({
  params,
}: {
  params: { id: string };
}) {
  const tvShow = await getTvShowDetails(params.id);

  return <TvShow tvShow={tvShow} params={params} />;
}
