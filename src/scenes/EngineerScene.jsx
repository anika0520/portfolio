import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Camera tracks mouse with spring lag ── */
function CameraRig() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));
  useFrame(() => {
    target.current.x = mouse.x * 1.8;
    target.current.y = mouse.y * 1.1;
    target.current.z = 6;
    camera.position.lerp(target.current, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Double helix DNA ── */
function DNAHelix() {
  const groupRef = useRef();
  const TURNS = 4,
    PPT = 18,
    TOTAL = TURNS * PPT;
  const H = 4,
    R = 0.7;

  const strand1 = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => {
        const t = i / TOTAL,
          a = t * Math.PI * 2 * TURNS;
        return new THREE.Vector3(
          Math.cos(a) * R,
          t * H - H / 2,
          Math.sin(a) * R,
        );
      }),
    [],
  );
  const strand2 = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => {
        const t = i / TOTAL,
          a = t * Math.PI * 2 * TURNS + Math.PI;
        return new THREE.Vector3(
          Math.cos(a) * R,
          t * H - H / 2,
          Math.sin(a) * R,
        );
      }),
    [],
  );

  const geo1 = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(strand1),
        200,
        0.016,
        8,
        false,
      ),
    [strand1],
  );
  const geo2 = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(strand2),
        200,
        0.016,
        8,
        false,
      ),
    [strand2],
  );

  const RUNGS = TURNS * 6;
  const rungs = useMemo(
    () =>
      Array.from({ length: RUNGS }, (_, i) => {
        const t = i / RUNGS,
          a = t * Math.PI * 2 * TURNS;
        return {
          from: new THREE.Vector3(
            Math.cos(a) * R,
            t * H - H / 2,
            Math.sin(a) * R,
          ),
          to: new THREE.Vector3(
            Math.cos(a + Math.PI) * R,
            t * H - H / 2,
            Math.sin(a + Math.PI) * R,
          ),
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (groupRef.current)
      groupRef.current.rotation.y = clock.elapsedTime * 0.22;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geo1}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.9}
          roughness={0}
          metalness={0.4}
        />
      </mesh>
      <mesh geometry={geo2}>
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.9}
          roughness={0}
          metalness={0.4}
        />
      </mesh>
      {rungs.map((rung, i) => {
        const mid = rung.from.clone().lerp(rung.to, 0.5);
        const len = rung.from.distanceTo(rung.to);
        const dir = rung.to.clone().sub(rung.from).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir,
        );
        return (
          <mesh key={i} position={[mid.x, mid.y, mid.z]} quaternion={quat}>
            <cylinderGeometry args={[0.01, 0.01, len, 5]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00ffaa" : "#ff6bff"}
              emissive={i % 2 === 0 ? "#00ffaa" : "#ff6bff"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
      {strand1
        .filter((_, i) => i % 4 === 0)
        .map((pt, i) => (
          <mesh key={`a${i}`} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.04, 7, 7]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      {strand2
        .filter((_, i) => i % 4 === 0)
        .map((pt, i) => (
          <mesh key={`b${i}`} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.04, 7, 7]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
    </group>
  );
}

/* ── Orbital circuit ring with square nodes ── */
function CircuitRing({ radius, speed, tilt, color, nodeCount = 8 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed;
  });
  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => ({
        angle: (i / nodeCount) * Math.PI * 2,
        size: 0.025 + Math.random() * 0.045,
      })),
    [nodeCount],
  );

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.007, 8, 128]} />
          <meshBasicMaterial color={color} transparent opacity={0.28} />
        </mesh>
        {nodes.map((n, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(n.angle) * radius,
              Math.sin(n.angle) * radius,
              0,
            ]}
          >
            <boxGeometry args={[n.size, n.size, n.size]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ── Central glowing core ── */
function CoreSphere() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.12;
  });
  return (
    <Float speed={1.2} floatIntensity={0.3}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.32, 64, 64]} />
        <MeshDistortMaterial
          color="#05101f"
          emissive="#00d4ff"
          emissiveIntensity={0.4}
          distort={0.22}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

/* ── Particle cloud ── */
function Particles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(320 * 3);
    for (let i = 0; i < 320; i++) {
      const r = 2.2 + Math.random() * 2,
        t = Math.random() * Math.PI * 2,
        p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.035;
    ref.current.rotation.x = clock.elapsedTime * 0.018;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#00d4ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Floating mini circuits (small box clusters) ── */
function FloatingNodes() {
  const POSITIONS = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        pos: [
          Math.sin(i * 1.7) * 2.8,
          ((i % 5) - 2.5) * 0.8,
          Math.cos(i * 1.3) * 1.5,
        ],
        size: 0.02 + Math.random() * 0.04,
        color:
          [0, 1, 2][i % 3] === 0
            ? "#00d4ff"
            : [0, 1, 2][i % 3] === 1
              ? "#a855f7"
              : "#00ff88",
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      })),
    [],
  );

  return (
    <>
      {POSITIONS.map((n, i) => (
        <FloatNode key={i} {...n} />
      ))}
    </>
  );
}

function FloatNode({ pos, size, color, speed, phase }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.position.y = pos[1] + Math.sin(t * speed + phase) * 0.15;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.3;
  });
  return (
    <mesh ref={ref} position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

export default function EngineerScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 4]} color="#00d4ff" intensity={3} />
      <pointLight position={[-5, -5, 4]} color="#a855f7" intensity={2} />
      <pointLight position={[0, 0, -5]} color="#00ff88" intensity={1} />

      <CameraRig />
      <CoreSphere />
      <DNAHelix />
      <Particles />
      <FloatingNodes />

      <CircuitRing
        radius={2.2}
        speed={0.24}
        tilt={0.4}
        color="#00d4ff"
        nodeCount={10}
      />
      <CircuitRing
        radius={2.7}
        speed={-0.17}
        tilt={1.1}
        color="#a855f7"
        nodeCount={8}
      />
      <CircuitRing
        radius={1.8}
        speed={0.4}
        tilt={-0.7}
        color="#00ff88"
        nodeCount={6}
      />

      <Stars radius={40} depth={20} count={700} factor={1.4} fade speed={0.4} />
    </Canvas>
  );
}
