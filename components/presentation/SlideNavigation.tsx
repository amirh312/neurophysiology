'use client';

import React, { useState } from 'react';
import { Slide } from '@/data/presentationData';
import { ChevronRight, ChevronLeft, Grid, X, Check } from 'lucide-react';

interface SlideNavigationProps {
  currentSlideIndex: number;
  totalSlides: number;
  currentSlide: Slide;
  allSessionSlides: Slide[];
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (slideIndex: number) => void;
}

export default function SlideNavigation({
  currentSlideIndex,
  totalSlides,
  currentSlide,
  allSessionSlides,
  onPrev,
  onNext,
  onSelectSlide
}: SlideNavigationProps) {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const progressPercent = Math.round(((currentSlideIndex + 1) / totalSlides) * 100);

  return (
    <>
      <footer className="sticky bottom-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2">
        {/* Progress Line */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Quick Drawer Button & Slide Index */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDrawer(true)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs flex items-center gap-1.5 transition-colors"
              title="فهرست و انتخاب سریع اسلاید"
            >
              <Grid className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline font-medium">فهرست اسلایدها</span>
            </button>

            <div className="text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">{currentSlideIndex + 1}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span>{totalSlides}</span>
            </div>
          </div>

          {/* Current Slide Title (Truncated) */}
          <div className="hidden md:block text-xs text-slate-400 truncate max-w-md text-center">
            {currentSlide.title}
          </div>

          {/* Navigation Controls: In Persian RTL, Next is right-to-left arrow or visually left */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span>اسلاید قبلی</span>
            </button>

            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-md shadow-cyan-600/20"
            >
              <span>اسلاید بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Visual Slide Drawer Modal */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 border-r border-slate-800 w-full max-w-lg h-full flex flex-col justify-between shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">فهرست اسلایدهای جلسه جاری</h3>
                <span className="text-xs text-slate-400">{allSessionSlides.length} اسلاید موجود</span>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Cards List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {allSessionSlides.map((s, index) => {
                const isSelected = index === currentSlideIndex;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSlide(index);
                      setShowDrawer(false);
                    }}
                    className={`w-full text-right p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                        isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {s.slideNumber}
                    </span>
                    <div className="flex-1">
                      <span className="font-bold block text-slate-200">{s.title}</span>
                      {s.subtitle && (
                        <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {s.subtitle}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
