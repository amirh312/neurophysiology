'use client';

import React, { useState } from 'react';
import SpindleSpasticitySimulator from '@/components/simulators/SpindleSpasticitySimulator';
import SensoryReceptorMatrix from '@/components/simulators/SensoryReceptorMatrix';
import UmnLmnDiagnosticLab from '@/components/simulators/UmnLmnDiagnosticLab';
import HemisphericBrainExplorer from '@/components/simulators/HemisphericBrainExplorer';
import CranialNervesLarynxLab from '@/components/simulators/CranialNervesLarynxLab';
import DeglutitionEngine from '@/components/simulators/DeglutitionEngine';
import { Activity, Compass, Stethoscope, Brain, Mic, ShieldCheck, Sparkles } from 'lucide-react';

export default function LabShowcase() {
  const [activeLabId, setActiveLabId] = useState<string>('spindle');

  const labs = [
    {
      id: 'spindle',
      title: '۱. دوک عضلانی و DDK',
      subtitle: 'وابستگی اسپاستیسیتی به سرعت کشش',
      icon: Activity,
      color: 'text-cyan-400',
      component: <SpindleSpasticitySimulator />
    },
    {
      id: 'sensory',
      title: '۲. تمایز دو نقطه‌ای دهان',
      subtitle: 'مایسنر، مرکل و کولیس لمسی',
      icon: Compass,
      color: 'text-amber-400',
      component: <SensoryReceptorMatrix />
    },
    {
      id: 'umn_lmn',
      title: '۳. افتراق بالینی UMN و LMN',
      subtitle: 'رفلکس فک و فاسیکولاسیون زبان',
      icon: Stethoscope,
      color: 'text-indigo-400',
      component: <UmnLmnDiagnosticLab />
    },
    {
      id: 'brain',
      title: '۴. قشر پیش‌پیشانی و نگلکت',
      subtitle: 'DLPFC، سوپرتری و آزمون ساعت',
      icon: Brain,
      color: 'text-purple-400',
      component: <HemisphericBrainExplorer />
    },
    {
      id: 'larynx',
      title: '۵. بیومکانیک حنجره و اعصاب',
      subtitle: 'شاخه‌های RLN و SLN واگ و گام صوتی',
      icon: Mic,
      color: 'text-emerald-400',
      component: <CranialNervesLarynxLab />
    },
    {
      id: 'swallow',
      title: '۶. موتور سینماتیک بلع',
      subtitle: '۴ فاز، ۵ محافظت و لوله‌های انترال',
      icon: ShieldCheck,
      color: 'text-rose-400',
      component: <DeglutitionEngine />
    }
  ];

  const currentLab = labs.find((l) => l.id === activeLabId) || labs[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Lab Selector Navigation */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">
            آزمایشگاه شبیه‌سازهای تعاملی نوروفیزیولوژی گفتار و بلع
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          برای نمایش زنده هر مکانیزم عصبی در جلسه اساتید، روی ماژول مدنظر کلیک کنید
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
          {labs.map((item) => {
            const Icon = item.icon;
            const isSelected = activeLabId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveLabId(item.id)}
                className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                </div>
                <div>
                  <span className={`font-bold block text-xs ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Lab */}
      <div>{currentLab.component}</div>
    </div>
  );
}
