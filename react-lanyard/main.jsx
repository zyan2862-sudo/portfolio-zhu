import React from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import SplashCursor from './components/SplashCursor.jsx';
import SoftAurora from './SoftAurora/SoftAurora.jsx';
import KineticPhotoTrail from './KineticPhotoTrail/KineticPhotoTrail.jsx';
import WarpText from './WarpText/WarpText.jsx';
import LiquidEther from './LiquidEther/LiquidEther.jsx';
import BulgeText from './BulgeText/BulgeText.jsx';
import './MagicBento/MagicBento.css';
import './WarpText/ContactWarpText.css';
import messageBoardFront from './message-board-card-face.png';

function MessageLanyard() {
  return (
    <div className="hero-react-lanyard-hit">
      <Lanyard
        position={[0, 0, 11.5]}
        fov={24}
        gravity={[0, -38, 0]}
        frontImage={messageBoardFront}
        imageFit="contain"
        lanyardWidth={0.22}
        initialDrop
        initialImpulse={[0.12, -0.03, 0.05]}
        dragBounds={{ x: 7, yMin: -6.5, yMax: 6.5, z: 2 }}
        dragThreshold={8}
        onCardClick={() => window.dispatchEvent(new CustomEvent('hero-lanyard-message'))}
        ariaLabel="打开留言板"
      />
      <span className="hero-lanyard-drag-hint" aria-hidden="true">DRAG ME</span>
    </div>
  );
}

const mount = document.getElementById('heroLanyardReact');
if (mount) createRoot(mount).render(<MessageLanyard />);

function AboutSplashCursor() {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const section = document.getElementById('about');
    if (!section) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '12% 0px', threshold: 0.04 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return active ? <SplashCursor /> : null;
}

let splashRoot = null;
let splashMount = null;

function syncAboutSplashCursor() {
  const nextMount = document.getElementById('aboutSplashCursor');
  if (nextMount === splashMount) return;
  if (splashRoot) splashRoot.unmount();
  splashMount = nextMount;
  splashRoot = splashMount ? createRoot(splashMount) : null;
  if (splashRoot) splashRoot.render(<AboutSplashCursor />);
}

syncAboutSplashCursor();
new MutationObserver(syncAboutSplashCursor).observe(document.body, {
  childList: true,
  subtree: true
});

function SportReelSoftAurora() {
  return (
    <SoftAurora
      speed={0.6}
      scale={1.5}
      brightness={0.86}
      color1="#edf6ff"
      color2="#f2a9f6"
      noiseFrequency={2.5}
      noiseAmplitude={1.0}
      bandHeight={0.62}
      bandSpread={1.0}
      octaveDecay={0.1}
      layerOffset={0}
      colorSpeed={1.0}
      enableMouseInteraction
      mouseInfluence={0.25}
    />
  );
}

let softAuroraRoot = null;
let softAuroraMount = null;

function syncSportReelSoftAurora() {
  const nextMount = document.getElementById('sportReelSoftAurora');
  if (nextMount === softAuroraMount) return;
  if (softAuroraRoot) softAuroraRoot.unmount();
  softAuroraMount = nextMount;
  softAuroraRoot = softAuroraMount ? createRoot(softAuroraMount) : null;
  if (softAuroraRoot) softAuroraRoot.render(<SportReelSoftAurora />);
}

syncSportReelSoftAurora();
new MutationObserver(syncSportReelSoftAurora).observe(document.body, {
  childList: true,
  subtree: true
});

const kineticPhotoTrailMount = document.getElementById('kineticPhotoTrail');
if (kineticPhotoTrailMount) createRoot(kineticPhotoTrailMount).render(<KineticPhotoTrail />);

const experienceMapLiquidEtherMount = document.getElementById('experienceMapLiquidEther');
if (experienceMapLiquidEtherMount) {
  createRoot(experienceMapLiquidEtherMount).render(
    <LiquidEther
      colors={['#5227FF', '#FF9FFC', '#B497CF']}
      mouseForce={20}
      cursorSize={100}
      isViscous={false}
      viscous={30}
      iterationsViscous={32}
      iterationsPoisson={32}
      resolution={0.5}
      isBounce={false}
      autoDemo
      autoSpeed={0.5}
      autoIntensity={2.2}
      takeoverDuration={0.25}
      autoResumeDelay={3000}
      autoRampDuration={0.6}
    />
  );
}

const sportReelBulgeTextMount = document.getElementById('sportReelBulgeText');
if (sportReelBulgeTextMount) {
  createRoot(sportReelBulgeTextMount).render(
    <BulgeText lines={['SPORT IS NOT A', 'BACKDROP. IT IS THE', 'FIELD I ENTER.']} />
  );
}

function ContactWarpTitle({ text }) {
  return (
    <WarpText
      text={text}
      color="#082c5b"
      warpStrength={0.11}
      warpScale={1.7}
      speed={0.55}
      pointerInfluence={0.58}
      pointerStrength={0.72}
      refraction={0.035}
      ripple
      fontSize="clamp(2.35rem, 7.2vw, 6.5rem)"
      fontWeight={800}
      letterSpacing={/[\u3040-\u30ff\u3400-\u9fff]/.test(text) ? '-0.16em' : '-0.06em'}
      style={{ height: '100%' }}
    />
  );
}

let contactWarpRoot = null;
let contactWarpMount = null;

function syncContactWarpText() {
  const nextMount = document.getElementById('contactWarpText');
  if (nextMount === contactWarpMount) return;
  if (contactWarpRoot) contactWarpRoot.unmount();
  contactWarpMount = nextMount;
  contactWarpRoot = contactWarpMount ? createRoot(contactWarpMount) : null;
  if (contactWarpRoot) {
    contactWarpRoot.render(<ContactWarpTitle text={contactWarpMount.dataset.text || '联系我'} />);
  }
}

syncContactWarpText();
new MutationObserver(syncContactWarpText).observe(document.body, {
  childList: true,
  subtree: true
});
