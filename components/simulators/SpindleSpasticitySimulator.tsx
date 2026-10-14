'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Activity, Zap, Cpu } from 'lucide-react';

export default function SpindleSpasticitySimulator() {
  const [velocity, setVelocity] = useState<number>(30); // mm/s
  const [isUmnLesion, setIsUmnLesion] = useState<boolean>(true);
  const [alphaGammaActive, setAlphaGammaActive] = useState<boolean>(true);
  const [isPlayingDdk, setIsPlayingDdk] = useState<boolean>(false);
  const [ddkCount, setDdkCount] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Ia firing rate increases with velocity
  const iaFiringRate = Math.min(180, Math.round(velocity * 1.5 + (alphaGammaActive ? 25 : 0)));
  
  // In UMN lesion, lack of cortical inhibition leads to hyper-reflexia at high velocities
  const isSpasticCatch = isUmnLesion && velocity > 55;
  const resistanceLevel = isUmnLesion
    ? Math.min(100, Math.round((velocity / 100) * 120))
    : Math.round(velocity * 0.25 + 15);

  const handleTestDDK = () => {
    setIsPlayingDdk(true);
    setDdkCount(0);
    setIsLocked(false);

    let current = 0;
    const intervalTime = Math.max(120, 500 - velocity * 3.5);

    const timer = setInterval(() => {
      current += 1;
      setDdkCount(current);

      if (isUmnLesion && velocity > 55 && current >= 2) {
        setIsLocked(true);
        clearInterval(timer);
        setTimeout(() => setIsPlayingDdk(false), 2000);
      } else if (current >= 8) {
        clearInterval(timer);
        setIsPlayingDdk(false);
      }
    }, intervalTime);
  };

  const handleReset = () => {
    setVelocity(30);
    setIsLocked(false);
    setIsPlayingDdk(false);
    setDdkCount(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-400">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              شبیه‌ساز بیوفیزیک دوک عضلانی و تست دیادوکوکینسیس (DDK)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            بررسی اثر سرعت کشش (Velocity-Dependent) بر شلیک فیبرهای Ia و قفل شدن زبان در دیس‌آرتری اسپاستیک
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUmnLesion(!isUmnLesion)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              isUmnLesion
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {isUmnLesion ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            {isUmnLesion ? 'وضعیت بالینی: ضایعه UMN (سکته)' : 'وضعیت طبیعی: نورون سالم'}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="بازنشانی شبیه‌ساز"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Controls & Spindle Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Controls & Sliders */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-200">
                سرعت کشش عضله زبان (Velocity):
              </label>
              <span className="font-mono text-cyan-400 text-sm font-bold bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/50">
                {velocity} mm/s
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>حرکت آرام (آهسته)</span>
              <span>حرکت متوسط</span>
              <span className="text-rose-400 font-semibold">تکرار فوق‌سریع (/kala/)</span>
            </div>
          </div>

          {/* Alpha-Gamma Switch */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  همانقباضی آلفا-گاما (Coactivation)
                </span>
                <span className="text-[11px] text-slate-400">
                  سفت نگه داشتن دوک حین انقباض اصلی
                </span>
              </div>
              <button
                onClick={() => setAlphaGammaActive(!alphaGammaActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  alphaGammaActive ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    alphaGammaActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* DDK Live Trigger Test */}
          <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                تست گفتاری دیادوکوکینسیس (DDK Test)
              </span>
              <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                تکرار: {ddkCount} / 8
              </span>
            </div>

            <button
              onClick={handleTestDDK}
              disabled={isPlayingDdk}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isPlayingDdk
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95'
              }`}
            >
              <Play className="w-4 h-4" />
              {isPlayingDdk ? 'در حال اجرای تست DDK...' : 'شروع تست سریع هجاهای /ka-la/'}
            </button>

            {/* Lockout status alert */}
            {isLocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2.5 bg-rose-500/20 border border-rose-500/60 rounded-lg text-rose-300 text-xs flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <div>
                  <span className="font-bold block">پدیده قفل شدن زبان (Tongue Lockup)!</span>
                  <span>به دلیل سرعت بالا، دوک بیش از حد شلیک کرده و زبان دچار اسپاسم دفاعی شد.</span>
                </div>
              </motion.div>
            )}

            {!isLocked && ddkCount >= 8 && (
              <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>حرکت روان و بدون گیر کردن هجاها به پایان رسید.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Biomechanical & Neural Diagram */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Spindle Visualizer Canvas */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                نمودار شلیک آوران حسی Ia و پاسخ حرکتی نورون آلفا
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                نرخ تخلیه Ia: {iaFiringRate} Hz
              </span>
            </div>

            {/* Spindle Graphic Box */}
            <div className="h-32 bg-slate-900/90 rounded-lg border border-slate-800 p-3 relative flex items-center justify-center overflow-hidden">
              {/* Muscle fibers representation */}
              <div className="w-full flex flex-col gap-2 relative">
                {/* Extrafusal Fiber */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 w-24 shrink-0">فیبر عضله (اکسترافوزال):</span>
                  <div className="flex-1 h-3 bg-red-950/80 rounded border border-red-700/50 relative overflow-hidden">
                    <motion.div
                      className="h-full bg-red-600/70"
                      animate={{
                        width: isLocked ? '95%' : `${Math.min(90, 40 + velocity * 0.4)}%`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Spindle Capsule (Intrafusal) */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-300 w-24 shrink-0">دوک عضلانی (اینترافوزال):</span>
                  <div className="flex-1 h-6 bg-slate-950 rounded border border-cyan-500/40 relative flex items-center px-2">
                    {/* Nuclear bag / spiral coil */}
                    <div className="w-full flex items-center justify-between relative">
                      <div className="w-3 h-3 rounded-full bg-amber-400/80 shrink-0" title="هسته‌های بافت کیسه‌ای" />
                      
                      {/* Spiral coil animated according to Ia rate */}
                      <div className="flex-1 flex justify-around px-2">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-1.5 h-4 rounded-full ${
                              isSpasticCatch ? 'bg-rose-400' : 'bg-cyan-400'
                            }`}
                            animate={{
                              scaleY: isPlayingDdk ? [0.6, 1.2, 0.6] : 1,
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                              duration: Math.max(0.08, 1 / (iaFiringRate / 20)),
                              repeat: Infinity
                            }}
                          />
                        ))}
                      </div>

                      <div className="w-3 h-3 rounded-full bg-amber-400/80 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* GTO series representation */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-400 w-24 shrink-0">اندام وتری گلژی (GTO):</span>
                  <div className="flex-1 h-2.5 bg-emerald-950/70 rounded border border-emerald-600/50 flex items-center justify-end px-1">
                    <span className="text-[9px] font-mono text-emerald-300">
                      تنش تاندون: {Math.round(resistanceLevel * 0.8)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Pulsing Signal Wave */}
              {isPlayingDdk && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-0.5 bg-cyan-400/40 signal-pulse" />
                </div>
              )}
            </div>

            {/* Meters Bar */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>مقاومت تون عضلانی:</span>
                  <span className={`font-mono font-bold ${resistanceLevel > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {resistanceLevel}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      resistanceLevel > 60
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${resistanceLevel}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>وضعیت مهار کورتیکال (UMN):</span>
                  <span className={`font-bold ${isUmnLesion ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isUmnLesion ? 'مهار حذف شده' : 'مهار فعال (نرمال)'}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isUmnLesion ? 'bg-rose-500 w-1/5' : 'bg-emerald-500 w-full'}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Takeaway Box */}
          <div className="p-3 bg-blue-950/30 border border-blue-900/50 rounded-xl text-xs text-slate-300 space-y-1">
            <span className="font-bold text-cyan-300 block">نکته کلیدی ارزیابی بالینی اساتید:</span>
            <p>
              در آسیب UMN، با افزایش سرعت تکرار، شلیک فیبر Ia بدون ترمز مهار کورتیکوبولبار مستقیما نورون آلفا را اشباع می‌کند و به همین دلیل بیمار در تست سریع DDK گیر می‌کند، در حالی که در حرکات آرام (Slow Motion) به دلیل عدم تحریک شتابی Ia، زبان نرم و روان حرکت می‌کند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
