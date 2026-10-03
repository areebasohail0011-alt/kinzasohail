import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface Lantern {
  id: number;
  title: string;
  wish: string;
  blessingTitle: string;
  arabicName: string;
  accentColor: string;
  glowColor: string;
  flameGrad: string;
  flameCore: string;
}

const LANTERNS: Lantern[] = [
  {
    id: 1,
    title: 'Peace & Serenity',
    arabicName: 'سکون و عافیت',
    blessingTitle: 'A Heart Full of Peace 🕊️',
    wish: 'May your heart always remain as calm, tranquil, and light as the gentle evening breeze, free from any worry or sorrow.',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    flameGrad: 'from-amber-500 via-yellow-300 to-white',
    flameCore: '#FFFBEB'
  },
  {
    id: 2,
    title: 'Success & Victory',
    arabicName: 'کامیابی و فتح',
    blessingTitle: 'Boundless Success & Growth 🌟',
    wish: 'May every door of opportunity open effortlessly for you, and may every ambition you pursue turn into a shining triumph.',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.65)',
    flameGrad: 'from-pink-500 via-rose-300 to-white',
    flameCore: '#FDF2F8'
  },
  {
    id: 3,
    title: 'Health & Vitality',
    arabicName: 'صحت و تندرستی',
    blessingTitle: 'Radiant Health & Long Life 🌿',
    wish: 'May you always be blessed with good health, glowing energy, peace of mind, and countless seasons of happiness.',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.65)',
    flameGrad: 'from-purple-500 via-indigo-300 to-white',
    flameCore: '#FAF5FF'
  },
  {
    id: 4,
    title: 'Love & True Friends',
    arabicName: 'محبت و مخلصی',
    blessingTitle: 'Cherished Beyond Measure 💖',
    wish: 'May you always be surrounded by genuine people who appreciate, protect, and celebrate your rare and golden heart.',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.65)',
    flameGrad: 'from-rose-500 via-pink-300 to-white',
    flameCore: '#FFF1F2'
  },
  {
    id: 5,
    title: 'Silent Prayers',
    arabicName: 'قبولیتِ دعا',
    blessingTitle: 'Answered Secret Prayers 🌙',
    wish: 'May the quietest prayers and deepest wishes whispered in your heart find their answers in the most beautiful, miraculous ways.',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.65)',
    flameGrad: 'from-yellow-500 via-amber-200 to-white',
    flameCore: '#FEFCE8'
  }
];

