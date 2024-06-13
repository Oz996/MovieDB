import { SearchContextProvider } from "@/context/SearchContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <SearchContextProvider>{children}</SearchContextProvider>;
}
