"use client";
import { getBaseUrl } from "@/lib/utils";
import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

interface props {
  main?: boolean;
  type: string;
  id: number;
  children: ReactNode;
}
export default function SearchLink({ id, main, type, children }: props) {
  return (
    <Link
      href={getBaseUrl() + `/${type}/${id}`}
      className={classNames({
        "w-[5.5rem] h-32 lg:w-28 lg:h-40 flex-shrink-0": main,
        "w-full": !main,
      })}
    >
      {children}
    </Link>
  );
}
