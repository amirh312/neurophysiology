'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, Play, RotateCcw, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DeglutitionEngine() {
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(1);
  const [isPlayingPhase, setIsPlayingPhase] = useState<boolean>(false);
  const [silentAspirationActive, setSilentAspirationActive] = useState<boolean>(false);
  const [enteralDuration, setEnteralDuration] = useState<'short' | 'long'>('short');
  const [hasSevereReflux, setHasSevereReflux] = useState<boolean>(false);

  // 5 Protective mechanisms checked in Pharyngeal phase
  const [protections, setProtections] = useState({
    vpClosure: true,
    hyolaryngealElevation: true,
    vocalFoldClosure: true,
    epiglotticInversion: true,
    uesOpening: true
  });

  const phasesInfo = [
    {
      step: 1,
      title: 'مرحله ۱: آماده‌سازی دهانی (Oral Prep)',
      duration: 'متغیر (ارادی)',
      desc: 'جویدن، اختلاط با بزاق، جلوگیری از خروج غذا توسط لب و گونه و جمع‌آوری لقمه منسجم روی سطح پشتی زبان.',
      latin: 'Oral Preparatory Phase'
    },
    {
      step: 2,
      title: 'مرحله ۲: مرحله دهانی (Oral Phase)',
      duration: 'حدود ۱ الی ۱.۲۵ ثانیه (ارادی)',
      desc: 'حرکت پیستونی موجی زبان از جلو به عقب (Middorsal Propulsive Wave) و راندن لقمه به قوس‌های لوزه‌ای.',
      latin: 'Oral Transport Phase'
    },
    {
      step: 3,
      title: 'مرحله ۳: مرحله حلقی (Pharyngeal Phase)',
      duration: 'حدود ۰.۷ الی ۱ ثانیه (غیرارادی رفلکسی)',
      desc: 'توقف تنفس بلع (Apnea) و اجرای رفلکسی اقدامات پنج‌گانه حفاظت حنجره برای راندن لقمه به مری.',
      latin: 'Pharyngeal Phase & Airway Closure'
    },
    {
      step: 4,
      title: 'مرحله ۴: مرحله مری (Esophageal Phase)',
      duration: '۸ تا ۲۰ ثانیه (غیرارادی)',
      desc: 'حرکات دودی پریستالتیک عضلات مری تحت کنترل عصب واگ و شل شدن LES جهت ورود لقمه به معده.',
      latin: 'Esophageal Peristalsis'
    }
  ];

  const handleSimulateSwallow = () => {
    setIsPlayingPhase(true);
    setCurrentPhase(1);

    setTimeout(() => setCurrentPhase(2), 1000);
    setTimeout(() => setCurrentPhase(3), 2000);
    setTimeout(() => {
      setCurrentPhase(4);
      setIsPlayingPhase(false);
    }, 3500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              موتور سینماتیک بلع (Deglutition Engine) و الگوریتم تغذیه انترال
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            شبیه‌ساز مراحل چهارگانه بلع، اقدامات پنج‌گانه حفاظت راه هوایی، آسپیراسیون خاموش و تصمیم‌گیری NG / PEG / J-Tube
          </p>
        </div>

        <button
          onClick={handleSimulateSwallow}
          disabled={isPlayingPhase}
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {isPlayingPhase ? 'در حال اجرای متوالی مراحل بلع...' : 'شبیه‌سازی کامل یک بلع سالم'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: 4 Phases Stepper & Interactive Airway Protection */}
        <div className="lg:col-span-7 space-y-4">
          {/* Phase Steps Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {phasesInfo.map((p) => (
              <button
                key={p.step}
                onClick={() => setCurrentPhase(p.step as any)}
                className={`p-2 rounded-xl text-right border transition-all text-xs ${
                  currentPhase === p.step
                    ? 'bg-rose-500/20 border-rose-500 text-white font-bold shadow-md shadow-rose-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="block font-mono text-[10px] text-rose-400">فاز {p.step}</span>
                <span className="line-clamp-1">{p.title.split('—')[1] || p.title}</span>
              </button>
            ))}
          </div>

          {/* Current Phase Details Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{phasesInfo[currentPhase - 1].title}</h4>
                <span className="text-[11px] font-mono text-rose-400">{phasesInfo[currentPhase - 1].latin}</span>
              </div>
              <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-amber-300">
                زمان: {phasesInfo[currentPhase - 1].duration}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {phasesInfo[currentPhase - 1].desc}
            </p>
          </div>

          {/* Special Focus on Phase 3: The 5 Airway Protection Actions */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-900/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                چک‌لیست اقدامات پنج‌گانه حفاظت حنجره در فاز حلقی:
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                همزمان در کمتر از ۱ ثانیه
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              {[
                { key: 'vpClosure', label: '۱. صعود کام نرم و انسداد دریچه کام-حلقی (ممانعت از ورود غذا به بینی)' },
                { key: 'hyolaryngealElevation', label: '۲. صعود حنجره به بالا و جلو زیر ریشه زبان (مهم‌ترین اقدام بقایی!)' },
                { key: 'vocalFoldClosure', label: '۳. تقریب محکم تارهای صوتی حقیقی و کاذب (چفت کردن نای)' },
                { key: 'epiglotticInversion', label: '۴. خم شدن و واژگونی اپیگلوت مانند یک سپر روی مدخل حنجره' },
                { key: 'uesOpening', label: '۵. شل شدن اسفنکتر فوقانی مری (عضله کریکوفارینجئوس جهت عبور لقمه)' }
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Enteral Feeding Decision Tree (NG vs PEG vs J-Tube) */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-3">
              <GitBranch className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">
                درخت تصمیم‌گیری تغذیه انترال (Enteral Decision Tree)
              </span>
            </div>

            {/* Questions to configure the algorithm */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">مدت زمان پیش‌بینی‌شده دیسفاژی بیمار:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEnteralDuration('short')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      enteralDuration === 'short'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    کوتاه‌مدت (کمتر از ۴ هفته)
                  </button>
                  <button
                    onClick={() => setEnteralDuration('long')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      enteralDuration === 'long'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    مزمن / پیشرونده (بیش از ۴ هفته)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">وضعیت ریفلاکس اسید یا فلج معده (Gastroparesis):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHasSevereReflux(false)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      !hasSevereReflux
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    طبیعی یا ریفلاکس خفیف
                  </button>
                  <button
                    onClick={() => setHasSevereReflux(true)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      hasSevereReflux
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ریفلاکس شدید یا معده فلج
                  </button>
                </div>
              </div>
            </div>

            {/* Computed Recommendation Box */}
            <div className="mt-4 p-4 rounded-xl border bg-slate-900 border-slate-700 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block">لوله انتخابی طبق رفرنس فیزیولوژی بلع:</span>

              {enteralDuration === 'short' && !hasSevereReflux && (
                <div>
                  <span className="text-sm font-bold text-amber-400 block">
                    لوله بینی-معده‌ای (NG-Tube - Nasogastric)
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    مناسب برای فاز حاد بستری (کمتر از ۴ هفته). هشدار: در صورت طولانی شدن، حتما باید به PEG تعویض گردد تا به حس حلق و اسفنکتر مری آسیب نزند.
                  </p>
                </div>
              )}

              {enteralDuration === 'long' && !hasSevereReflux && (
                <div>
                  <span className="text-sm font-bold text-emerald-400 block">
                    لوله پگ معده (PEG Tube - Gastrostomy)
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    استاندارد طلایی دیسفاژی مزمن (ALS، سکته پایدار، دمانس). حلق و راه هوایی آزاد می‌ماند و تمرینات بلع دهانی همزمان قابل اجرا است.
                  </p>
                </div>
              )}

              {hasSevereReflux && (
                <div>
                  <span className="text-sm font-bold text-purple-400 block">
                    لوله ژژنوستومی روده باریک (J-Tube - Jejunostomy)
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    بای‌پاس کامل معده برای حذف ریسک سرریز اسید و پنومونی آسپیراسیون. نیازمند تغذیه مداوم قطره‌ای با پمپ انفیوژن.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Academic Highlight for Professors */}
          <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl text-[11px] text-slate-300">
            <span className="font-bold text-rose-300 block mb-0.5">پیام دفاعیه در جلسه اساتید:</span>
            <span>
              صعود حنجره (Hyolaryngeal Elevation) تنها حفاظتی است که همزمان با پنهان کردن حنجره، کشش فیزیکی جهت باز شدن اسفنکتر مری (UES) را فراهم می‌آورد.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
