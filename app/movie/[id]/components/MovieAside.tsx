import { ExternalLinks as ILinks, Keyword } from "@/types";
import { formatToDollars } from "@/lib/utils";
import ExternalLinks from "@/components/ExternalLinks/ExternalLinks";

interface props {
  links: ILinks;
  status: string;
  budget: number;
  revenue: number;
  keywords: Keyword[];
  language: string;
  homepage: string;
}

export default function MovieAside({
  links,
  keywords,
  status,
  language,
  budget,
  revenue,
  homepage,
}: props) {
  return (
    <aside>
      <div className="flex flex-col gap-4 pt-12 w-[15rem]">
        <ExternalLinks links={links} homepage={homepage} />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Status</p>
          <p>{status}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Original Language</p>
          <p>{language}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold">Budget</p>
          <p>{formatToDollars(budget)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Revenue</p>
          <p>{formatToDollars(revenue)}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Keywords</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {keywords?.map((keyword) => (
              <div
                key={keyword.id}
                className="rounded-lg py-1 px-3 bg-gray-200"
              >
                <p>{keyword.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
