'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PRESENTATION_SLIDES, SESSIONS_META, Slide } from '@/data/presentationData';
import PresentationHeader from '@/components/presentation/PresentationHeader';
import SlideViewer from '@/components/presentation/SlideViewer';
import SlideNavigation from '@/components/presentation/SlideNavigation';
import LabShowcase from '@/components/simulators/LabShowcase';
import FacultyCaseWorkshops from '@/components/workshops/FacultyCaseWorkshops';
import TextbookReader from '@/components/textbook/TextbookReader';
import LaserPointer from '@/components/ui/LaserPointer';

export default function PresentationApp() {
  const [currentMode, setCurrentMode] = useState<'slides' | 'simulators' | 'workshops' | 'textbook'>('slides');
  const [activeSessionId, setActiveSessionId] = useState<number>(3);
  const [slideIndexInSession, setSlideIndexInSession] = useState<number>(0);
  const [showPresenterNotes, setShowPresenterNotes] = useState<boolean>(false);
  const [isLaserActive, setIsLaserActive] = useState<boolean>(false);

  // Filter slides for active session
  const currentSessionSlides = useMemo(() => {
    return PRESENTATION_SLIDES.filter((s) => s.sessionId === activeSessionId);
  }, [activeSessionId]);

  const currentSlide = currentSessionSlides[slideIndexInSession] || currentSessionSlides[0];

  const handleNextSlide = useCallback(() => {
    setSlideIndexInSession((prev) => Math.min(currentSessionSlides.length - 1, prev + 1));
  }, [currentSessionSlides.length]);

  const handlePrevSlide = useCallback(() => {
    setSlideIndexInSession((prev) => Math.max(0, prev - 1));
  }, []);

  const handleSessionChange = (sessionId: number) => {
    setActiveSessionId(sessionId);
    setSlideIndexInSession(0);
    setCurrentMode('slides');
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'l' || e.key === 'L') {
        setIsLaserActive((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowPresenterNotes((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white relative">
      {/* Virtual Laser Pointer Overlay */}
      <LaserPointer isActive={isLaserActive} />

      {/* Presentation Header Bar */}
      <PresentationHeader
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        activeSessionId={activeSessionId}
        onSessionChange={handleSessionChange}
        isLaserActive={isLaserActive}
        onToggleLaser={() => setIsLaserActive(!isLaserActive)}
        showPresenterNotes={showPresenterNotes}
        onTogglePresenterNotes={() => setShowPresenterNotes(!showPresenterNotes)}
      />

      {/* Main Presentation Viewports */}
      <main className="flex-1 flex flex-col justify-center">
        {currentMode === 'slides' && (
          <SlideViewer
            slide={currentSlide}
            showPresenterNotes={showPresenterNotes}
            totalSlidesInSession={currentSessionSlides.length}
          />
        )}

        {currentMode === 'simulators' && <LabShowcase />}

        {currentMode === 'workshops' && (
          <div className="w-full max-w-5xl mx-auto px-4 py-6">
            <FacultyCaseWorkshops />
          </div>
        )}

        {currentMode === 'textbook' && (
          <div className="w-full max-w-6xl mx-auto px-4 py-6">
            <TextbookReader />
          </div>
        )}
      </main>

      {/* Slide Navigation (Only shown in Slides Mode) */}
      {currentMode === 'slides' && (
        <SlideNavigation
          currentSlideIndex={slideIndexInSession}
          totalSlides={currentSessionSlides.length}
          currentSlide={currentSlide}
          allSessionSlides={currentSessionSlides}
          onPrev={handlePrevSlide}
          onNext={handleNextSlide}
          onSelectSlide={(idx) => setSlideIndexInSession(idx)}
        />
      )}
    </div>
  );
}
