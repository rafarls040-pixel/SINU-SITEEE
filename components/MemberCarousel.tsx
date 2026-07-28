import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

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

const MemberCarousel: React.FC<MemberCarouselProps> = ({ members, isDark = true, accentColor = 'bg-un-accent' }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (members.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [members.length]);

  const member = members[currentIndex];

  if (!member) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Featured Active Director Card */}
      <div className="relative w-full flex flex-col items-center pt-2 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center group"
          >
            {/* Image Container with Glow Frame */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 group-hover:border-white/40 transition-all duration-300">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer" 
                  loading="lazy" 
                  decoding="async" 
                />
              ) : (
                <div className={`w-full h-full ${isDark ? 'bg-white/10' : 'bg-slate-100'} flex items-center justify-center`}>
                  <User className={`w-16 h-16 ${isDark ? 'text-white/40' : 'text-slate-400'}`} />
                </div>
              )}
              
              {/* Shift Badge on image */}
              {member.shift && (
                <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                  <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{member.shift}</span>
                  </span>
                </div>
              )}
            </div>
            
            {/* Name and Title */}
            <div className="space-y-1 max-w-[260px] px-2">
              <h3 className={`text-base md:text-lg font-serif font-bold leading-snug tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {member.name}
              </h3>
              <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                Membro da Mesa
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        {members.length > 1 && (
          <div className="flex items-center justify-between w-full px-2 absolute top-1/2 -translate-y-12 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all shadow-md transform hover:scale-110 active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all shadow-md transform hover:scale-110 active:scale-95"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Bar for all directors */}
      {members.length > 1 && (
        <div className="w-full pt-3 mt-2 border-t border-white/10 flex items-center justify-center gap-2 flex-wrap">
          {members.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative group p-0.5 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'ring-2 ring-white scale-110 shadow-lg' 
                  : 'opacity-50 hover:opacity-100 hover:scale-105'
              }`}
              title={m.name}
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-800 border border-white/20">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                    {m.name.charAt(0)}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberCarousel;
