'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Stethoscope, CheckCircle2, AlertOctagon, Volume2, ShieldAlert } from 'lucide-react';

export default function UmnLmnDiagnosticLab() {
  const [activeLesion, setActiveLesion] = useState<'umn' | 'lmn'>('umn');
  const [isJawJerking, setIsJawJerking] = useState<boolean>(false);
  const [isProtruding, setIsProtruding] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handleJawJerkTap = () => {
    setIsJawJerking(true);
    setTimeout(() => setIsJawJerking(false), 900);
  };

  const handleProtrusionToggle = () => {
    setIsProtruding(!isProtruding);
  };

  const handleAudioSample = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 2200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              آزمایشگاه بالینی افتراق آسیب نورون حرکتی فوقانی (UMN) و پایینی (LMN)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            معاینه تعاملی رفلکس فک (Jaw Jerk)، فاسیکولاسیون تحت‌مخاطی، آتروفی و انحراف بیومکانیکال زبان
          </p>
        </div>

        {/* Lesion Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveLesion('umn'); setIsProtruding(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLesion === 'umn'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            بیمار اول: ضایعه UMN (سکته دوطرفه)
          </button>
          <button
            onClick={() => { setActiveLesion('lmn'); setIsProtruding(false); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLesion === 'lmn'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            بیمار دوم: ضایعه LMN (هسته عصب ۱۲)
          </button>
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Physical Exam Tests */}
        <div className="lg:col-span-6 space-y-4">
          {/* Test 1: Jaw Jerk Reflex */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                آزمون ۱: رفلکس وتری فک (Jaw Jerk Reflex)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400">
                {activeLesion === 'umn' ? 'پاسخ: ۴+ تشدیدیافته (Hyperreflexia)' : 'پاسخ: صفر یا ۱+ غایب/کاهش‌یافته'}
              </span>
            </div>

            <div className="h-28 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
              <div className="flex flex-col items-center">
                {/* Upper Jaw fixed */}
                <div className="w-24 h-5 bg-slate-700 rounded-t-md flex items-center justify-center text-[10px] text-slate-300">
                  فک بالا (ماگزیلا)
                </div>

                {/* Mandible animated */}
                <motion.div
                  className={`w-24 h-7 rounded-b-md flex items-center justify-center text-[10px] font-bold shadow-lg transition-colors ${
                    activeLesion === 'umn' ? 'bg-rose-700 text-white' : 'bg-slate-600 text-slate-200'
                  }`}
                  animate={{
                    y: isJawJerking
                      ? activeLesion === 'umn'
                        ? [-4, -14, -2, -10, 0] // sharp snappy hyperreflexia
                        : [0, 2, 0] // minimal or no jump
                      : 0
                  }}
                  transition={{ duration: 0.6 }}
                >
                  فک پایین (ماندیبل)
                </motion.div>
              </div>

              {isJawJerking && activeLesion === 'umn' && (
                <div className="absolute top-2 right-3 text-xs font-bold text-rose-400 flex items-center gap-1">
                  <AlertOctagon className="w-3.5 h-3.5" /> جهش شدید فک رو به بالا!
                </div>
              )}
            </div>

            <button
              onClick={handleJawJerkTap}
              disabled={isJawJerking}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              🔨 ضربه با چکش معاینه به چانه
            </button>
          </div>

          {/* Test 2: Tongue Protrusion & Deviation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                آزمون ۲: بیرون آوردن زبان (Tongue Protrusion)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                {activeLesion === 'umn' ? 'انحراف خفیف یا خط وسط' : 'انحراف شدید به سمت راست (سمت ضایعه)'}
              </span>
            </div>

            <div className="h-32 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
              {/* Mouth Frame */}
              <div className="w-36 h-24 rounded-full border-2 border-rose-900/60 bg-red-950/40 relative flex items-center justify-center">
                {/* Lip outlines */}
                <div className="absolute inset-x-2 top-2 h-1 bg-rose-500/40 rounded-full" />
                <div className="absolute inset-x-2 bottom-2 h-1 bg-rose-500/40 rounded-full" />

                {/* Tongue Body */}
                <motion.div
                  className={`rounded-t-2xl shadow-xl flex items-center justify-center text-center p-1 ${
                    activeLesion === 'umn'
                      ? 'bg-rose-600/90 w-14 h-16 text-white'
                      : 'bg-amber-700/80 w-12 h-14 text-white border-r-4 border-amber-950'
                  }`}
                  animate={{
                    y: isProtruding ? 12 : -4,
                    rotate: isProtruding
                      ? activeLesion === 'lmn'
                        ? 28 // Deviation to the lesion side (right)
                        : 2
                      : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[10px] font-bold leading-tight">
                    {isProtruding
                      ? activeLesion === 'lmn'
                        ? 'انحراف به راست ↗'
                        : 'خط وسط'
                      : 'کف دهان'}
                  </span>
                </motion.div>
              </div>

              {isProtruding && activeLesion === 'lmn' && (
                <div className="absolute bottom-2 text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                  غلبه ژنیوگلوس چپ سالم بر راست فلج
                </div>
              )}
            </div>

            <button
              onClick={handleProtrusionToggle}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              👅 {isProtruding ? 'بازگشت زبان به کف دهان' : 'دستور: زبانتان را مستقیم بیرون بیاورید'}
            </button>
          </div>
        </div>

        {/* Right Column: Resting Inspection & Voice Synthesis Diagnostic */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Inspection of Resting Tongue (Fasciculations & Atrophy) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-200 block">
              مشاهده زبان در حال استراحت در کف دهان:
            </span>

            <div className="h-28 bg-slate-900 rounded-lg border border-slate-800 p-3 flex items-center justify-around relative">
              {activeLesion === 'umn' ? (
                <div className="text-center space-y-1">
                  <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 inline ml-1" />
                    حجم عضلانی زبان کاملا حفظ شده است
                  </span>
                  <p className="text-[11px] text-slate-400">
                    هیچ‌گونه پرش غیرارادی (فاسیکولاسیون) و چین‌خوردگی مخاطی وجود ندارد.
                  </p>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold border border-rose-500/40">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      فاسیکولاسیون فعال (Fasciculations)
                    </span>
                    <p className="text-[11px] text-slate-300">
                      پرش‌های مداوم و خودبه‌خودی واحدهای حرکتی منفرد به علت حساسیت عصب‌کشی (Denervation Hypersensitivity).
                    </p>
                    <span className="text-[10px] text-amber-400 block font-semibold">
                      آتروفی یکطرفه: نیمه راست زبان لاغر، چروکیده و تحلیل‌رفته است.
                    </span>
                  </div>

                  {/* Animated Fasciculation Ripples */}
                  <div className="w-16 h-16 rounded-full bg-amber-950 border border-amber-600/60 relative flex items-center justify-center shrink-0 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-amber-400"
                        animate={{
                          x: [Math.sin(i) * 12, -Math.sin(i) * 14, Math.sin(i) * 10],
                          y: [Math.cos(i) * 12, -Math.cos(i) * 14, Math.cos(i) * 10],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 0.35 + i * 0.1,
                          repeat: Infinity
                        }}
                      />
                    ))}
                    <span className="text-[9px] font-mono text-amber-200 z-10">LMN</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Voice Quality & Dysarthria Classification */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                تحلیل آکوستیک گفتار و دیس‌آرتری:
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300">
                {activeLesion === 'umn' ? 'دیس‌آرتری اسپاستیک' : 'دیس‌آرتری شل (Flaccid)'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1.5 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">کیفیت صوت:</span>
                <span className="font-bold text-slate-100">
                  {activeLesion === 'umn'
                    ? 'صدای مجهد، فشرده، خفه و تحت فشار (Strained-Strangled)'
                    : 'صدای به شدت نفس‌آلود (Breathy) با افت بلندی و نشت هوای بینی'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">سرعت تست DDK:</span>
                <span className="font-semibold text-slate-200">
                  {activeLesion === 'umn'
                    ? 'کندی شدید با فواصل نامنظم و قفل شدن زبان'
                    : 'حرکات ضعیف، دامنه ناکامل و ناتوانی در تولید فشار هوای دهانی'}
                </span>
              </div>
            </div>

            <button
              onClick={handleAudioSample}
              disabled={isPlayingAudio}
              className={`w-full py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isPlayingAudio
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              {isPlayingAudio
                ? activeLesion === 'umn'
                  ? 'در حال پخش الگوی صدای مجهد و خفه اسپاستیک...'
                  : 'در حال پخش الگوی صدای نفس‌آلود و هایپرنازال دیس‌آرتری شل...'
                : 'شبیه‌سازی الگوی صوتی بیمار در بالین'}
            </button>
          </div>

          {/* Diagnostic Takeaway */}
          <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-xl text-[11px] text-slate-300">
            <span className="font-bold text-indigo-300 block">جمع‌بندی برای جلسه اساتید:</span>
            <span>
              {activeLesion === 'umn'
                ? 'در سکته UMN، رفلکس‌های تاندونی تشدید شده و تون اسپاستیک است اما فاقد فاسیکولاسیون و آتروفی واقعی است.'
                : 'در آسیب LMN (عصب ۱۲)، قطع عصب باعث حساسیت ناشی از عصب‌کشی، فاسیکولاسیون‌های مشخص در کف دهان و انحراف زبان به سمت ضایعه می‌شود.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
