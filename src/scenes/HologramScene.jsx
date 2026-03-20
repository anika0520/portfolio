import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

// Inner AI core sphere with distortion effect
const AICoreInner = () => {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.25;
    meshRef.current.rotation.x = t * 0.1;
    // Subtle mouse tracking
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.x * 0.5,
      0.05,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.y * 0.3,
      0.05,
    );
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.15;
      glowRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <Sphere ref={glowRef} args={[1.55, 32, 32]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main distorted core */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#0a1628"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0}
          metalness={0.8}
          emissive="#001133"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Wireframe ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[1.7, 0.003, 16, 100]} />
        <meshBasicMaterial color="#7b2eff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const HologramScene = () => {
  return (
    <div className="absolute inset-0 z-0" style={{ height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Ambient and directional lights */}
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#00d4ff" />
        <pointLight position={[-3, -3, -3]} intensity={1.5} color="#7b2eff" />
        <pointLight position={[0, -4, 0]} intensity={1} color="#00ff88" />

        {/* Stars background */}
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={2}
          saturation={0.5}
          fade
        />

        {/* Core AI sphere */}
        <AICoreInner />

        {/* Subtle orbit controls (auto-rotate) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default HologramScene;
