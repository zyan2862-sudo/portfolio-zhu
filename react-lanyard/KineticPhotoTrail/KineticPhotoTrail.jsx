// Kinetic Paper Trail · from oriform.art · keep this line if redistributing
import React from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './KineticPhotoTrail.css';

function usePhotoAtlas() {
  const texture = useLoader(THREE.TextureLoader, '/images/kinetic-photo-atlas.jpg');
  React.useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);
  return texture;
}

function CameraRig({ pointer, motion }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const position = motion.current.position;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, position.x + 6.8 + pointer.current.x * 0.45, 2.7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 7.2, 2.7, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, position.y + 10.2, 2.7, delta);
    camera.lookAt(position.x - 1.6, 0.45, position.y - 0.5);
  });
  return null;
}

const MAX_TRAIL_POINTS = 420;
const PAPER_WIDTH = 1.58;
const CURL_SEGMENTS = 18;
const MAX_RIBBON_POINTS = MAX_TRAIL_POINTS + CURL_SEGMENTS + 1;

function lerpAngle(from, to, factor) {
  let delta = to - from;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return from + delta * factor;
}

function DynamicRibbon({ atlas, motion }) {
  const geometry = React.useRef();
  const arrays = React.useMemo(() => {
    const positions = new Float32Array(MAX_RIBBON_POINTS * 2 * 3);
    const normals = new Float32Array(MAX_RIBBON_POINTS * 2 * 3);
    const uvs = new Float32Array(MAX_RIBBON_POINTS * 2 * 2);
    const indices = new Uint32Array((MAX_RIBBON_POINTS - 1) * 6);
    for (let index = 0; index < MAX_RIBBON_POINTS - 1; index += 1) {
      const vertex = index * 2;
      const offset = index * 6;
      indices.set([vertex, vertex + 1, vertex + 2, vertex + 1, vertex + 3, vertex + 2], offset);
    }
    return { positions, normals, uvs, indices };
  }, []);

  useFrame(() => {
    if (!geometry.current) return;
    const points = motion.current.points;
    const count = Math.min(points.length, MAX_TRAIL_POINTS);
    const start = points.length - count;
    for (let index = 0; index < count; index += 1) {
      const point = points[start + index];
      const before = points[Math.max(start, start + index - 1)];
      const after = points[Math.min(points.length - 1, start + index + 1)];
      let tx = after.x - before.x;
      let tz = after.z - before.z;
      const length = Math.hypot(tx, tz) || 1;
      tx /= length;
      tz /= length;
      const sideX = tz;
      const sideZ = -tx;
      const halfWidth = PAPER_WIDTH / 2;
      const fade = Math.min(1, index / 18);
      const width = halfWidth * fade;
      const left = index * 6;
      const right = left + 3;
      arrays.positions[left] = point.x + sideX * width;
      arrays.positions[left + 1] = 0.035 + index * 0.00012;
      arrays.positions[left + 2] = point.z + sideZ * width;
      arrays.positions[right] = point.x - sideX * width;
      arrays.positions[right + 1] = 0.035 + index * 0.00012;
      arrays.positions[right + 2] = point.z - sideZ * width;
      arrays.normals.set([0, 1, 0, 0, 1, 0], left);
      const uv = point.s / 11.5;
      const uvOffset = index * 4;
      arrays.uvs.set([uv, 0, uv, 1], uvOffset);
    }
    const data = motion.current;
    const halfWidth = PAPER_WIDTH / 2;
    const forwardX = Math.sin(data.yaw);
    const forwardZ = Math.cos(data.yaw);
    const sideX = forwardZ;
    const sideZ = -forwardX;
    const writePair = (pairIndex, centerX, centerY, centerZ, nx, ny, nz, uv) => {
      const left = pairIndex * 6;
      const right = left + 3;
      arrays.positions.set([centerX + sideX * halfWidth, centerY, centerZ + sideZ * halfWidth], left);
      arrays.positions.set([centerX - sideX * halfWidth, centerY, centerZ - sideZ * halfWidth], right);
      arrays.normals.set([nx, ny, nz, nx, ny, nz], left);
      arrays.uvs.set([uv, 0, uv, 1], pairIndex * 4);
    };
    const contactY = 0.055;
    writePair(count, data.position.x, contactY, data.position.y, 0, 1, 0, data.distance / 11.5);
    for (let curl = 1; curl <= CURL_SEGMENTS; curl += 1) {
      const angle = (curl / CURL_SEGMENTS) * 0.92;
      const radius = 1.534;
      writePair(
        count + curl,
        data.position.x + forwardX * Math.sin(angle) * radius,
        contactY + radius * (1 - Math.cos(angle)),
        data.position.y + forwardZ * Math.sin(angle) * radius,
        -forwardX * Math.sin(angle),
        Math.cos(angle),
        -forwardZ * Math.sin(angle),
        (data.distance + angle * 1.52) / 11.5
      );
    }
    geometry.current.setDrawRange(0, Math.max(0, count + CURL_SEGMENTS) * 6);
    geometry.current.attributes.position.needsUpdate = true;
    geometry.current.attributes.normal.needsUpdate = true;
    geometry.current.attributes.uv.needsUpdate = true;
  });

  return (
    <mesh frustumCulled={false} receiveShadow>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[arrays.positions, 3]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-normal" args={[arrays.normals, 3]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-uv" args={[arrays.uvs, 2]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="index" args={[arrays.indices, 1]} />
      </bufferGeometry>
      <meshStandardMaterial map={atlas} color={atlas ? '#ffffff' : '#1b2124'} roughness={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TrailScene({ paused, pointer }) {
  const atlas = usePhotoAtlas();
  const roll = React.useRef();
  const spinner = React.useRef();
  const reduced = React.useMemo(() => matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const motion = React.useRef({
    position: new THREE.Vector2(0.8, 0),
    velocity: new THREE.Vector2(0.8, 0.25),
    target: new THREE.Vector2(2.5, 1.5),
    points: [],
    distance: 0,
    yaw: 0,
    elapsed: 0
  });

  React.useMemo(() => {
    const state = motion.current;
    for (let index = 0; index < 150; index += 1) {
      const progress = index / 149;
      const x = -13 + progress * 13.8;
      const z = Math.sin(progress * Math.PI * 2.2) * 1.15 - 0.4;
      if (state.points.length) {
        const last = state.points[state.points.length - 1];
        state.distance += Math.hypot(x - last.x, z - last.z);
      }
      state.points.push({ x, z, s: state.distance });
    }
    return null;
  }, []);

  const rollTexture = React.useMemo(() => {
    if (!atlas) return null;
    const clone = atlas.clone();
    clone.needsUpdate = true;
    clone.repeat.set(1, 1);
    return clone;
  }, [atlas]);

  React.useEffect(() => () => rollTexture?.dispose(), [rollTexture]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const data = motion.current;
    if (!paused) {
      data.elapsed += delta;
      const pointerFresh = performance.now() - pointer.current.activeAt < 2600;
      if (pointerFresh) {
        data.target.set(data.position.x + pointer.current.x * 5.8, data.position.y + pointer.current.y * 4.2);
      } else {
        const angle = data.elapsed * 0.5;
        data.target.set(
          data.position.x + Math.cos(angle * 0.83) * 4.5,
          data.position.y + Math.sin(angle) * 4.2
        );
      }
      const spring = reduced ? 8.5 : 13;
      const damping = reduced ? 6.4 : 5.6;
      const maxSpeed = reduced ? 3.8 : 6.8;
      const acceleration = data.target.clone().sub(data.position).multiplyScalar(spring);
      acceleration.addScaledVector(data.velocity, -damping);
      data.velocity.addScaledVector(acceleration, delta);
      const speed = data.velocity.length();
      if (speed > maxSpeed) data.velocity.multiplyScalar(maxSpeed / speed);
      const step = data.velocity.clone().multiplyScalar(delta);
      data.position.add(step);
      data.distance += step.length();
      if (speed > 0.05) {
        const desiredYaw = Math.atan2(data.velocity.x, data.velocity.y);
        data.yaw = lerpAngle(data.yaw, desiredYaw, 1 - Math.exp(-6.5 * delta));
      }
      const last = data.points[data.points.length - 1];
      if (!last || Math.hypot(data.position.x - last.x, data.position.y - last.z) > 0.105) {
        data.points.push({ x: data.position.x, z: data.position.y, s: data.distance });
        if (data.points.length > MAX_TRAIL_POINTS) data.points.shift();
      }
      if (spinner.current) spinner.current.rotation.x = data.distance / 1.52;
    }
    if (roll.current) {
      roll.current.position.set(data.position.x, 1.52, data.position.y);
      roll.current.rotation.y = data.yaw;
    }
    if (rollTexture && atlas) rollTexture.offset.x = (data.distance / 11.5) % 1;
  });

  return (
    <>
      <CameraRig pointer={pointer} motion={motion} />
      <fog attach="fog" args={['#020303', 12, 35]} />
      <ambientLight intensity={1.1} color="#b9d9ff" />
      <directionalLight position={[4, 9, 5]} intensity={3.3} color="#ffffff" castShadow />
      <pointLight position={[1.5, 2.6, 3]} intensity={18} distance={12} color="#d111ff" />
      <DynamicRibbon atlas={atlas} motion={motion} />

      <group ref={roll}>
        <group ref={spinner}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[1.52, 1.52, PAPER_WIDTH, 96, 1, true]} />
            <meshStandardMaterial map={rollTexture} color={rollTexture ? '#ffffff' : '#e8e4da'} roughness={0.86} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[PAPER_WIDTH / 2 + 0.002, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <ringGeometry args={[0.64, 1.52, 96]} />
            <meshStandardMaterial color="#e9e6dc" roughness={0.95} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-PAPER_WIDTH / 2 - 0.002, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
            <ringGeometry args={[0.64, 1.52, 96]} />
            <meshStandardMaterial color="#e9e6dc" roughness={0.95} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.64, 0.64, PAPER_WIDTH * 1.01, 64, 1, true]} />
            <meshStandardMaterial color="#111518" roughness={0.92} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function KineticPhotoTrail() {
  const [paused, setPaused] = React.useState(false);
  const pointer = React.useRef({ x: 0, y: 0, activeAt: -10000 });

  const handlePointerMove = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointer.current.activeAt = performance.now();
  };

  return (
    <div
      className={`kinetic-photo-trail__scene${paused ? ' is-paused' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { pointer.current.activeAt = -10000; }}
      onClick={() => setPaused(value => !value)}
      role="button"
      tabIndex={0}
      aria-pressed={paused}
      aria-label={paused ? '继续滚动相片胶带' : '暂停滚动相片胶带'}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setPaused(value => !value);
        }
      }}
    >
      <Canvas camera={{ position: [6.7, 7.2, 10.5], fov: 34, near: 0.1, far: 80 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <TrailScene paused={paused} pointer={pointer} />
      </Canvas>
    </div>
  );
}
