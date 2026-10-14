'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, Eye, BookOpen, Layers } from 'lucide-react';

export default function HemisphericBrainExplorer() {
  const [activeTab, setActiveTab] = useState<'pfc' | 'lateralization' | 'neglect'>('pfc');
  const [selectedPfcRegion, setSelectedPfcRegion] = useState<'dlpfc' | 'ofc' | 'acc'>('dlpfc');
  const [showNeglectRedLine, setShowNeglectRedLine] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  const pfcDetails = {
    dlpfc: {
      name: 'قشر پشتی-جانبی پیش‌پیشانی (DLPFC)',
      latin: 'Dorsolateral Prefrontal Cortex (BA 9/46)',
      functions: [
        'حافظه کاری (Working Memory): تخته سیاه ذهنی برای اتصال اجزای جمله طولانی',
        'حل مسئله و تفکر انتزاعی حین گفتمان پیچیده',
        'برنامه‌ریزی توالی منطقی رویدادها در روایت داستان'
      ],
      deficit: 'بیمار واژگان را می‌فهمد اما درک جملات طولانی به دلیل پر شدن ظرفیت بافر مختل می‌شود.'
    },
    ofc: {
      name: 'قشر حدقه‌ای-پیشانی (OFC)',
      latin: 'Orbitofrontal Cortex (BA 11/47)',
      functions: [
        'مهار رفتاری و کنترل تکانه‌های کلامی (Response Inhibition)',
        'تنظیم هیجانات و رعایت هنجارهای اجتماعی در مکالمه',
        'سنجش ارزش پاداش و تنبیه در بازخورد ارتباطی'
      ],
      deficit: 'تکانشگری، استفاده از کلمات نامناسب، قطع بی‌پروای صحبت دیگران و عدم رعایت نوبت کلام.'
    },
    acc: {
      name: 'قشر کمربندی قدامی و مدیال (mPFC / ACC)',
      latin: 'Anterior Cingulate Cortex (BA 24/32)',
      functions: [
        'آغازگری کلامی (Verbal Initiation) و رفع اکینزی',
        'انگیزش ارتباطی و تصمیم به ورود به مکالمه',
        'توجه متمرکز و کنترل نظارت بر خطاهای گفتاری'
      ],
      deficit: 'سکوت غیرارادی (Mutism Akinetic)، بی‌میلی مفرط به صحبت کردن و افت شروع خودبه‌خودی کلام.'
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Brain className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              کاوشگر نوروساینس شناختی: قشر پیش‌پیشانی، سوپرتری و سندروم RHD
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            بررسی کارکردهای اجرایی قشر مغز، تخصص دو نیمکره و شبیه‌سازی تجربی بی‌توجهی فضایی چپ (Neglect)
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('pfc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pfc' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ۱. قشر پیش‌پیشانی (PFC)
          </button>
          <button
            onClick={() => setActiveTab('lateralization')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lateralization' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ۲. سوپرتری دو نیمکره
          </button>
          <button
            onClick={() => setActiveTab('neglect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'neglect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ۳. تست بی‌توجهی فضایی (Neglect)
          </button>
        </div>
      </div>

      {/* Tab 1: PFC Subregions */}
      {activeTab === 'pfc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">
              انتخاب بخش فرعی قشر پیش‌پیشانی:
            </span>
            {(['dlpfc', 'ofc', 'acc'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedPfcRegion(key)}
                className={`w-full text-right p-3.5 rounded-xl border transition-all text-xs ${
                  selectedPfcRegion === key
                    ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="font-bold block text-sm">{pfcDetails[key].name}</span>
                <span className="text-[11px] font-mono text-purple-300/80">{pfcDetails[key].latin}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-slate-100 text-base">{pfcDetails[selectedPfcRegion].name}</h4>
                <span className="text-xs font-mono text-purple-400">{pfcDetails[selectedPfcRegion].latin}</span>
              </div>
              <span className="px-2.5 py-1 bg-purple-950 text-purple-300 text-[11px] rounded border border-purple-800">
                فرماندهی اجرایی
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">وظایف اصلی در کینزیولوژی و شناخت گفتار:</span>
              <ul className="space-y-2 text-xs text-slate-300">
                {pfcDetails[selectedPfcRegion].functions.map((fn, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-rose-950/30 border border-rose-900/60 rounded-xl text-xs text-rose-200">
              <span className="font-bold block mb-1">پیامد بالینی آسیب سکته یا ترومای مغزی:</span>
              <span>{pfcDetails[selectedPfcRegion].deficit}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Lateralization & Metaphor Decoder */}
      {activeTab === 'lateralization' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Hemisphere Card */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-blue-900/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  نیمکره چپ: حاکم ساختار زبان (The Text)
                </span>
                <span className="text-[10px] font-mono bg-blue-950 px-2 py-0.5 rounded text-blue-300">Dominant Left</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>پردازش تحلیلی، متوالی، خطی و جزء به کل</li>
                <li>واج‌شناسی، ترکیب اصوات، صرف و نحو (Grammar)</li>
                <li>دیکشنری ذهنی و استخراج معنای مستقیم و تحت‌اللفظی</li>
                <li>نوای دستوری (تفاوت جمله خبری از پرسشی با تکیه صوتی)</li>
                <li><strong className="text-blue-300">نتیجه آسیب:</strong> انواع آفازی (بروکا، ورنیکه، کانداکشن)</li>
              </ul>
            </div>

            {/* Right Hemisphere Card */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-purple-900/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-purple-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  نیمکره راست: حاکم بافت و فرامتن (The Context)
                </span>
                <span className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300">Holistic Right</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>پردازش کلی‌نگر، دیداری-فضایی و همزمان</li>
                <li>کدگشایی کنایه، ضرب‌المثل، شوخی، استعاره و ایهام</li>
                <li>نوای احساسی گفتار (بیان خشم، شادمانی، کنایه، غم در لحن)</li>
                <li>پوشش دوطرفه شبکه توجه دیداری به کل فضا</li>
                <li><strong className="text-purple-300">نتیجه آسیب:</strong> سندروم RHD، آپروسودی و نگلکت فضایی</li>
              </ul>
            </div>
          </div>

          {/* Interactive Metaphor Example */}
          <div className="p-4 bg-indigo-950/30 border border-indigo-900/60 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-300 block">
              شبیه‌ساز درک استعاره در بالین: جمله «پام شکست!» حین خستگی مفرط
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-rose-300 block mb-1">تعبیر بیمار آسیب راست (RHD):</span>
                <span>«باید فوری بریم بیمارستان عکس رادیولوژی بگیریم تا گچ بگیرن!» (برداشت تحت‌اللفظی خام)</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-emerald-300 block mb-1">تعبیر مغز سالم با نیمکره راست فعال:</span>
                <span>«بنده خدا خیلی خسته است و راه طولانی آمده، باید بنشیند استراحت کند.» (استخراج بافتار)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Unilateral Spatial Neglect Simulation */}
      {activeTab === 'neglect' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Clock Drawing Test Simulation */}
          <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-200 block">
              آزمون رسم ساعت (Clock Drawing Test in RHD):
            </span>

            <div className="h-44 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center relative">
              {/* Clock Circle */}
              <div className="w-36 h-36 rounded-full border-2 border-slate-700 bg-slate-950 relative flex items-center justify-center">
                {/* Center dot */}
                <div className="w-2 h-2 rounded-full bg-slate-500" />

                {/* Clock numbers: in Left Neglect, all numbers 1..12 are crammed on the RIGHT side! */}
                <div className="absolute top-1 right-8 text-[11px] font-mono text-rose-400 font-bold">12</div>
                <div className="absolute top-4 right-4 text-[11px] font-mono text-rose-400 font-bold">1</div>
                <div className="absolute top-9 right-2 text-[11px] font-mono text-rose-400 font-bold">2</div>
                <div className="absolute top-15 right-1 text-[11px] font-mono text-rose-400 font-bold">3</div>
                <div className="absolute bottom-9 right-2 text-[11px] font-mono text-rose-400 font-bold">4</div>
                <div className="absolute bottom-5 right-4 text-[11px] font-mono text-rose-400 font-bold">5</div>
                <div className="absolute bottom-2 right-8 text-[11px] font-mono text-rose-400 font-bold">6</div>
                <div className="absolute bottom-1 right-12 text-[11px] font-mono text-rose-400 font-bold">7</div>
                <div className="absolute bottom-2 right-14 text-[11px] font-mono text-rose-400 font-bold">8</div>
                <div className="absolute top-16 right-16 text-[11px] font-mono text-rose-400 font-bold">9,10,11</div>

                {/* Left side empty watermark */}
                <div className="absolute left-4 text-[10px] text-slate-600 font-bold -rotate-45">
                  فضای کاملا نادیده گرفته‌شده
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              بیمار متوجه نمی‌شود که نیمه چپ خالی مانده است. در ذهن او تمام ساعت با تمام اعداد رسم شده است!
            </p>
          </div>

          {/* Reading Paragraph with Visual Scanning Line Therapy */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  شبیه‌ساز خواندن متن و بازتوانی با خط هدایت قرمز (Visual Anchor)
                </span>
                <button
                  onClick={() => setShowNeglectRedLine(!showNeglectRedLine)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                    showNeglectRedLine
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {showNeglectRedLine ? '✓ خط هدایت قرمز فعال است' : '+ فعال‌سازی خط هدایت قرمز'}
                </button>
              </div>

              {/* Text Box Showing Left Neglect */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 relative text-xs leading-relaxed space-y-2">
                {/* Visual Red Anchor Line */}
                {showNeglectRedLine && (
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-rose-500 shadow-lg shadow-rose-500/50 rounded-r-xl" />
                )}

                <div className={`transition-opacity ${!showNeglectRedLine ? 'text-slate-400' : 'text-slate-100'}`}>
                  <p>
                    <span className={!showNeglectRedLine ? 'opacity-20 line-through text-slate-600' : 'text-cyan-300 font-bold'}>
                      [بیمار سکته مغزی به بخش توانبخشی آمد و ]
                    </span>{' '}
                    <span>گفتاردرمانگر تمرینات خواندن را با او آغاز کرد.</span>
                  </p>
                  <p>
                    <span className={!showNeglectRedLine ? 'opacity-20 line-through text-slate-600' : 'text-cyan-300 font-bold'}>
                      [در ابتدای جلسه نیمی از کلمات متن حذف می‌شد، اما با ]
                    </span>{' '}
                    <span>قرار دادن خط قرمز در حاشیه، نگاه بیمار به سمت چپ کشیده شد.</span>
                  </p>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-400">
                {!showNeglectRedLine ? (
                  <span className="text-rose-400">
                    ⚠️ در حالت بدون خط هدایت، بیمار کلمات کم‌رنگ سمت راست/چپ سطر را اصلا نمی‌خواند (Neglect Alexia).
                  </span>
                ) : (
                  <span className="text-emerald-400">
                    ✅ با ایجاد انکر دیداری (Visual Scanning Line)، مغز یاد می‌گیرد پیش از خواندن چشم را به خط قرمز متصل کند.
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-purple-950/30 border border-purple-900/50 rounded-xl text-[11px] text-slate-300">
              <span className="font-bold text-purple-300 block mb-0.5">پاسخ دفاعی به پرسش اساتید:</span>
              <span>
                چرا نگلکت راست نداریم؟ چون نیمکره راست توجه را به هر دو نیمه فضا هدایت می‌کند، اما نیمکره چپ صرفا به راست نگاه دارد.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
