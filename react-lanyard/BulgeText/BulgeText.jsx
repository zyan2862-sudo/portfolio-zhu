import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './BulgeText.css';

const vertexShader = `
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  float circle(vec2 uvCoord, vec2 circlePosition, float radius) {
    return 1.0 - smoothstep(0.0, radius, distance(circlePosition, uvCoord));
  }
  void main() {
    vUv = uv;
    vec3 nextPosition = position;
    vElevation = circle(uv, uMouse * 0.5 + 0.5, 0.22) * 0.72;
    nextPosition.z += vElevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(nextPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vElevation;
  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    vec3 highlight = mix(tex.rgb, vec3(0.82, 0.92, 1.0), vElevation * 0.72);
    gl_FragColor = vec4(highlight, tex.a);
  }
`;

export default function BulgeText({ lines, className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const wrap = mountRef.current;
    if (!wrap) return undefined;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    camera.position.z = 5;
    const mouse = new THREE.Vector2(0, 0);
    const mouseLerped = new THREE.Vector2(0, 0);
    const uniforms = { uTexture: { value: null }, uMouse: { value: mouseLerped } };
    let mesh = null;
    let texture = null;
    let frame = 0;
    let visible = true;

    const viewportSize = () => {
      const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      return { width: height * camera.aspect, height };
    };

    const makeTexture = (pixelW, pixelH) => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelW;
      canvas.height = pixelH;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, pixelW, pixelH);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      let fontSize = Math.min(pixelW * 0.105, pixelH * 0.25);
      const setFont = () => { ctx.font = `italic 800 ${fontSize}px Arial, sans-serif`; };
      setFont();
      const widest = Math.max(...lines.map(line => ctx.measureText(line).width));
      if (widest > pixelW * 0.94) {
        fontSize *= (pixelW * 0.94) / widest;
        setFont();
      }
      const lineHeight = fontSize * 0.91;
      const startY = pixelH * 0.5 - ((lines.length - 1) * lineHeight) / 2;
      ctx.lineWidth = Math.max(2, fontSize * 0.012);
      ctx.strokeStyle = '#58a9d8';
      ctx.fillStyle = 'rgba(4, 8, 15, 0.62)';
      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        ctx.fillText(line, pixelW / 2, y);
        ctx.strokeText(line, pixelW / 2, y);
      });
      const nextTexture = new THREE.CanvasTexture(canvas);
      nextTexture.colorSpace = THREE.SRGBColorSpace;
      nextTexture.needsUpdate = true;
      return nextTexture;
    };

    const build = () => {
      const width = Math.max(1, wrap.clientWidth);
      const height = Math.max(1, wrap.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (mesh) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
      texture?.dispose();
      const pixelW = Math.min(2048, Math.max(1024, Math.round(width * 2)));
      const pixelH = Math.min(1536, Math.max(640, Math.round(height * 2)));
      texture = makeTexture(pixelW, pixelH);
      uniforms.uTexture.value = texture;
      const size = viewportSize();
      mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size.width, size.height, 180, 120),
        new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false })
      );
      scene.add(mesh);
    };

    const move = event => {
      const rect = wrap.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      mouse.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -(((event.clientY - rect.top) / rect.height) * 2 - 1));
    };
    const render = () => {
      if (!visible) return;
      mouseLerped.lerp(mouse, 0.1);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const resizeObserver = new ResizeObserver(build);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) render();
    }, { threshold: 0.01 });
    resizeObserver.observe(wrap);
    intersectionObserver.observe(wrap);
    window.addEventListener('pointermove', move);
    build();
    render();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', move);
      mesh?.geometry.dispose();
      mesh?.material.dispose();
      texture?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [lines]);

  return <div ref={mountRef} className={`bulge-text ${className}`} />;
}
