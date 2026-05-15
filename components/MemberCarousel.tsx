import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

export interface Member {
  name: string;
  shift: string;
  image?: string;
}

interface MemberCarouselProps {
  members: Member[];
  isDark?: boolean;
  accentColor?: string;
}

const MemberCarousel: React.FC<MemberCarouselProps> = ({ members, isDark, accentColor = 'bg-un-accent' }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (members.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, [members.length]);

  const member = members[currentIndex];

  if (!member) return null;

  return (
    <div className="relative w-full h-[180px] md:h-[200px] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full flex flex-col items-center p-1"
        >
          <div className="w-full max-w-[110px] md:max-w-[130px] aspect-square overflow-hidden mb-2 relative group/member bg-white/70 rounded-2xl">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            ) : (
              <div className={`w-full h-full ${isDark ? 'bg-white/10' : 'bg-un-light'} flex items-center justify-center`}>
                <User className={`w-12 h-12 ${isDark ? 'text-white/40' : 'text-un-accent/60'}`} />
              </div>
            )}
          </div>
          
          <div className="text-center w-full mt-auto pt-1">
            <p className={`text-base md:text-lg font-serif font-bold leading-tight px-1 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {member.name}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      {members.length > 1 && (
        <div className="absolute bottom-2 flex gap-1.5">
          {members.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? (isDark ? `${accentColor} w-4` : `${accentColor} w-4`) : (isDark ? 'bg-white/20' : 'bg-slate-300')
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberCarousel;
