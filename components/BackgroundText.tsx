import React from 'react';
import { motion } from 'framer-motion';

const BackgroundText: React.FC = () => {
  const columns = 8; // Number of vertical columns
  const text = "SINU XX ";
  const repeatedText = Array(20).fill(text).join("");

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-20 flex items-center justify-center">
      <div className="flex justify-around w-[200vw] h-[200vh] rotate-[-45deg] shrink-0">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="relative h-full">
            <motion.div
              initial={{ y: i % 2 === 0 ? "0%" : "-50%" }}
              animate={{ y: i % 2 === 0 ? "-50%" : "0%" }}
              transition={{
                duration: 80 + i * 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="whitespace-nowrap flex flex-col text-slate-400"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span className="text-[12rem] font-black tracking-tighter uppercase">
                {repeatedText}
              </span>
              <span className="text-[12rem] font-black tracking-tighter uppercase">
                {repeatedText}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundText;
