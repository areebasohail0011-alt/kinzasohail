import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const SpecialMessageSection: React.FC = () => {
  return (
    <section id="message" className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section title header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80 font-medium mb-3">
            A Thought From The Heart
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            For My Dearest Friend
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Glassmorphic message container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle decorative quote icon */}
          <Quote className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 text-pink-400/15 pointer-events-none rotate-180" />
          <Quote className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 text-purple-400/15 pointer-events-none" />

          {/* Golden corner flourishes */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-300/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-300/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-300/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-300/40 rounded-br-2xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Greeting */}
            <span className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-semibold text-gradient-gold tracking-wide mb-6">
              Dear Butt Sahiba,
            </span>

            {/* Exactly as requested in prompt */}
            <p className="text-lg sm:text-2xl md:text-3xl font-serif-luxury font-normal text-purple-50 leading-relaxed max-w-2xl text-center italic">
              "Your friendship makes life brighter, happier, and more beautiful. No matter where life takes us, your kindness and memories will always hold a special place in my heart."
            </p>

            <div className="flex items-center gap-2 mt-6">
              <span className="text-2xl text-pink-500 animate-pulse">❤️</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Meaningful Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="glass-card rounded-2xl p-5 text-center border border-white/[0.07]">
            <span className="text-xl mb-2 block">✨</span>
            <h4 className="text-sm font-semibold text-white mb-1">Brighter Days</h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Every conversation with you brings warmth, laughter, and an easy peace of mind.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center border border-white/[0.07]">
            <span className="text-xl mb-2 block">🌸</span>
            <h4 className="text-sm font-semibold text-white mb-1">True Kindness</h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              The gentle sincerity and grace with which you treat everyone around you is rare.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center border border-white/[0.07]">
            <span className="text-xl mb-2 block">💎</span>
            <h4 className="text-sm font-semibold text-white mb-1">Lifelong Bond</h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Memories etched deeply into time, valued and treasured through every season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
