'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, HelpCircle, Sparkles, AlertCircle, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';

interface WorkshopCase {
  id: string;
  sessionId: number;
  sessionTitle: string;
  title: string;
  subtitle: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  clinicalPearl: string;
  maneuverTip?: string;
}

const FACULTY_WORKSHOPS: WorkshopCase[] = [
  {
    id: 'ws-s3',
    sessionId: 3,
    sessionTitle: 'جلسه سوم: نوروفیزیولوژی حرکتی',
    title: 'کارگاه ۱: تشخیص افتراقی دو بیمار دیس‌آرتری در بالین',
    subtitle: 'تعیین سطح ضایعه UMN در برابر LMN بر اساس رفلکس فک و کیفیت صدا',
    scenario: 'دو بیمار به کلینیک مراجعه کرده‌اند؛ اولی صدای مجهد و خفه با رفلکس فک (Jaw Jerk) چهار مثبت (++++) و قفل شدن زبان در DDK دارد؛ دومی صدای بسیار نفس‌آلود همراه با آتروفی یکطرفه زبان، پرش‌های کرمی در کف دهان و رفلکس فک غایب دارد.',
    options: [
      {
        id: 'opt1',
        text: 'بیمار اول: ضایعه دوطرفه UMN (دیس‌آرتری اسپاستیک) | بیمار دوم: ضایعه LMN در هسته یا عصب دوازدهم (دیس‌آرتری شل)',
        isCorrect: true,
        explanation: 'کاملا صحیح است! رفلکس فک تشدید یافته با صدای مجهد نشانگر حذف مهار UMN است؛ در حالی که آتروفی و فاسیکولاسیون زبان علامت قطعی قطع عصب محیطی (LMN) است.'
      },
      {
        id: 'opt2',
        text: 'هر دو بیمار دچار ضایعه مخچه‌ای آتاکسیک هستند.',
        isCorrect: false,
        explanation: 'نادرست. در آتاکسی عدم هماهنگی و ریتم نامنظم داریم، نه هایپررفلکسی فک یا آتروفی سریع زبان.'
      },
      {
        id: 'opt3',
        text: 'بیمار اول ضایعه LMN و بیمار دوم ضایعه UMN دارد.',
        isCorrect: false,
        explanation: 'برعکس است! UMN باعث اسپاستیسیتی و رفلکس تشدید یافته می‌شود و LMN آتروفی و شلی می‌آورد.'
      }
    ],
    clinicalPearl: 'فاسیکولاسیون اختصاصی LMN است چون ناشی از حساسیت عصب‌کشی (Denervation Hypersensitivity) غشای عضله است.'
  },
  {
    id: 'ws-s7',
    sessionId: 7,
    sessionTitle: 'جلسه هفتم: نوروساینس شناختی',
    title: 'کارگاه ۲: افتراق آفازی نیمکره چپ از اختلال RHD راست',
    subtitle: 'تحلیل خطای تعبیر کنایه و نوای گفتار رباتیک',
    scenario: 'بیمار الف در یافتن کلمات به شدت کند است و گرامر جملاتش به هم ریخته، اما لحن عاطفی عالی دارد و طنزها را می‌فهمد. بیمار ب تمام واژگان را دقیق و با دستور صحیح ادا می‌کند، اما لحن صدایش مثل ربات فاقد احساس است و شوخی «پام شکست» را مساوی آتلیه عکسبرداری می‌داند.',
    options: [
      {
        id: 'opt1',
        text: 'بیمار الف: آفازی ناشی از سکته نیمکره چپ | بیمار ب: اختلال شناختی-ارتباطی ناشی از آسیب نیمکره راست (RHD)',
        isCorrect: true,
        explanation: 'درود بر شما! نیمکره چپ متولی ساختار واجی، نحوی و واژگان است؛ و نیمکره راست متولی معنای بافتی، استعاره، شوخی و نوای احساسی گفتار است.'
      },
      {
        id: 'opt2',
        text: 'بیمار الف دچار دمانس آلزایمر است و بیمار ب کاملا سالم و بدون ضایعه است.',
        isCorrect: false,
        explanation: 'نادرست. بیمار ب سندروم کلاسیک RHD با آپروسودی و نارسایی کاربردشناختی دارد.'
      }
    ],
    clinicalPearl: 'استراتژی طلایی برای خانواده بیمار RHD: پرهیز از گفتار استعاری و استفاده از بیانات صریح و مستقیم بدون کنایه.'
  },
  {
    id: 'ws-s11',
    sessionId: 11,
    sessionTitle: 'جلسه یازدهم: اعصاب مغزی و حنجره',
    title: 'کارگاه ۳: تحلیل جهت انحراف زبان و زبانه‌کام (Uvula)',
    subtitle: 'بیومکانیک عضلات ژنیوگلوس و بالابرنده کام در معاینه عصب ۱۰ و ۱۲',
    scenario: 'پزشک هنگام معاینه دهان بیمار از او می‌خواهد صدای بلند /a/ را بکشد؛ زبانه‌کام (Uvula) به سمت چپ کشیده می‌شود. سپس می‌خواهد زبانش را مستقیم بیرون بیاورد؛ نوک زبان به سمت راست منحرف می‌شود. محل آسیب اعصاب کجاست؟',
    options: [
      {
        id: 'opt1',
        text: 'آسیب عصب واگ (X) سمت راست + آسیب عصب زیرزبانی (XII) سمت راست',
        isCorrect: true,
        explanation: 'پاسخ کاملا دقیق و استادانه! در عصب واگ، کام نرم سمت سالم (چپ) منقبض شده و زبانه‌کام را به سمت سالم می‌کشد. در عصب ۱۲، عضله ژنیوگلوس سالم (چپ) زبان را به سمت آسیب‌دیده (راست) هل می‌دهد.'
      },
      {
        id: 'opt2',
        text: 'آسیب عصب واگ سمت چپ و عصب ۱۲ سمت چپ',
        isCorrect: false,
        explanation: 'نادرست. زبان همواره به سمت ضایعه منحرف می‌شود (The tongue points to the lesion side)، بنابراین عصب ۱۲ راست آسیب دیده است.'
      }
    ],
    clinicalPearl: 'قانون طلایی بالینی: زبانه‌کام (Uvula) از سمت آسیب فرار می‌کند، اما نوک زبان به سمت آسیب اشاره می‌کند!'
  },
  {
    id: 'ws-s14',
    sessionId: 14,
    sessionTitle: 'جلسه چهاردهم: فیزیولوژی بلع و دیسفاژی',
    title: 'کارگاه ۴: تصمیم‌گیری تغذیه انترال و مانور چانه به پایین',
    subtitle: 'انتخاب میان NG-Tube، پگ (PEG) و آموزش مانور Chin-Tuck',
    scenario: 'بیمار مرد ۶۵ ساله با سکته مزمن بصل‌النخاع (Wallenberg) و آسپیراسیون خاموش که اکنون ۴۵ روز است لوله بینی NG-Tube دارد و دچار سرفه‌های شبانه ریفلاکسی و زخم مخاطی شده است. اقدام بالینی صحیح چیست؟',
    options: [
      {
        id: 'opt1',
        text: 'تبدیل فوری لوله بینی به لوله پگ (PEG) جهت رفع ریفلاکس اسفنکتری + شروع مانور Chin-Tuck در تمرینات بلع',
        isCorrect: true,
        explanation: 'احسنت! نگهداری لوله NG بیش از ۴ هفته به دلیل باز نگه داشتن UES و ایجاد ریفلاکس ممنوع است. PEG راه هوایی را آزاد می‌کند و مانور چانه به پایین والکولا را عریض کرده و حنجره را زیر ریشه زبان پنهان می‌سازد.'
      },
      {
        id: 'opt2',
        text: 'ادامه لوله NG-Tube برای ۳ ماه دیگر تا بلع خودبه‌خود برگردد.',
        isCorrect: false,
        explanation: 'یک خطای پزشکی فاحش! ادامه NG مخاط را فرسوده کرده و گیرنده‌های حلقی را بی‌حس می‌کند.'
      }
    ],
    clinicalPearl: 'مانور Chin-Tuck با خم کردن سر به جلو زاویه مدخل حنجره را بسته و ورود پیش‌رس مایعات را به تاخیر می‌اندازد.',
    maneuverTip: 'طریقه اجرای مانور: سر را رو به پایین خم کرده به طوری که چانه به جناغ نزدیک شود؛ در همین حالت بلع انجام می‌پذیرد.'
  }
];

