import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface CandleState {
  id: number;
  isLit: boolean;
  color: string;
}

export const InteractiveCakeSection: React.FC = () => {
  const [candles, setCandles] = useState<CandleState[]>([
    { id: 1, isLit: true, color: 'from-pink-400 to-rose-500' },
    { id: 2, isLit: true, color: 'from-amber-300 to-yellow-500' },
    { id: 3, isLit: true, color: 'from-purple-400 to-indigo-500' },
    { id: 4, isLit: true, color: 'from-fuchsia-400 to-pink-500' }
  ]);

  const litCount = candles.filter((c) => c.isLit).length;
  const allBlownOut = litCount === 0;

  const blowOutCandle = (id: number) => {
    const candle = candles.find((c) => c.id === id);
    if (!candle || !candle.isLit) return;

    sound.playBlowCandle();

    const updated = candles.map((c) => (c.id === id ? { ...c, isLit: false } : c));
    setCandles(updated);

    const remaining = updated.filter((c) => c.isLit).length;
    if (remaining === 0) {
      setTimeout(() => {
        sound.playCelebrationFanfare();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#FDE047', '#F472B6', '#C084FC']
        });
      }, 300);
    }
  };

  const blowAllRemaining = () => {
    sound.playBlowCandle();
    setCandles(candles.map((c) => ({ ...c, isLit: false })));
    setTimeout(() => {
      sound.playCelebrationFanfare();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#FDE047', '#F472B6', '#C084FC']
      });
    }, 200);
  };

  return (
    <section id="cake" className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80 font-medium mb-3">
          A Birthday Tradition
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          Make A Wish, Butt Sahiba
        </h2>
        <p className="mt-3 text-sm text-purple-200/70 font-light max-w-md mx-auto">
          Close your eyes, think of the deepest desire in your heart, and tap each candle to blow it out.
        </p>

        {/* Counter indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-pink-300">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>
            {allBlownOut
              ? '✨ All candles extinguished!'
              : `Tap candles to blow them out (${litCount} left)`}
          </span>
        </div>

        {/* Interactive Cake Visual Container */}
        <div className="relative mt-12 mb-8 flex flex-col items-center">
          {/* CANDLES ROW */}
          <div className="relative z-20 flex items-end justify-center gap-6 sm:gap-10 -mb-2">
            {candles.map((candle) => (
              <div
                key={candle.id}
                onClick={() => blowOutCandle(candle.id)}
                className="group flex flex-col items-center cursor-pointer select-none"
                title={candle.isLit ? 'Tap to blow out candle' : 'Candle blown out'}
              >
                {/* Flame or Smoke Puff */}
                <div className="h-10 flex items-end justify-center relative">
                  <AnimatePresence mode="wait">
                    {candle.isLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: [1.2, 0], opacity: 0, y: -10 }}
                        className="candle-flame w-4 h-7 rounded-[50%_50%_40%_40%/70%_70%_30%_30%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_15px_#f59e0b] relative group-hover:scale-110 transition-transform"
                      >
                        {/* Inner blue base */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400/80 blur-[0.5px]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -25, scale: 1.8 }}
                        transition={{ duration: 1 }}
                        className="w-3 h-3 rounded-full bg-purple-300/40 blur-xs"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Wick */}
                <div className="w-0.5 h-2.5 bg-neutral-800" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 sm:w-4 h-16 sm:h-20 rounded-t-sm bg-gradient-to-b ${candle.color} shadow-md border-x border-white/20 relative overflow-hidden`}
                >
                  {/* Subtle decorative stripes */}
                  <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,white_4px,white_8px)]" />
                </div>
              </div>
            ))}
          </div>

          {/* CAKE LAYERS */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Top Layer */}
            <div className="w-48 sm:w-64 h-16 rounded-t-2xl bg-gradient-to-r from-pink-300 via-purple-200 to-pink-300 border-t-2 border-white/40 shadow-inner flex items-center justify-around px-4 relative overflow-hidden">
              {/* Dripping frosting effect */}
              <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-b-xl" />
              <span className="text-xs text-purple-900/60 font-serif font-semibold tracking-wider">
                ✨ BUTT SAHIBA ✨
              </span>
            </div>

            {/* Middle Layer */}
            <div className="w-64 sm:w-80 h-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 border-y border-pink-400/30 shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="flex gap-4 opacity-50">
                <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
              </div>
              {/* Frosting border */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-400/60 to-purple-400/60" />
            </div>

            {/* Bottom Base Layer */}
            <div className="w-80 sm:w-96 h-20 rounded-b-xl bg-gradient-to-r from-pink-950 via-purple-950 to-pink-950 border-b border-white/20 shadow-2xl flex items-center justify-center relative">
              <div className="text-xs text-pink-300/60 tracking-widest uppercase font-mono">
                · CELEBRATING YOU ·
              </div>
            </div>

            {/* Cake Stand / Plate */}
            <div className="w-96 sm:w-[440px] h-4 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 shadow-[0_15px_35px_rgba(0,0,0,0.6)] mt-1 border border-white/40" />
            <div className="w-40 sm:w-52 h-6 bg-gradient-to-b from-amber-200 to-amber-400 rounded-b-xl opacity-90" />
          </div>
        </div>

        {/* REQUIRED MESSAGE AFTER CANDLES DISAPPEAR */}
        <AnimatePresence>
          {allBlownOut ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 glass-card rounded-3xl p-8 max-w-xl mx-auto border border-pink-400/30 shadow-[0_15px_45px_rgba(244,114,182,0.25)]"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold">
                  Wish Whispered To The Stars
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              {/* Exact required text */}
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gradient-gold">
                "May every dream in your heart come true."
              </h3>
              <div className="mt-2 text-2xl text-pink-500 animate-pulse">❤️</div>

              <p className="mt-4 text-xs sm:text-sm text-purple-200/80 font-light">
                May this year open doors you never thought possible, bring peace into every hour, and surround you with genuine happiness.
              </p>
            </motion.div>
          ) : (
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={blowAllRemaining}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-purple-200/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <span>Blow out all at once 🌬️</span>
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
