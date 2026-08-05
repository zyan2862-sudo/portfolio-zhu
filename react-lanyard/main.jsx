import React from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import SplashCursor from './components/SplashCursor.jsx';
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
