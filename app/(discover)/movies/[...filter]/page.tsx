import Movies from "./components/Movies";

export function generateMetadata({ params }: { params: { filter: string[] } }) {
  const capitalized = params.filter[0].slice(0, 1).toUpperCase();
  const path = capitalized + params.filter[0].slice(1).split("-").join(" ");

  return {
    title: `${path} Movies - MovieDB`,
    description: "Browse, sort and filter through movies",
  };
}

export default async function MoviesPage({
  params,
  searchParams,
}: {
  params: { filter: string[] };
  searchParams: Record<string, string>;
}) {
  return <Movies params={params} searchParams={searchParams} />;
}
