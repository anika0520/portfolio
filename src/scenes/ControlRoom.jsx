import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Torus } from "@react-three/drei";
import * as THREE from "three";

// Orbiting data node
const DataNode = ({ radius, speed, offset, color, size = 0.08 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.rotation.y += 0.02;
  });
  return (
    <Box ref={ref} args={[size, size, size]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </Box>
  );
};

// Pulsing ring
const PulsingRing = ({ radius, color, speed, offset }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.scale.setScalar(1 + Math.sin(t) * 0.05);
    ref.current.material.opacity = 0.2 + Math.sin(t) * 0.1;
  });
  return (
    <Torus ref={ref} args={[radius, 0.006, 16, 100]}>
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </Torus>
  );
};

const ControlRoom = () => {
  return (
    <div style={{ width: "100%", height: "280px" }}>
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={3} color="#00d4ff" />
        <pointLight position={[3, 0, 0]} intensity={2} color="#7b2eff" />
        <pointLight position={[-3, 0, 0]} intensity={2} color="#00ff88" />

        {/* Central sphere */}
        <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.8}
            roughness={0}
            metalness={1}
          />
        </mesh>

        {/* Orbiting rings */}
        <PulsingRing radius={0.9} color="#00d4ff" speed={0.8} offset={0} />
        <PulsingRing radius={1.4} color="#7b2eff" speed={0.6} offset={1} />
        <PulsingRing radius={1.9} color="#00ff88" speed={0.5} offset={2} />

        {/* Orbiting data nodes */}
        <DataNode radius={0.9} speed={1.2} offset={0} color="#00d4ff" />
        <DataNode radius={0.9} speed={1.2} offset={Math.PI} color="#00d4ff" />
        <DataNode radius={1.4} speed={0.8} offset={0.5} color="#7b2eff" />
        <DataNode
          radius={1.4}
          speed={0.8}
          offset={2.5}
          color="#7b2eff"
          size={0.1}
        />
        <DataNode
          radius={1.9}
          speed={0.5}
          offset={1}
          color="#00ff88"
          size={0.12}
        />
        <DataNode
          radius={1.9}
          speed={0.5}
          offset={3}
          color="#00ff88"
          size={0.12}
        />
      </Canvas>
    </div>
  );
};

export default ControlRoom;
