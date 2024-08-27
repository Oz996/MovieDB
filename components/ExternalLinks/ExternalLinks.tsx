import { ExternalLinks as ILinks } from "@/types";
import ExternalLink from "./components/ExternalLink";

interface props {
  links: ILinks;
  homepage: string;
}

export default function ExternalLinks({ links, homepage }: props) {
  return (
    <div className="flex gap-5">
      {links?.facebook_id && (
        <ExternalLink link={links?.facebook_id} website="facebook" />
      )}
      {links?.twitter_id && (
        <ExternalLink link={links?.twitter_id} website="twitter" />
      )}
      {links?.instagram_id && (
        <ExternalLink link={links?.instagram_id} website="instagram" />
      )}
      {homepage && <ExternalLink link={homepage} website="homepage" />}
    </div>
  );
}
