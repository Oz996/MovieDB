import { useMediaQuery } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MouseEventHandler } from "react";

interface props {
  play: boolean;
  trailer: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

export default function TrailerModal({ play, trailer, handleClose }: props) {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="video-player"
          className="fixed inset-0 z-40 flex-centered"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="fixed inset-0 w-full h-full bg-black/80" />
          <div className="z-50 w-screen flex flex-col items-center justify-center">
            <div className="relative top-0 py-2 px-4 flex justify-between items-center w-[90%] max-w-[1387px] h-[3.5rem] md:h-[4rem] text-white bg-black z-50">
              <p className="text-lg">Play Trailer</p>
              <button
                onClick={handleClose}
                className="flex-centered p-3 bg-transparent hover:bg-white/20 duration-300 cursor-pointer group rounded-full"
                aria-label="Close trailer"
              >
                <X size={17} className="group-hover:opacity-70" />
              </button>
            </div>
            <iframe
              className="relative z-50 w-[90%] max-w-[1387px]"
              width={isMobile ? "800" : "1387"}
              height={isMobile ? "400" : "780"}
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              allow="autoplay"
            ></iframe>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
