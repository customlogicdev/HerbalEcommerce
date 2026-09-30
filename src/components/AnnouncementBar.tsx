"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { announcementText } from "@/data/site";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden bg-primary text-cream"
        >
          <div className="relative mx-auto flex max-w-7xl items-center justify-center px-10 py-2.5 sm:px-6 lg:px-8">
            <p className="text-center text-[11px] font-medium tracking-wide sm:text-xs">
              {announcementText}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Dismiss announcement"
              className="absolute right-3 rounded-full p-1 text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
