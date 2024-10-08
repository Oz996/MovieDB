import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface props {
  link: string;
  website: Socials;
}

type Socials = "facebook" | "twitter" | "instagram" | "homepage";

export default function ExternalLink({ link, website }: props) {
  const handleIcon = () => {
    switch (website) {
      case "facebook":
        return <FaFacebook size={25} />;
      case "twitter":
        return <FaTwitter size={25} />;
      case "instagram":
        return <FaInstagram size={25} />;
      case "homepage":
        return <FaLink size={23} />;
    }
  };

  const homepage = website === "homepage";
  const navigationLink = homepage ? link : `https://www.${website}.com/${link}`;

  return (
    <div className={homepage ? "border-l pl-4" : ""}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href={navigationLink} target="_blank" rel="noopener noreferrer">
              {handleIcon()}
            </a>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white border-none">
            <p className="text-lg capitalize">{`visit ${website}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
