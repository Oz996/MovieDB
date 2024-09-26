import TvShows from "./components/TvShows";

export function generateMetadata({ params }: { params: { filter: string[] } }) {
  const capitalized = params.filter[0].slice(0, 1).toUpperCase();
  const path = capitalized + params.filter[0].slice(1).split("-").join(" ");

  return {
    title: `${path} TV Shows - MovieDB`,
    description: "Browse, sort and filter through tv shows",
  };
}

export default async function TvShowsPage({
  params,
  searchParams,
}: {
  params: { filter: string[] };
  searchParams: Record<string, string>;
}) {
  return <TvShows params={params} searchParams={searchParams} />;
}
