import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Define types for Ball component props
interface BallProps {
  imgUrl: string;
}

// Define types for BallCanvas component props
interface BallCanvasProps {
  icon: string;
}


const Ball: React.FC<BallProps> = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal} // Applying the decal texture without flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas frameloop='always' dpr={[1, 5]} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
