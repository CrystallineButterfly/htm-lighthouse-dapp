import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import useSound from "use-sound";
// import lighthouse from "@lighthouse-web3/sdk";
import Music from "./mind-control.mp3";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import "./App.css";

function Box() {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 42, 42);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <icosahedronBufferGeometry attach="geometry" args={[15, 15]} />
      <meshLambertMaterial attach="material" color="white" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 4, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshLambertMaterial attach="material" color="darkblue" />
    </mesh>
  );
}

// function Music() {
//   const [play] = useSound(Song);
//   return <button onClick={play}>42</button>;
// };

// const status = await lighthouse.status(
//   "QmSyi8JbvKKTAQktREZq4rEvhsYcEMNUQnTBkmsGqk12QS"
// );
// console.log(status);


createRoot(document.getElementById("root")).render(
  <Canvas>
    <OrbitControls />
    <Stars />
    <ambientLight intensity={0.6} />
    <spotLight position={[100, 10, 100]} angle={0.3} />
    <Physics>
      {/* <Music>
        <source src="https://ipfs.io/ipfs/QmQLFF3Utu245LGLnamZSF87Tz6zxRekfWkaonMgt1gVuj" />
      </Music> */}
      <Box />
      <Plane />
    </Physics>
  </Canvas>
);

