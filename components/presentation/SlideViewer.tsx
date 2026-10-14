'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Slide } from '@/data/presentationData';
import SpindleSpasticitySimulator from '@/components/simulators/SpindleSpasticitySimulator';
import SensoryReceptorMatrix from '@/components/simulators/SensoryReceptorMatrix';
import UmnLmnDiagnosticLab from '@/components/simulators/UmnLmnDiagnosticLab';
import HemisphericBrainExplorer from '@/components/simulators/HemisphericBrainExplorer';
import CranialNervesLarynxLab from '@/components/simulators/CranialNervesLarynxLab';
import DeglutitionEngine from '@/components/simulators/DeglutitionEngine';
import { Sparkles, HelpCircle, CheckCircle2, Bookmark, Layers, MessageSquare, Table2, Flame } from 'lucide-react';

interface SlideViewerProps {
  slide: Slide;
  showPresenterNotes: boolean;
  totalSlidesInSession: number;
}

export default function SlideViewer({ slide, showPresenterNotes, totalSlidesInSession }: SlideViewerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 min-h-[calc(100vh-160px)] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Top Session & Slide Meta Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {slide.sessionTitle}
              </span>
              <span className="text-slate-400 font-mono">
                اسلاید {slide.slideNumber} از {totalSlidesInSession}
              </span>
            </div>

            {slide.type === 'anchor' && (
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> لنگر بالینی (Clinical Anchor)
              </span>
            )}
            {slide.type === 'question' && (
              <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> پرسش مفهومی و دفاع بالینی
              </span>
            )}
            {slide.type === 'workshop' && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> تمرین کارگاهی سر کلاس
              </span>
            )}
          </div>

          {/* Slide Main Header */}
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-sm md:text-base text-cyan-400 font-medium">
                {slide.subtitle}
              </p>
            )}
          </div>

          {/* Table View (for Slides with Table Data) */}
          {slide.tableData && (
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-2 shadow-xl">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    {slide.tableData.headers.map((h, i) => (
                      <th key={i} className="p-3 font-bold text-cyan-300">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {slide.tableData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3 font-semibold text-slate-200">{row.feature}</td>
                      <td className="p-3 text-slate-300">{row.col1}</td>
                      <td className="p-3 text-slate-300">{row.col2}</td>
                      {(row.col2Details || row.col3 || row.details) && (
                        <td className="p-3 text-slate-300">{row.col2Details || row.col3 || row.details}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Bullet Points Grid */}
          {slide.bullets && slide.bullets.length > 0 && (
            <div className={`grid gap-3 ${slide.interactiveType ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {slide.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-3.5 flex items-start gap-3 hover:border-slate-700 transition-all text-xs md:text-sm leading-relaxed text-slate-200"
                >
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          )}

          {/* Embedded Interactive Visualizer (When Available on Slide) */}
          {slide.interactiveType === 'ddk_spindle' && (
            <div className="pt-2">
              <SpindleSpasticitySimulator />
            </div>
          )}

          {slide.interactiveType === 'sensory_map' && (
            <div className="pt-2">
              <SensoryReceptorMatrix />
            </div>
          )}

          {slide.interactiveType === 'umn_lmn' && (
            <div className="pt-2">
              <UmnLmnDiagnosticLab />
            </div>
          )}

          {(slide.interactiveType === 'brain_pfc' || slide.interactiveType === 'neglect_test') && (
            <div className="pt-2">
              <HemisphericBrainExplorer />
            </div>
          )}

          {slide.interactiveType === 'cranial_larynx' && (
            <div className="pt-2">
              <CranialNervesLarynxLab />
            </div>
          )}

          {(slide.interactiveType === 'swallowing_phases' || slide.interactiveType === 'enteral_tree') && (
            <div className="pt-2">
              <DeglutitionEngine />
            </div>
          )}

          {/* Latin Footnote */}
          {slide.latinFootnote && (
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-cyan-400 font-bold uppercase">Latin References:</span>
              <span className="truncate">{slide.latinFootnote}</span>
            </div>
          )}

          {/* Presenter Speaker Notes Drawer (Toggled by Presenter) */}
          {showPresenterNotes && slide.presenterNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-amber-950/30 border border-amber-600/40 rounded-xl text-xs space-y-1 text-amber-200"
            >
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <MessageSquare className="w-4 h-4" />
                <span>یادداشت‌های دفاع و ارائه برای جلسه اساتید (Speaker Notes):</span>
              </div>
              <p className="leading-relaxed text-amber-100/90 pt-1">
                {slide.presenterNotes}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
