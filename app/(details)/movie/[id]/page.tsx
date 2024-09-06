import { getMovieDetails } from "@/services/movies";
import Movie from "./components/Movie";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  return <Movie movie={movie} params={params} />;
}
