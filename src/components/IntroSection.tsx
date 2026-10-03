import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

interface IntroSectionProps {
  onStartJourney: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStartJourney }) => {
  const handleClick = () => {
    sound.playChime();
    onStartJourney();
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-16 overflow-hidden"
    >
      {/* Background magical ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-purple-700/20 via-pink-600/20 to-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating subtle hearts */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 left-10 text-pink-400/40 pointer-events-none hidden sm:block"
      >
        <Heart className="w-8 h-8 fill-pink-500/20" />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [4, -4, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-28 right-12 text-purple-400/40 pointer-events-none hidden sm:block"
      >
        <Heart className="w-10 h-10 fill-purple-500/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Main required magical intro headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold tracking-tight text-white leading-tight sm:leading-snug max-w-2xl"
          style={{ textWrap: 'balance' }}
        >
          I have something special for someone{' '}
          <span className="text-gradient-rose italic font-normal">very special...</span>{' '}
          <span className="inline-block text-pink-500 animate-pulse">❤️</span>
        </motion.h1>

        {/* Soft emotional context caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-base sm:text-lg text-purple-200/80 font-light max-w-xl leading-relaxed"
        >
          Take a slow breath, turn on the music, and let this little universe celebrate the rare, wonderful soul that you are.
        </motion.p>

        {/* Primary required Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10"
        >
          <button
            onClick={handleClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-[0_0_35px_rgba(236,72,153,0.45)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-white/25"
          >
            {/* Shimmer light sweep */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wide">✨ Start the Journey ✨</span>
          </button>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="mt-16 flex flex-col items-center gap-2 text-xs text-purple-300/60 hover:text-pink-300 transition-colors cursor-pointer"
        >
          <span>Scroll to uncover the story</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
};
