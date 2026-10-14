'use client';

import React, { useState, useEffect } from 'react';
import { SESSIONS_META } from '@/data/presentationData';
import {
  Presentation,
  FlaskConical,
  Stethoscope,
  BookOpen,
  Maximize,
  Minimize,
  Eye,
  MessageSquare,
  Clock,
  HelpCircle,
  X,
  Target
} from 'lucide-react';

interface PresentationHeaderProps {
  currentMode: 'slides' | 'simulators' | 'workshops' | 'textbook';
  onModeChange: (mode: 'slides' | 'simulators' | 'workshops' | 'textbook') => void;
  activeSessionId: number;
  onSessionChange: (sessionId: number) => void;
  isLaserActive: boolean;
  onToggleLaser: () => void;
  showPresenterNotes: boolean;
  onTogglePresenterNotes: () => void;
}

export default function PresentationHeader({
  currentMode,
  onModeChange,
  activeSessionId,
  onSessionChange,
  isLaserActive,
  onToggleLaser,
  showPresenterNotes,
  onTogglePresenterNotes
}: PresentationHeaderProps) {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand and Session Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
              SLP
            </span>
            <div className="hidden sm:block">
              <span className="font-bold text-xs text-white block">
                ارائه جامع نوروفیزیولوژی گفتار و بلع
              </span>
              <span className="text-[10px] text-slate-400">
                جلسه اساتید | دکتر مهدی خدادوست
              </span>
            </div>
          </div>

          {/* Session Switcher Pills */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {SESSIONS_META.map((sess) => (
              <button
                key={sess.id}
                onClick={() => onSessionChange(sess.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeSessionId === sess.id
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                جلسه {sess.id}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Presentation Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onModeChange('slides')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              currentMode === 'slides'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>اسلایدهای ارائه</span>
          </button>

          <button
            onClick={() => onModeChange('simulators')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              currentMode === 'simulators'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>آزمایشگاه شبیه‌سازها</span>
          </button>

          <button
            onClick={() => onModeChange('workshops')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              currentMode === 'workshops'
                ? 'bg-slate-800 text-amber-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>کارگاه سناریوها</span>
          </button>

          <button
            onClick={() => onModeChange('textbook')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              currentMode === 'textbook'
                ? 'bg-slate-800 text-emerald-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>درسنامه جامع</span>
          </button>
        </div>

        {/* Presenter Tools: Timer, Laser, Notes, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Presentation Timer */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
            title="کلیک برای توقف یا شروع تایمر"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTimer(secondsElapsed)}</span>
          </button>

          {/* Virtual Laser Pointer Toggle */}
          <button
            onClick={onToggleLaser}
            className={`p-1.5 rounded-lg border text-xs transition-all flex items-center gap-1 ${
              isLaserActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="لیزر پوینتر مجازی (L)"
          >
            <Target className="w-4 h-4 text-rose-500" />
          </button>

          {/* Presenter Notes Toggle */}
          <button
            onClick={onTogglePresenterNotes}
            className={`p-1.5 rounded-lg border text-xs transition-all flex items-center gap-1 ${
              showPresenterNotes
                ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="یادداشت‌های دفاع برای ارائه (N)"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </button>

          {/* Shortcuts Modal Trigger */}
          <button
            onClick={() => setShowShortcutsModal(true)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs"
            title="کلیدهای میانبر (؟)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs"
            title="حالت تمام صفحه (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-cyan-300">کلیدهای میانبر ارائه دانشگاهی</h3>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span>اسلاید بعدی:</span>
                <kbd className="font-mono bg-slate-800 px-2 py-0.5 rounded text-cyan-400">Space / Arrow Left</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span>اسلاید قبلی:</span>
                <kbd className="font-mono bg-slate-800 px-2 py-0.5 rounded text-cyan-400">Arrow Right</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span>تمام صفحه (Fullscreen):</span>
                <kbd className="font-mono bg-slate-800 px-2 py-0.5 rounded text-cyan-400">F</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span>لیزر پوینتر مجازی:</span>
                <kbd className="font-mono bg-slate-800 px-2 py-0.5 rounded text-rose-400">L</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span>یادداشت‌های سخنران (Notes):</span>
                <kbd className="font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-400">N</kbd>
              </div>
            </div>

            <button
              onClick={() => setShowShortcutsModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