export default function FacultyCaseWorkshops() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const activeCase = FACULTY_WORKSHOPS[currentIdx];

  const handleSelectOption = (id: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setHasSubmitted(true);
    const chosen = activeCase.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextCase = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % FACULTY_WORKSHOPS.length);
  };

  const handlePrevCase = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setCurrentIdx((prev) => (prev - 1 + FACULTY_WORKSHOPS.length) % FACULTY_WORKSHOPS.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              کارگاه‌های تعاملی سناریوهای بالینی ویژه جلسه اساتید
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            چالش‌های بالینی چندگزینه‌ای با بازخورد تحلیل بیومکانیک و نوروفیزیولوژیک
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevCase}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="سناریوی قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-amber-400 px-2 py-1 bg-slate-950 rounded border border-slate-800">
            کارگاه {currentIdx + 1} از {FACULTY_WORKSHOPS.length}
          </span>
          <button
            onClick={handleNextCase}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="سناریوی بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Case Content */}
      <div className="space-y-5">
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {activeCase.sessionTitle}
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
              {activeCase.subtitle}
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-100">{activeCase.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            {activeCase.scenario}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 block">
            گزینه تشخیصی یا درمانی مدنظر خود را انتخاب فرمایید:
          </label>
          {activeCase.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.isCorrect;
            let borderBgStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60';

            if (isSelected && !hasSubmitted) {
              borderBgStyle = 'bg-cyan-500/20 border-cyan-500 text-white';
            } else if (hasSubmitted) {
              if (isCorrect) {
                borderBgStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
              } else if (isSelected && !isCorrect) {
                borderBgStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
              }
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${borderBgStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{opt.text}</span>
                  {hasSubmitted && isCorrect && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> پاسخ صحیح
                    </span>
                  )}
                  {hasSubmitted && isSelected && !isCorrect && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" /> پاسخ نادرست
                    </span>
                  )}
                </div>

                {hasSubmitted && isSelected && (
                  <p className="text-[11px] pt-2 border-t border-slate-800/80 leading-relaxed">
                    {opt.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Next Buttons */}
        <div className="flex items-center justify-between pt-2">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20"
            >
              ثبت و بررسی استدلال بالینی
            </button>
          ) : (
            <button
              onClick={handleNextCase}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>رفتن به کارگاه بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Clinical Pearl Box */}
          {hasSubmitted && (
            <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>نکته طلایی: {activeCase.clinicalPearl}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
