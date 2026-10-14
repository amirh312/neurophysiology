'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Activity, AlertTriangle, ShieldCheck, VolumeX, Eye } from 'lucide-react';

export default function CranialNervesLarynxLab() {
  const [selectedNerve, setSelectedNerve] = useState<'cn7' | 'cn9' | 'cn10' | 'cn11' | 'cn12'>('cn10');
  const [pitchSlider, setPitchSlider] = useState<number>(120); // F0 in Hz (100 to 280 Hz)
  const [rlnState, setRlnState] = useState<'normal' | 'unilateral' | 'bilateral'>('normal');
  const [isCoughTriggered, setIsCoughTriggered] = useState<boolean>(false);
  const [internalSlnIntact, setInternalSlnIntact] = useState<boolean>(true);

  const handleTestCoughReflex = () => {
    if (internalSlnIntact) {
      setIsCoughTriggered(true);
      setTimeout(() => setIsCoughTriggered(false), 1500);
    } else {
      // Silent penetration without cough!
      setIsCoughTriggered(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Mic className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              آزمایشگاه بیومکانیک حنجره، آواسازی و اعصاب مغزی ۷ تا ۱۲
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            شبیه‌سازی دینامیک تارهای صوتی، اثر عصب راجعه (RLN) در تقریب، عصب فوقانی (SLN) در تنظیم گام صوتی (Pitch) و انحراف زبان
          </p>
        </div>

        {/* Nerve Selector Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'cn7', label: 'عصب ۷ (صورت)' },
            { id: 'cn9', label: 'عصب ۹ (زبانی-حلقی)' },
            { id: 'cn10', label: 'عصب ۱۰ (واگ & حنجره)' },
            { id: 'cn11', label: 'عصب ۱۱ (فرعی)' },
            { id: 'cn12', label: 'عصب ۱۲ (زیرزبانی)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedNerve(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedNerve === item.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Focus: When CN 10 (Vagus) is active, show the rich Laryngeal Simulator */}
      {selectedNerve === 'cn10' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            {/* Pitch & SLN External Branch */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-200">
                  تنظیم زیروبمی صوت (Pitch / F0 via عضله کریکوتیروئید):
                </span>
                <span className="font-mono text-emerald-400 text-xs font-bold">
                  {pitchSlider} Hz
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="260"
                step="5"
                value={pitchSlider}
                onChange={(e) => setPitchSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>صدای بم (تار صوتی کوتاه و قطور)</span>
                <span>صدای زیر (تار صوتی طویل و کشیده)</span>
              </div>
            </div>

            {/* RLN Neuropathy Selector */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                وضعیت شاخه راجعه حنجره‌ای (RLN State):
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'normal', label: 'سالم (دو طرف باز و بسته)' },
                  { id: 'unilateral', label: 'فلج یکطرفه RLN' },
                  { id: 'bilateral', label: 'فلج دوطرفه (انسداد)' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setRlnState(s.id as any)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all ${
                      rlnState === s.id
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sensory SLN Cough Reflex Tester */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    حس مخاطی شاخه داخلی SLN:
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {internalSlnIntact ? 'حس مخاطی سالم (تحریک سرفه)' : 'بی‌حسی مخاط (آسپیراسیون خاموش)'}
                  </span>
                </div>
                <button
                  onClick={() => setInternalSlnIntact(!internalSlnIntact)}
                  className={`px-2 py-1 rounded text-[11px] font-bold border ${
                    internalSlnIntact
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {internalSlnIntact ? 'حس برقرار' : 'حس قطع‌شده'}
                </button>
              </div>

              <button
                onClick={handleTestCoughReflex}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                💧 ریختن مایع تستی روی دهانه تارهای صوتی
              </button>

              {isCoughTriggered && (
                <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>رفلکس سرفه انفجاری فعال شد و مانع ورود مایع به نای گردید!</span>
                </div>
              )}

              {!internalSlnIntact && !isCoughTriggered && (
                <div className="p-2 bg-rose-500/20 border border-rose-500/40 rounded-lg text-rose-300 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>آسپیراسیون خاموش! مایع وارد نای شد بدون هیچ‌گونه سرفه یا خفگی.</span>
                </div>
              )}
            </div>
          </div>

          {/* Larynx Endoscopy Visualizer */}
          <div className="lg:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  دید استروبوسکوپی چاکنای حنجره (Laryngeal Glottis):
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {rlnState === 'normal' && 'تقریب کامل در خط وسط'}
                  {rlnState === 'unilateral' && 'نشت هوا از تار فلج (شکاف پارامدین)'}
                  {rlnState === 'bilateral' && 'انسداد چاکنای در خط وسط'}
                </span>
              </div>

              {/* Endoscopic View Oval Box */}
              <div className="h-44 bg-slate-900 rounded-2xl border-2 border-slate-800 flex items-center justify-center relative overflow-hidden">
                {/* Epiglottis arch at top */}
                <div className="absolute top-2 w-32 h-6 rounded-b-full bg-rose-900/40 border border-rose-700/40 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-rose-300">اپیگلوت (Epiglottis)</span>
                </div>

                {/* Left and Right True Vocal Folds */}
                <div className="relative w-48 h-32 flex items-center justify-center">
                  {/* Left Vocal Fold (Patient's Right) */}
                  <motion.div
                    className="h-28 bg-gradient-to-l from-slate-200 to-rose-200 rounded-l-full shadow-lg border border-slate-400 relative"
                    animate={{
                      width: `${Math.max(16, 38 - (pitchSlider - 100) * 0.1)}px`,
                      x: rlnState === 'bilateral' ? 12 : rlnState === 'unilateral' ? 10 : 14,
                      rotate: rlnState === 'unilateral' ? -6 : -12
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Glottic Airway Gap */}
                  <motion.div
                    className="h-28 bg-slate-950 rounded flex items-center justify-center"
                    animate={{
                      width: rlnState === 'bilateral' ? '2px' : rlnState === 'unilateral' ? '18px' : '4px'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {rlnState === 'unilateral' && (
                      <span className="text-[9px] text-rose-400 -rotate-90 whitespace-nowrap">نشت هوا</span>
                    )}
                  </motion.div>

                  {/* Right Vocal Fold (Patient's Left) */}
                  <motion.div
                    className="h-28 bg-gradient-to-r from-slate-200 to-rose-200 rounded-r-full shadow-lg border border-slate-400 relative"
                    animate={{
                      width: `${Math.max(16, 38 - (pitchSlider - 100) * 0.1)}px`,
                      x: rlnState === 'bilateral' ? -12 : -14,
                      rotate: 12
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Arytenoid cartilage swellings at bottom */}
                <div className="absolute bottom-2 flex gap-12">
                  <div className="w-5 h-5 rounded-full bg-rose-800/80 border border-rose-600/60" />
                  <div className="w-5 h-5 rounded-full bg-rose-800/80 border border-rose-600/60" />
                </div>
              </div>
            </div>

            {/* Vocal Impact Summary */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs mt-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">کیفیت صدای شبیه‌سازی‌شده:</span>
                <span className="font-bold text-emerald-300">
                  {rlnState === 'normal' && 'صدای شفاف و طبیعی با دامنه کامل زیر و بم شدن'}
                  {rlnState === 'unilateral' && 'صدای به شدت نفس‌آلود، خفه، کاهش شدید MPT و افت بلندی'}
                  {rlnState === 'bilateral' && 'آفونیا، تنگی شدید نفس و استریدور حنجره‌ای (اورژانس لوله‌گذاری)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* When other nerves are selected */}
      {selectedNerve !== 'cn10' && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-slate-100">
              {selectedNerve === 'cn7' && 'عصب هفتم مغزی (Facial Nerve - CN VII)'}
              {selectedNerve === 'cn9' && 'عصب نهم مغزی (Glossopharyngeal Nerve - CN IX)'}
              {selectedNerve === 'cn11' && 'عصب یازدهم مغزی (Accessory Nerve - CN XI)'}
              {selectedNerve === 'cn12' && 'عصب دوازدهم مغزی (Hypoglossal Nerve - CN XII)'}
            </h4>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded border border-emerald-800">
              {selectedNerve === 'cn7' && 'عضلات چهره، لب‌ها و چشایی ۲/۳ قدامی'}
              {selectedNerve === 'cn9' && 'حس حلق و ماشه رفلکس تهوع (Gag)'}
              {selectedNerve === 'cn11' && 'پاسچر سر در بلع و عضلات گردن'}
              {selectedNerve === 'cn12' && 'موتور انحصاری زبان در گفتار و بلع'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block">کارکرد حرکتی و کینزیولوژی:</span>
              <p className="text-slate-300 leading-relaxed">
                {selectedNerve === 'cn7' && 'تعصیب عضلات بیانگر چهره، عضله بوکسیناتور (نگهداری غذا در دندان‌ها) و عضله حلقوی لب برای ساخت همخوان‌های دو لبی (/p, b, m/).'}
                {selectedNerve === 'cn9' && 'تعصیب عضله استایلوفارینجئوس جهت بالا کشیدن و گشاد کردن حلق حین فاز حلقی بلع و ترشح بزاق رقیق از پاروتید.'}
                {selectedNerve === 'cn11' && 'تعصیب عضلات استرنوکلیدوماستوئید و ذوزنقه‌ای جهت چرخش و خم کردن محافظتی سر حین بلع و بالا کشیدن قفسه سینه در تنفس عمیق گفتار.'}
                {selectedNerve === 'cn12' && 'تعصیب تمام عضلات خارجی (ژنیوگلوس، هیوگلوس، استایلوگلوس) و داخلی زبان جهت اجرای تمام واج‌های دندانی، لثه‌ای و کامی و راندن لقمه به حلق.'}
              </p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2">
              <span className="font-bold text-rose-300 block">تظاهرات بالینی آسیب در گفتاردرمانی:</span>
              <p className="text-slate-300 leading-relaxed">
                {selectedNerve === 'cn7' && 'فلج بل، نشت هوا حین بیان /p, b/، افتادگی زاویه دهان و تجمع شدید غذا بین گونه و دندان‌ها (Food Pocketing).'}
                {selectedNerve === 'cn9' && 'غیبت رفلکس تهوع (Gag Reflex)، تاخیر در بلع حلقی و کاهش ترشح بزاق بناگوشی.'}
                {selectedNerve === 'cn11' && 'افتادگی شانه، ناتوانی در چرخاندن سر به سمت سالم و ناتوانی در اجرای مانورهای پاسچرال بلع.'}
                {selectedNerve === 'cn12' && 'آتروفی یکطرفه زبان، فاسیکولاسیون‌های مشخص در کف دهان و انحراف نوک زبان به سمت ضایعه به دلیل غلبه ژنیوگلوس سمت سالم.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
