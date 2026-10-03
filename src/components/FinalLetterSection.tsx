import React from 'react';
import { motion } from 'motion/react';
import { Mail, Heart } from 'lucide-react';

export const FinalLetterSection: React.FC = () => {
  return (
    <section id="letter" className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-700/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80 font-medium mb-3">
            A Handwritten Keepsake
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            The Birthday Letter
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Envelope & Parchment */}
          <div className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-16 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Top Ornamental Foil */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 text-xs text-pink-300/70 font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>CONFIDENTIAL & SPECIAL</span>
              </span>
              <span>EST. LIFELONG FRIENDSHIP</span>
            </div>

            {/* Letter Body - Exact copy as requested */}
            <div className="space-y-6 text-purple-100 font-serif-luxury text-lg sm:text-xl md:text-2xl leading-relaxed">
              <p className="text-2xl sm:text-3xl font-bold text-gradient-gold">
                Dear Butt Sahiba,
              </p>

              <p className="font-light">
                Thank you for being such a wonderful friend and for filling life with beautiful memories.
              </p>

              <p className="font-light">
                On your special day, I wish you happiness, success, good health, peace, and countless reasons to smile.
              </p>

              <p className="font-light">
                May this new year of your life bring endless joy and unforgettable moments.
              </p>

              <div className="pt-2 flex items-center gap-2 text-2xl font-bold text-white">
                <span>Happy Birthday!</span>
                <span className="text-pink-500 animate-pulse">❤️</span>
              </div>

              {/* Signature Block */}
              <div className="pt-8 border-t border-white/10 flex flex-col items-end">
                <span className="text-sm font-sans text-purple-300/70 mb-1">
                  With lots of love,
                </span>
                <span className="font-script text-3xl sm:text-4xl text-gradient-gold">
                  Your Friend
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beautiful Closing Tribute Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg sm:text-2xl font-serif-luxury font-normal text-purple-200/90 leading-relaxed italic">
            "This little website may close,
            <br />
            but my good wishes for you will always remain."
          </p>

          <div className="mt-3 flex justify-center">
            <span className="text-2xl text-pink-500 animate-pulse">❤️</span>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-gradient-gold tracking-wide">
              🎂 Happy Birthday, Butt Sahiba! 🎂
            </h3>
          </div>
        </motion.div>

        {/* Quiet Footer */}
        <footer className="mt-16 text-xs text-purple-300/50 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] pt-8">
          <div className="flex items-center gap-2">
            <span>Crafted with love for Butt Sahiba</span>
            <span>·</span>
            <span>Forever Celebrated</span>
          </div>
          <div>
            <span>✨ Wishing you all the joy in the world ✨</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
