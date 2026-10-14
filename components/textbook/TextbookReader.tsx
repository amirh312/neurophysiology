'use client';

import React, { useState } from 'react';
import { TEXTBOOK_SECTIONS, PHARMACOLOGY_MATRIX, TextbookSection } from '@/data/textbookData';
import { BookOpen, Search, Pill, Sparkles, Printer, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';

export default function TextbookReader() {
  const [activeTab, setActiveTab] = useState<'textbook' | 'pharma' | 'glossary'>('textbook');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'sec1-1': true,
    'sec1-2': true,
    'sec2-1': true,
    'sec3-1': true,
    'sec4-1': true
  });

  const activeChapter = TEXTBOOK_SECTIONS.find((ch) => ch.id === selectedChapterId) || TEXTBOOK_SECTIONS[0];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPharma = PHARMACOLOGY_MATRIX.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.persianName.includes(searchQuery) ||
    item.clinicalIndication.includes(searchQuery) ||
    item.effectOnSpeechAndSwallowing.includes(searchQuery)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative">
      {/* Reader Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              درسنامه جامع نوروفیزیولوژی و علوم اعصاب گفتار، شناخت و بلع
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            مرجع علمی یکپارچه شامل مبانی حس و حرکت، کارکردهای اجرایی کورتکس، اعصاب مغزی و داروشناسی بالینی
          </p>
        </div>

        {/* Tab Switcher & Print */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('textbook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'textbook' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              متن کامل درسنامه
            </button>
            <button
              onClick={() => setActiveTab('pharma')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'pharma' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              ماتریس داروشناسی
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
            title="چاپ یا ذخیره PDF هندآوت"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'textbook' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chapter Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-2.5">
            <label className="text-xs font-bold text-slate-400 block mb-2">فصول چهارگانه درسنامه:</label>
            {TEXTBOOK_SECTIONS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`w-full text-right p-3.5 rounded-xl border transition-all text-xs space-y-1 block ${
                  selectedChapterId === ch.id
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-cyan-300">فصل {ch.chapterNumber}</span>
                  <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-400">
                    {ch.subsections.length} بخش
                  </span>
                </div>
                <span className="font-semibold block text-slate-200 text-xs">{ch.title}</span>
                <span className="text-[11px] text-slate-400 line-clamp-1">{ch.subtitle}</span>
              </button>
            ))}
          </div>

          {/* Chapter Detail View */}
          <div className="lg:col-span-8 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-5 max-h-[640px] overflow-y-auto">
            {/* Chapter Header */}
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                فصل {activeChapter.chapterNumber} درسنامه
              </span>
              <h2 className="text-lg font-bold text-slate-100">{activeChapter.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{activeChapter.summary}</p>
            </div>

            {/* Subsections */}
            <div className="space-y-4">
              {activeChapter.subsections.map((sec) => {
                const isExpanded = !!expandedSections[sec.id];
                return (
                  <div key={sec.id} className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className="w-full text-right p-3.5 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="font-bold text-xs text-slate-200">{sec.title}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-1 border-t border-slate-800/80 space-y-3 text-xs leading-relaxed text-slate-300">
                        {/* Latin terms chip */}
                        {sec.latinTerms && sec.latinTerms.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pb-2">
                            {sec.latinTerms.map((term, i) => (
                              <span key={i} className="text-[10px] font-mono bg-slate-950 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                                {term}
                              </span>
                            ))}
                          </div>
                        )}

                        {sec.content.map((p, idx) => (
                          <p key={idx} className="text-slate-300">
                            {p}
                          </p>
                        ))}

                        {sec.keyTakeaway && (
                          <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-lg text-cyan-200 text-xs flex items-center gap-2 mt-2">
                            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span><strong>نکته کلیدی:</strong> {sec.keyTakeaway}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pharmacology Matrix View */}
      {activeTab === 'pharma' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <Search className="w-4 h-4 text-slate-400 ml-1" />
            <input
              type="text"
              placeholder="جستجو در داروها، اندیکاسیون یا اثر بر گفتار و بلع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPharma.map((drug) => (
              <div key={drug.name} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-amber-400">{drug.persianName}</h4>
                      <span className="text-[11px] font-mono text-slate-400">{drug.name}</span>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                      {drug.drugClass.split('(')[0]}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px]">مکانیسم و گیرنده هدف:</span>
                      <span className="font-mono text-cyan-300 text-[11px]">{drug.molecularTarget}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">اندیکاسیون بالینی:</span>
                      <span>{drug.clinicalIndication}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-900">
                      <span className="text-slate-500 block text-[10px]">تاثیر بر گفتار و بلع:</span>
                      <span className="text-slate-200">{drug.effectOnSpeechAndSwallowing}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                  <div className="text-rose-400">
                    <span className="font-bold">عوارض:</span> {drug.sideEffects}
                  </div>
                  <div className="text-amber-300/90 bg-amber-950/30 p-2 rounded border border-amber-900/50">
                    <span className="font-bold">ملاحظه گفتاردرمانی:</span> {drug.slpConsiderations}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
