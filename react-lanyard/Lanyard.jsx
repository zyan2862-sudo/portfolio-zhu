/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRapier,
  useRopeJoint,
  useSphericalJoint
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
import cardGLB from './card.glb';
import lanyard from './lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  onCardClick = null,
  initialDrop = false,
  initialImpulse = [0.45, 0, 0.18],
  dragBounds = { x: 7, yMin: -5, yMax: 5, z: 2 },
  dragThreshold = 8,
  className = '',
  ariaLabel = 'Interactive lanyard'
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const wrapper = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!wrapper.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={`lanyard-wrapper ${className}`.trim()} aria-label={ariaLabel}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            onCardClick={onCardClick}
            initialDrop={initialDrop && !reducedMotion}
            initialImpulse={reducedMotion ? [0.08, 0, 0.03] : initialImpulse}
            dragBounds={dragBounds}
            dragThreshold={dragThreshold}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  onCardClick = null,
  initialDrop = false,
  initialImpulse = [0.45, 0, 0.18],
  dragBounds = { x: 7, yMin: -5, yMax: 5, z: 2 },
  dragThreshold = 8
}) {
  const { viewport } = useThree();
  const anchorX = -viewport.width / 2 + (isMobile ? 1.02 : 1.48);
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const { rapier } = useRapier();
  const ang = new THREE.Vector3(),
    rot = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: false, colliders: false, angularDamping: 3, linearDamping: 3 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.fillStyle = '#020713';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const draggedRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);
  const capturedTarget = useRef(null);
  const activePointerId = useRef(null);
  const dragOffset = useRef(new THREE.Vector3());
  const dragPlane = useRef(new THREE.Plane());
  const dragPlaneNormal = useRef(new THREE.Vector3());
  const dragIntersection = useRef(new THREE.Vector3());
  const dragTarget = useRef(new THREE.Vector3());
  const dragRaycaster = useRef(new THREE.Raycaster());
  const dragPointer = useRef(new THREE.Vector2());
  const dragCamera = useRef(null);
  const dragCanvasRect = useRef(null);
  const didDrop = useRef(false);
  const returnTarget = useRef(new THREE.Vector3());
  const returning = useRef(false);
  const springOffset = new THREE.Vector3();
  const springVelocity = new THREE.Vector3();
  const springForce = new THREE.Vector3();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.44]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.44]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.44]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.05, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    if (!initialDrop || didDrop.current) return;
    const timer = window.setTimeout(() => {
      if (!card.current || didDrop.current) return;
      didDrop.current = true;
      card.current.wakeUp();
      card.current.setLinvel({ x: initialImpulse[0], y: initialImpulse[1], z: initialImpulse[2] }, true);
      card.current.setAngvel({ x: 0.05, y: -0.06, z: 0.14 }, true);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [initialDrop, initialImpulse]);

  const wakeChain = () => {
    [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
  };

  const pointerCaptureTarget = event => {
    if (typeof event.target?.setPointerCapture === 'function') return event.target;
    if (typeof event.nativeEvent?.target?.setPointerCapture === 'function') return event.nativeEvent.target;
    return null;
  };

  const beginDrag = event => {
    event.stopPropagation();
    if (!card.current) return;

    const bodyPosition = card.current.translation();
    const planePoint = new THREE.Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z);
    event.camera.getWorldDirection(dragPlaneNormal.current);
    dragPlane.current.setFromNormalAndCoplanarPoint(dragPlaneNormal.current, planePoint);

    const hitPoint = event.ray.intersectPlane(dragPlane.current, dragIntersection.current);
    dragOffset.current.copy(hitPoint || event.point).sub(planePoint);
    dragTarget.current.copy(planePoint);
    dragCamera.current = event.camera;
    dragCanvasRect.current = event.nativeEvent?.target?.getBoundingClientRect?.() || null;
    dragStart.current = { x: event.clientX, y: event.clientY };
    hasDragged.current = false;
    returning.current = false;
    returnTarget.current.copy(planePoint);
    activePointerId.current = event.pointerId;

    capturedTarget.current = pointerCaptureTarget(event);
    capturedTarget.current?.setPointerCapture(event.pointerId);

    draggedRef.current = true;
    card.current.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);
    card.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    card.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    wakeChain();
    drag(true);
  };

  const trackDrag = event => {
    if (!draggedRef.current) return;
    event.stopPropagation();
    updateDragTarget(event.clientX, event.clientY);
    if (Math.hypot(event.clientX - dragStart.current.x, event.clientY - dragStart.current.y) > dragThreshold) {
      hasDragged.current = true;
    }
  };

  const updateDragTarget = (clientX, clientY) => {
    if (!dragCamera.current || !dragCanvasRect.current) return;
    const rect = dragCanvasRect.current;
    dragPointer.current.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    dragRaycaster.current.setFromCamera(dragPointer.current, dragCamera.current);
    const hitPoint = dragRaycaster.current.ray.intersectPlane(dragPlane.current, dragIntersection.current);
    if (hitPoint) {
      dragTarget.current.set(
        THREE.MathUtils.clamp(hitPoint.x - dragOffset.current.x, -dragBounds.x, dragBounds.x),
        THREE.MathUtils.clamp(hitPoint.y - dragOffset.current.y, dragBounds.yMin, dragBounds.yMax),
        THREE.MathUtils.clamp(hitPoint.z - dragOffset.current.z, -dragBounds.z, dragBounds.z)
      );
    }
  };

  const endDrag = event => {
    if (!draggedRef.current && activePointerId.current === null) return;
    event?.stopPropagation?.();

    const pointerId = event?.pointerId ?? activePointerId.current;
    if (
      pointerId !== null &&
      capturedTarget.current &&
      typeof capturedTarget.current.releasePointerCapture === 'function'
    ) {
      try {
        if (!capturedTarget.current.hasPointerCapture || capturedTarget.current.hasPointerCapture(pointerId)) {
          capturedTarget.current.releasePointerCapture(pointerId);
        }
      } catch {
        // Capture may already have been released by the browser.
      }
    }

    if (event?.clientX != null && event?.clientY != null) {
      hasDragged.current =
        hasDragged.current ||
        Math.hypot(event.clientX - dragStart.current.x, event.clientY - dragStart.current.y) > dragThreshold;
    }

    draggedRef.current = false;
    activePointerId.current = null;
    capturedTarget.current = null;
    dragCamera.current = null;
    dragCanvasRect.current = null;
    drag(false);

    if (card.current) {
      card.current.setBodyType(rapier.RigidBodyType.Dynamic, true);
      card.current.wakeUp();
    }
    wakeChain();
    returning.current = hasDragged.current;
    document.body.style.cursor = 'auto';

    if (!hasDragged.current && event?.type === 'pointerup') onCardClick?.();
  };

  const dragHandlers = {
    onPointerOver: event => {
      event.stopPropagation();
      hover(true);
    },
    onPointerOut: event => {
      if (draggedRef.current) return;
      event.stopPropagation();
      hover(false);
    },
    onPointerDown: beginDrag,
    onPointerMove: trackDrag,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onLostPointerCapture: endDrag
  };

  useEffect(() => {
    const finishPointer = event => endDrag(event);
    const movePointer = event => {
      if (!draggedRef.current) return;
      updateDragTarget(event.clientX, event.clientY);
      if (Math.hypot(event.clientX - dragStart.current.x, event.clientY - dragStart.current.y) > dragThreshold) {
        hasDragged.current = true;
      }
    };
    const finishBlur = () => endDrag();
    window.addEventListener('pointermove', movePointer);
    window.addEventListener('pointerup', finishPointer);
    window.addEventListener('pointercancel', finishPointer);
    window.addEventListener('blur', finishBlur);
    return () => {
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerup', finishPointer);
      window.removeEventListener('pointercancel', finishPointer);
      window.removeEventListener('blur', finishBlur);
    };
  }, []);

  useFrame((state, delta) => {
    if (draggedRef.current && card.current) {
      wakeChain();
      card.current.setNextKinematicTranslation(dragTarget.current);
    }
    if (fixed.current) {
      if (!draggedRef.current && returning.current && card.current) {
        springOffset.copy(returnTarget.current).sub(card.current.translation());
        springVelocity.copy(card.current.linvel());
        springForce.copy(springOffset).multiplyScalar(10).addScaledVector(springVelocity, -3.2);
        card.current.applyImpulse(springForce.multiplyScalar(Math.min(delta, 1 / 30)), true);

        if (springOffset.lengthSq() < 0.0025 && springVelocity.lengthSq() < 0.01) {
          returning.current = false;
        }
      }
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[anchorX, 3.4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.14, 0.28, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.28, 0.56, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.42, 0.84, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={initialDrop ? [0.56, 0.46, 0] : [0.56, 0.25, 0]} ref={card} {...segmentProps} type="dynamic">
          <CuboidCollider args={[0.54, 0.77, 0.01]} />
          <group
            scale={1.5}
            position={[0, -0.8, -0.05]}
          >
            <mesh geometry={nodes.card.geometry} {...dragHandlers}>
              <meshBasicMaterial
                map={cardMap}
                map-anisotropy={16}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[0, 0, 0.08]} {...dragHandlers}>
              <boxGeometry args={[0.72, 1.03, 0.04]} />
              <meshBasicMaterial transparent opacity={0.001} depthWrite={false} colorWrite={false} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
