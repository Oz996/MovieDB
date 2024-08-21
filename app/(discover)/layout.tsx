import { DiscoverContainer } from "./components/DiscoverContainer";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiscoverContainer>{children}</DiscoverContainer>;
}
