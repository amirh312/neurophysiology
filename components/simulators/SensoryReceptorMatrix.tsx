'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  latinName: string;
  thresholdMm: number; // two-point discrimination threshold in mm
  receptorDensity: string;
  primaryReceptor: string;
  speechFunction: string;
}

const ORAL_ZONES: Zone[] = [
  {
    id: 'tongue-tip',
    name: 'نوک زبان (Apex of Tongue)',
    latinName: 'Tongue Tip (Sub-millimeter)',
    thresholdMm: 0.8,
    receptorDensity: 'فوق‌العاده متراکم (بیشترین در کل بدن)',
    primaryReceptor: 'مایسنر (Meissner) و دیسک‌های مرکل (Merkel)',
    speechFunction: 'تنظیم موقعیت برای واج‌های دندانی و لثه‌ای (/t, d, s, z/) با دقت میکرومتری'
  },
  {
    id: 'tongue-blade',
    name: 'بدنه و تیغه زبان (Tongue Blade)',
    latinName: 'Tongue Blade & Dorsum',
    thresholdMm: 3.5,
    receptorDensity: 'متراکم و حساس به بافت',
    primaryReceptor: 'مرکل و جوانه‌های چشایی با پایانه‌های حسی عام',
    speechFunction: 'شکل‌دهی واکه‌ها و تولید واج‌های کامی و نرم‌کامی (/k, g, sh/)'
  },
  {
    id: 'hard-palate',
    name: 'کام سخت (Hard Palate)',
    latinName: 'Hard Palate Anterior',
    thresholdMm: 4.5,
    receptorDensity: 'متوسط رو به بالا با مخاط چسبنده',
    primaryReceptor: 'مرکل و پایانه‌های آزاد درد و فشار',
    speechFunction: 'سطح مقاومت فیزیکی برای ایجاد مانع صوتی و حس فشرده شدن لقمه'
  },
  {
    id: 'lips',
    name: 'حاشیه ورمیلین لب‌ها (Vermilion Border)',
    latinName: 'Vermilion Border of Lips',
    thresholdMm: 1.8,
    receptorDensity: 'بسیار بالا',
    primaryReceptor: 'مایسنر و روفینی',
    speechFunction: 'غنچه کردن لب، تفکیک واج‌های دو لبی (/p, b, m/) و درک نشت غذا'
  },
  {
    id: 'forearm',
    name: 'پوست ساعد دست (جهت مقایسه)',
    latinName: 'Volar Forearm (Baseline Comparison)',
    thresholdMm: 38.0,
    receptorDensity: 'بسیار کم و پراکنده',
    primaryReceptor: 'پایانه‌های فولیکول مو و روفینی',
    speechFunction: 'حس عمومی محیطی فاقد کاربرد در تولید صدا'
  }
];

export default function SensoryReceptorMatrix() {
  const [selectedZone, setSelectedZone] = useState<Zone>(ORAL_ZONES[0]);
  const [caliperDistance, setCaliperDistance] = useState<number>(1.2); // mm

  const canDiscriminate = caliperDistance >= selectedZone.thresholdMm;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Compass className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              ماتریس گیرنده‌های مکانیکی و تست تمایز دو نقطه‌ای دهان
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            ارزیابی تجربی قدرت تفکیک فضایی (Two-Point Discrimination) در نوک زبان نسبت به سایر نواحی بدن
          </p>
        </div>

        <span className="px-3 py-1 bg-cyan-950/70 text-cyan-300 border border-cyan-800/60 rounded-full text-xs font-mono">
          نوک زبان: زیر ۱ میلی‌متر
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Zone Selector */}
        <div className="lg:col-span-5 space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            انتخاب ناحیه آناتومیک جهت تست حسی:
          </label>
          <div className="space-y-2">
            {ORAL_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`w-full text-right p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  selectedZone.id === zone.id
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <span className="font-bold block text-sm">{zone.name}</span>
                  <span className="text-[11px] font-mono text-cyan-400/80">{zone.latinName}</span>
                </div>
                <span className="font-mono bg-slate-900 px-2 py-1 rounded text-slate-300 text-[11px]">
                  آستانه: {zone.thresholdMm} mm
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Caliper Test Workbench */}
        <div className="lg:col-span-7 bg-slate-950/70 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                کولیس تمایز حسی (Two-Point Caliper Slider)
              </span>
              <span className="font-mono text-cyan-400 font-bold text-sm bg-slate-900 px-3 py-1 rounded border border-slate-700">
                فاصله پراب‌ها: {caliperDistance.toFixed(1)} میلی‌متر
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="40"
              step="0.5"
              value={caliperDistance}
              onChange={(e) => setCaliperDistance(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>0.5 mm</span>
              <span>10 mm</span>
              <span>20 mm</span>
              <span>40 mm</span>
            </div>

            {/* Caliper Visual Graphic */}
            <div className="my-5 h-28 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-[11px] text-slate-400 mb-2">
                فاصله فیزیکی بین دو سوزن روی بافت {selectedZone.name}
              </div>

              {/* Two Pins Graphic */}
              <div className="flex items-center justify-center gap-1 relative w-full px-12">
                <div className="w-1.5 h-8 bg-amber-400 rounded-t shadow-lg shadow-amber-400/30" />
                <motion.div
                  className="h-0.5 bg-dashed border-b border-cyan-400 flex items-center justify-center"
                  animate={{ width: `${Math.max(12, Math.min(220, caliperDistance * 5.5))}px` }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-[10px] font-mono bg-slate-950 px-1 text-cyan-300 -translate-y-3">
                    {caliperDistance.toFixed(1)}mm
                  </span>
                </motion.div>
                <div className="w-1.5 h-8 bg-amber-400 rounded-t shadow-lg shadow-amber-400/30" />
              </div>

              {/* Discrimination Result Tag */}
              <div className="mt-3">
                {canDiscriminate ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    مغز دو نقطه مجزا را حس می‌کند (درک تمایز دو نقطه‌ای موفق)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-xs font-semibold">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    مغز فقط یک نقطه پیوسته حس می‌کند (فاصله کمتر از آستانه تفکیک است)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details for Selected Zone */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500 block">گیرنده‌های غالب:</span>
                <span className="font-semibold text-cyan-300">{selectedZone.primaryReceptor}</span>
              </div>
              <div>
                <span className="text-slate-500 block">تراکم حسگرها:</span>
                <span className="font-semibold text-slate-200">{selectedZone.receptorDensity}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-slate-300">
              <span className="text-slate-500 block">اهمیت در بیومکانیک گفتار:</span>
              <span>{selectedZone.speechFunction}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
