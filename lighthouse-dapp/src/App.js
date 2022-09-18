import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import "./App.css";

function Box() {
   const { scene } = useGLTF("./assets/lighthouse.glb");
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <primitive object={scene} />
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

createRoot(document.getElementById("root")).render(
  <Canvas>
    <OrbitControls />
    <Stars />
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 15, 10]} angle={0.3} />
    <Physics>
      <Box />
      <Suspense fallback={null}>
      </Suspense>
      <Plane />
    </Physics>
  </Canvas>
);
