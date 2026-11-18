import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MiniSaiProvider } from './context/MiniSaiContext';
import { 
  WebShoot, 
  MiniSaiPopup, 
  MiniSaiAssistant, 
  MiniSaiGuidedTour, 
  MiniSaiLauncher 
} from './components/MiniSai';
import { CinematicIntro } from './components/hero/CinematicIntro';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { HeroSection } from './components/hero/HeroSection';
import { OriginSection } from './components/story/OriginSection';
import { ArsenalSection } from './components/skills/ArsenalSection';
import { MissionsSection } from './components/projects/MissionsSection';
import { JourneySection } from './components/timeline/JourneySection';
import { AchievementsSection } from './components/achievements/AchievementsSection';
import { DeveloperActivitySection } from './components/activity/DeveloperActivitySection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';

export function App() {
  const [introFinished, setIntroFinished] = useState<boolean>(false);

  useEffect(() => {
    // Check if visitor has completed the intro in this browsing session
    const hasSeen = sessionStorage.getItem('web_of_ideas_intro_completed');
    if (hasSeen === 'true') {
      setIntroFinished(true);
    }
  }, []);

  const handleCompleteIntro = () => {
    sessionStorage.setItem('web_of_ideas_intro_completed', 'true');
    setIntroFinished(true);
  };

  return (
    <MiniSaiProvider onReplayIntro={() => setIntroFinished(false)}>
      <div className="relative min-h-screen bg-[#07080C] text-[#F5F6F8] selection:bg-[#E32636]/30 selection:text-[#FF3548]">
        
        {/* Subtle Cinematic Film Grain Overlay */}
        <div className="film-grain pointer-events-none" />

        {/* Custom Precision Spider-Reticle Cursor for Desktop */}
        <CustomCursor />

        {/* Mini Sai Fullscreen Web-Shoot Laser & Arc System */}
        <WebShoot />

        {/* Mini Sai Interactive Message Popup */}
        <MiniSaiPopup />

        {/* Mini Sai Autonomous Chat & Voice Assistant Drawer */}
        <MiniSaiAssistant />

        {/* Mini Sai Guided Tour Overlay Banner */}
        <MiniSaiGuidedTour />

        {/* Mini Sai Floating Action Launcher */}
        <MiniSaiLauncher />

        {/* Full-Screen Cinematic Awakening Intro */}
        <AnimatePresence>
          {!introFinished && (
            <CinematicIntro onComplete={handleCompleteIntro} />
          )}
        </AnimatePresence>

        {/* Top Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Floating Main Navigation Bar */}
        <Navbar />

        {/* Main Experience Flow */}
        <main id="main-content" className="relative z-10 flex flex-col">
          {/* Sector 01: Hero & 3D Interactive Web Scene */}
          <HeroSection />

          {/* Sector 02: Origin Story & Trajectory */}
          <OriginSection />

          {/* Sector 03: The Arsenal Knowledge Constellation */}
          <ArsenalSection />

          {/* Sector 04: Project Missions & Interactive Simulators */}
          <MissionsSection />

          {/* Sector 05: Journey Timeline */}
          <JourneySection />

          {/* Sector 06: Verified Credentials & Certifications */}
          <AchievementsSection />

          {/* Sector 07: Developer Activity & Repositories */}
          <DeveloperActivitySection />

          {/* Sector 08: Contact & Next Chapter */}
          <ContactSection />
        </main>

        {/* Universe Baseline Footer */}
        <Footer />
      </div>
    </MiniSaiProvider>
  );
}

export default App;
