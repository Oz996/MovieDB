import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface props {
  play: boolean;
  trailer: string;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

export default function TrailerIframe({ play, trailer, handleClose }: props) {
  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="video-player"
          className="absolute left-[20rem] top-[5rem] z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="fixed inset-0 w-full h-full bg-black/80" />
          <div className="relative top-0 py-2 px-4 flex justify-between items-center w-[1387px] h-[4rem] text-white bg-black z-50">
            <p className="text-lg">Play Trailer</p>
            <X className="cursor-pointer" onClick={handleClose as any} />
          </div>
          <div className="z-50">
            <iframe
              className="absolute inset-0"
              width="1387"
              height="780"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              allow="autoplay"
            ></iframe>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
