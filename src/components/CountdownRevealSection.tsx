import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, PartyPopper, Play } from 'lucide-react';
import { sound } from '../utils/audio';

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  duration: number;
}

export const CountdownRevealSection: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'counting' | 'revealed'>('idle');
  const [count, setCount] = useState<number>(3);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate floating balloons for the reveal
  const generateBalloons = () => {
    const colors = [
      'from-pink-500 to-rose-400',
      'from-purple-500 to-indigo-400',
      'from-amber-400 to-yellow-300',
      'from-fuchsia-500 to-pink-400',
      'from-violet-400 to-purple-300'
    ];
    const newBalloons: Balloon[] = [];
    for (let i = 0; i < 15; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * 90 + 5,
        color: colors[i % colors.length],
        delay: Math.random() * 3,
        size: Math.random() * 20 + 38,
        duration: Math.random() * 6 + 10
      });
    }
    setBalloons(newBalloons);
  };

  const triggerConfettiShow = () => {
    sound.playCelebrationFanfare();

    // Cannon 1: Left
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#F472B6', '#C084FC', '#FBBF24', '#FFFFFF', '#FB7185']
    });

    // Cannon 2: Right
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#F472B6', '#C084FC', '#FBBF24', '#FFFFFF', '#FB7185']
    });

    // Central fireworks burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FDE047', '#E879F9', '#38BDF8', '#F472B6']
      });
    }, 400);

    // Continuous starry bursts
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { x: 0.5, y: 0.35 },
        shapes: ['circle'],
        scalar: 1.2,
        colors: ['#FBBF24', '#F472B6', '#E9D5FF']
      });
    }, 900);
  };

  const startCountdown = () => {
    sound.playChime();
    setStage('counting');
    setCount(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCount(current);
        sound.playChime();
      } else {
        clearInterval(interval);
        setStage('revealed');
        generateBalloons();
        triggerConfettiShow();
      }
    }, 1000);
  };

  // Optional trigger on scroll into view if idle
  const handleViewportEnter = () => {
    if (stage === 'idle') {
      startCountdown();
    }
  };

  return (
    <section
      id="reveal"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background radial celebratory glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-amber-400/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating balloons during reveal */}
      {stage === 'revealed' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: '120vh', opacity: 0 }}
              animate={{ y: '-40vh', opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ left: `${b.x}%`, width: `${b.size}px` }}
              className="absolute flex flex-col items-center"
            >
              {/* Balloon Body */}
              <div
                className={`w-full aspect-[4/5] rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br ${b.color} shadow-lg shadow-pink-500/20 opacity-80 backdrop-blur-sm relative`}
              >
                <div className="absolute top-2 left-2 w-2 h-3 bg-white/40 rounded-full blur-[0.5px]" />
              </div>
              {/* String */}
              <div className="w-[1px] h-12 bg-white/30" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Invisible trigger on view */}
        <motion.div
          onViewportEnter={handleViewportEnter}
          viewport={{ once: true, amount: 0.6 }}
        />

        {/* STAGE 1: IDLE / READY TO COUNTDOWN */}
        {stage === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-pink-300 font-medium mb-3">
              The Grand Moment
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mb-6">
              Are You Ready, Butt Sahiba?
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 max-w-md mb-8">
              A grand celebration is waiting to unfold just for you.
            </p>
            <button
              onClick={startCountdown}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Begin Countdown</span>
            </button>
          </motion.div>
        )}

        {/* STAGE 2: COUNTDOWN (3... 2... 1...) */}
        {stage === 'counting' && (
          <div className="flex flex-col items-center justify-center min-h-[350px]">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-300/80 mb-6 font-semibold">
              Get Ready For Magic...
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.6, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center"
              >
                {/* Glowing ring */}
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-pink-400/40 animate-ping absolute" />
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-amber-300/20 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.5)]">
                  <span className="text-6xl sm:text-8xl font-serif-luxury font-bold text-gradient-gold">
                    {count}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 mt-8 text-xs text-purple-300/60">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unlocking celebration...</span>
            </div>
          </div>
        )}

        {/* STAGE 3: BIG REVEAL */}
        {stage === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Sparkle banner */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-sm font-medium mb-6 shadow-[0_0_20px_rgba(244,114,182,0.3)] backdrop-blur-md"
            >
              <PartyPopper className="w-4 h-4 text-amber-300" />
              <span className="tracking-widest uppercase text-xs">Today Belongs To You</span>
              <PartyPopper className="w-4 h-4 text-amber-300" />
            </motion.div>

            {/* Exactly as requested in prompt */}
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury font-black tracking-wider text-white"
            >
              🎉 HAPPY BIRTHDAY 🎉
            </motion.h2>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury font-black text-gradient-gold tracking-widest drop-shadow-[0_0_35px_rgba(251,191,36,0.4)]">
                BUTT SAHIBA
              </h1>
              <span className="text-4xl sm:text-6xl text-pink-500 animate-pulse">❤️</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-base sm:text-xl text-purple-100 font-light max-w-xl mx-auto leading-relaxed"
            >
              May this day be as magnificent, radiant, and joyous as the light you bring into the world!
            </motion.p>

            {/* Interactive Celebration Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={triggerConfettiShow}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 shadow-[0_0_25px_rgba(244,114,182,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <PartyPopper className="w-4 h-4 text-amber-300" />
                <span>Launch More Confetti 🎊</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
