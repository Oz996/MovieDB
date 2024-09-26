import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";

interface props extends PropsWithChildren {
  active?: boolean;
  children: ReactNode;
}
export default function PaginationButton({ active, children }: props) {
  return (
    <Button
      className={classNames({
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent text-black hover:bg-accent hover:text-accent-foreground size-10":
          true,
        "bg-slate-200": active,
      })}
    >
      {children}
    </Button>
  );
}
