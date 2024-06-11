import SearchResults from "./components/SearchResults";

interface props {
  query: string;
  params: { query: string };
}

export default function SearchPage({ params, query }: props) {
  console.log("params", params);
  return (
    <section className="w-screen h-screen pt-24">
      <SearchResults />
    </section>
  );
}
