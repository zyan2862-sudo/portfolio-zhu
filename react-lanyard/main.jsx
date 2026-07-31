import React from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import messageBoardFront from './message-board-card-face.png';

function MessageLanyard() {
  return (
    <div className="hero-react-lanyard-hit">
      <Lanyard
        position={[0, 0, 31.5]}
        fov={24}
        gravity={[0, -38, 0]}
        frontImage={messageBoardFront}
        imageFit="contain"
        lanyardWidth={0.85}
        initialDrop
        initialImpulse={[1.05, -0.15, 0.38]}
        dragBounds={{ x: 6.5, yMin: -5, yMax: 4.5, z: 2 }}
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