export const LanternWishesSection: React.FC = () => {
  const [litIds, setLitIds] = useState<number[]>([]);
  const [activeWish, setActiveWish] = useState<Lantern | null>(null);

  const handleLanternClick = (lantern: Lantern) => {
    sound.playChime();

    if (!litIds.includes(lantern.id)) {
      const updated = [...litIds, lantern.id];
      setLitIds(updated);

      if (updated.length === LANTERNS.length) {
        setTimeout(() => {
          sound.playCelebrationFanfare();
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { x: 0.5, y: 0.6 },
            colors: ['#FDE047', '#F472B6', '#C084FC', '#FBBF24']
          });
        }, 300);
      }
    }

    setActiveWish(lantern);
  };

  return (
    <section id="lanterns" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-purple-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80 font-medium mb-3">
          Royal Starlight Lanterns
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          Touch A Lantern To Light It Up & Reveal A Wish
        </h2>
        <p className="mt-3 text-sm text-purple-200/70 font-light max-w-lg mx-auto">
          Each ornate Moroccan lantern holds a special birthday blessing for Butt Sahiba. Tap each lantern to ignite its golden flame.
        </p>

        {/* Lanterns Showcase Grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {LANTERNS.map((lantern, index) => {
            const isLit = litIds.includes(lantern.id);
            const isSelected = activeWish?.id === lantern.id;

            return (
              <motion.div
                key={lantern.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                whileHover={{ y: -10 }}
                onClick={() => handleLanternClick(lantern)}
                className="group flex flex-col items-center cursor-pointer select-none relative"
              >
                {/* Golden Hanging Chain with Ring */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-500 ${
                      isLit ? 'border-amber-300 shadow-[0_0_8px_#f59e0b]' : 'border-amber-400/30'
                    }`}
                  />
                  <div
                    className={`w-[1.5px] h-6 transition-colors duration-500 ${
                      isLit
                        ? 'bg-gradient-to-b from-amber-300 to-amber-200 shadow-[0_0_6px_#f59e0b]'
                        : 'bg-amber-400/20'
                    }`}
                  />
                </div>

                {/* ORNATE ROYAL LANTERN BODY */}
                <div className="relative flex flex-col items-center">
                  {/* Decorative Dome Top with Crescent Finial */}
                  <div className="relative z-10 flex flex-col items-center -mb-0.5">
                    {/* Tiny finial point */}
                    <div
                      className={`w-1.5 h-2.5 rounded-full transition-all duration-500 ${
                        isLit
                          ? 'bg-gradient-to-t from-amber-300 to-yellow-100 shadow-[0_0_8px_#fcd34d]'
                          : 'bg-amber-700/60'
                      }`}
                    />
                    {/* Dome Curve */}
                    <div
                      className={`w-14 sm:w-16 h-5 rounded-t-full transition-all duration-500 border-t border-x relative overflow-hidden ${
                        isLit
                          ? 'bg-gradient-to-b from-amber-300 via-amber-500 to-yellow-600 border-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                          : 'bg-gradient-to-b from-neutral-800 via-amber-950/60 to-neutral-900 border-amber-500/20'
                      }`}
                    >
                      {/* Dome embossed ribs */}
                      <div className="absolute inset-0 flex justify-around opacity-30">
                        <div className="w-[1px] h-full bg-white" />
                        <div className="w-[1px] h-full bg-white" />
                        <div className="w-[1px] h-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* GLASS LANTERN HOUSING */}
                  <div
                    className={`relative w-24 sm:w-28 h-36 sm:h-40 rounded-[22px] border-2 transition-all duration-700 flex flex-col items-center justify-between p-2 backdrop-blur-md overflow-hidden ${
                      isLit
                        ? 'bg-gradient-to-b from-amber-400/20 via-pink-500/10 to-amber-600/25 border-amber-300/80'
                        : 'bg-gradient-to-b from-white/[0.04] via-black/40 to-white/[0.02] border-amber-400/25 hover:border-amber-400/50'
                    } ${isSelected ? 'ring-2 ring-pink-400 ring-offset-2 ring-offset-[#0b061a]' : ''}`}
                    style={{
                      boxShadow: isLit
                        ? `0 0 45px ${lantern.glowColor}, inset 0 0 25px rgba(251, 191, 36, 0.35)`
                        : '0 10px 25px rgba(0,0,0,0.5)'
                    }}
                  >
                    {/* Moroccan Arch Windows filigree overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                      {/* Left Arch */}
                      <div
                        className={`absolute top-2 left-2 bottom-2 w-5 rounded-t-full border border-dashed ${
                          isLit ? 'border-amber-200/40' : 'border-white/10'
                        }`}
                      />
                      {/* Right Arch */}
                      <div
                        className={`absolute top-2 right-2 bottom-2 w-5 rounded-t-full border border-dashed ${
                          isLit ? 'border-amber-200/40' : 'border-white/10'
                        }`}
                      />
                      {/* Center Arch */}
                      <div
                        className={`absolute top-1 inset-x-5 bottom-1 rounded-t-full border ${
                          isLit ? 'border-amber-200/50' : 'border-white/15'
                        }`}
                      />
                    </div>

                    {/* Subtle warm glow aura when lit */}
                    {isLit && (
                      <div className="absolute inset-0 bg-radial from-amber-300/35 via-transparent to-transparent animate-pulse pointer-events-none" />
                    )}

                    {/* Top inner golden ring */}
                    <div
                      className={`w-14 h-1.5 rounded-full transition-colors duration-500 z-10 ${
                        isLit ? 'bg-amber-300 shadow-xs' : 'bg-amber-600/30'
                      }`}
                    />

                    {/* INNER FLAME & CANDLE */}
                    <div className="relative flex-1 w-full flex items-center justify-center z-10">
                      <AnimatePresence mode="wait">
                        {isLit ? (
                          <motion.div
                            key="lit-flame"
                            initial={{ scale: 0, opacity: 0, y: 15 }}
                            animate={{ scale: [1, 1.15, 0.95, 1], opacity: 1, y: 0 }}
                            transition={{
                              scale: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
                            }}
                            className="relative flex flex-col items-center"
                          >
                            {/* Outer luminous glow aura */}
                            <div className="absolute -inset-2 bg-amber-400/40 rounded-full blur-md animate-pulse" />

                            {/* Flame Shape with dynamic gradient */}
                            <div
                              className={`candle-flame w-6 h-10 rounded-[50%_50%_40%_40%/70%_70%_30%_30%] bg-gradient-to-t ${lantern.flameGrad} shadow-[0_0_25px_#f59e0b] relative z-10`}
                            >
                              {/* Blueish pure base */}
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400/80 blur-[0.5px]" />
                            </div>

                            {/* Candle Stem */}
                            <div className="w-3 h-7 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-t-xs -mt-1 shadow-md border-x border-amber-300/30" />
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center opacity-40 group-hover:opacity-75 transition-opacity">
                            {/* Dormant wick */}
                            <div className="w-0.5 h-2 bg-neutral-500 rounded-t-full mb-0.5" />
                            {/* Dark unlit candle */}
                            <div className="w-3 h-7 bg-gradient-to-b from-white/20 to-white/10 rounded-t-xs border-x border-white/10" />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom inner golden ring */}
                    <div
                      className={`w-14 h-1.5 rounded-full transition-colors duration-500 z-10 ${
                        isLit ? 'bg-amber-300 shadow-xs' : 'bg-amber-600/30'
                      }`}
                    />
                  </div>

                  {/* Ornate Base & Finial */}
                  <div
                    className={`w-16 sm:w-18 h-4 rounded-b-xl border-b border-x transition-colors duration-500 relative flex justify-center -mt-0.5 ${
                      isLit
                        ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 border-amber-200 shadow-[0_4px_10px_rgba(251,191,36,0.3)]'
                        : 'bg-gradient-to-t from-neutral-900 via-amber-950/60 to-neutral-800 border-amber-500/20'
                    }`}
                  >
                    {/* Hanging Silk Tassel */}
                    <div className="absolute top-full flex flex-col items-center pt-0.5">
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                          isLit ? 'bg-amber-300 shadow-[0_0_6px_#f59e0b]' : 'bg-amber-600/40'
                        }`}
                      />
                      <div
                        className={`w-[1px] h-4 transition-colors duration-500 ${
                          isLit ? 'bg-amber-300' : 'bg-amber-600/30'
                        }`}
                      />
                      <div
                        className={`w-2 h-4 rounded-b-xs transition-colors duration-500 ${
                          isLit
                            ? 'bg-gradient-to-b from-amber-300 to-amber-500 shadow-xs'
                            : 'bg-amber-700/30'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Lantern Labels */}
                <div className="mt-8 flex flex-col items-center">
                  <span
                    className={`text-xs font-serif-luxury tracking-wide transition-colors ${
                      isLit ? 'text-amber-200 font-semibold' : 'text-purple-200/70 group-hover:text-white'
                    }`}
                  >
                    {lantern.title}
                  </span>
                  <span className="text-[10px] text-pink-300/70 mt-0.5 font-script text-xs">
                    {lantern.arabicName}
                  </span>
                  <span className="text-[10px] text-purple-300/50 mt-0.5">
                    {isLit ? '✨ Illuminated' : 'Tap to Light Up'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Revealed Wish Presentation Card */}
        <div className="mt-14 min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeWish ? (
              <motion.div
                key={activeWish.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl w-full glass-card rounded-3xl p-6 sm:p-8 border border-amber-300/40 shadow-[0_20px_50px_rgba(251,191,36,0.2)] text-center relative overflow-hidden"
              >
                {/* Background accent */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-pink-500/10 to-transparent pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-medium mb-3 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{activeWish.blessingTitle}</span>
                  </div>

                  <p className="text-base sm:text-xl font-serif-luxury font-normal text-purple-50 leading-relaxed italic">
                    "{activeWish.wish}"
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-pink-300/90">
                    <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
                    <span>From the bottom of my heart for Butt Sahiba</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-xs sm:text-sm text-purple-300/60 italic flex items-center gap-2 bg-white/[0.03] px-5 py-3 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Tap any dormant lantern above to light its flame and unveil its unique wish!</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
