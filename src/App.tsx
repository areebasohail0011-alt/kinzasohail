/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StarryBackground } from './components/StarryBackground';
import { HeartSparkleTrail } from './components/HeartSparkleTrail';
import { IntroSection } from './components/IntroSection';
import { SpecialMessageSection } from './components/SpecialMessageSection';
import { LanternWishesSection } from './components/LanternWishesSection';
import { CountdownRevealSection } from './components/CountdownRevealSection';
import { InteractiveCakeSection } from './components/InteractiveCakeSection';
import { FinalLetterSection } from './components/FinalLetterSection';
import { sound } from './utils/audio';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleMusic = () => {
    const playing = sound.toggleMusic();
    setIsPlayingMusic(playing);
  };

  const handleStartJourney = () => {
    // Start music gently if not yet playing, and smoothly scroll to special message
    if (!isPlayingMusic) {
      sound.startMusic();
      setIsPlayingMusic(true);
    }
    const messageEl = document.getElementById('message');
    if (messageEl) {
      messageEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b061a] text-purple-50 selection:bg-pink-500/30 selection:text-pink-200">
      {/* Dynamic Starry Sky Background */}
      <StarryBackground />

      {/* Cute Interactive Touch & Cursor Heart Sparkle Trail */}
      <HeartSparkleTrail />

      {/* Floating Ambient Music Control (Fixed Top-Right) */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50">
        <button
          onClick={handleToggleMusic}
          aria-label={isPlayingMusic ? 'Pause birthday music' : 'Play birthday music'}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
            isPlayingMusic
              ? 'bg-pink-500/25 border-pink-400/50 text-pink-200 shadow-[0_0_25px_rgba(244,114,182,0.4)] scale-105'
              : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-purple-200/90 hover:text-white'
          }`}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wide">Melody Playing 🎶</span>
              <span className="flex gap-0.5 items-end h-3 ml-0.5">
                <span className="w-0.5 h-2 bg-pink-400 animate-bounce"></span>
                <span className="w-0.5 h-3 bg-pink-300 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-0.5 h-1.5 bg-pink-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-medium tracking-wide">Play Music 🎵</span>
            </>
          )}
        </button>
      </div>

      {/* Main Story Flow */}
      <main className="relative z-10">
        {/* Section 1: Magical Intro */}
        <IntroSection onStartJourney={handleStartJourney} />

        {/* Section 2: Special Message */}
        <SpecialMessageSection />

        {/* Section: Starlight Lantern Wishes */}
        <LanternWishesSection />

        {/* Section 5 & 6: Birthday Countdown & Big Reveal */}
        <CountdownRevealSection />

        {/* Section 7: Interactive Birthday Cake */}
        <InteractiveCakeSection />

        {/* Section 9 & 10: Final Letter & Closing Tribute */}
        <FinalLetterSection />
      </main>
    </div>
  );
}
