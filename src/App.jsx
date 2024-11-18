import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import './style.css';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ground } from './Ground';
import { Car } from './Car';
import { TextComponent } from './Text';
import { Loader } from './Loader';
import { Rings } from './Rings';

function CarShow() {
  return (
    <>
      <OrbitControls 
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
      />

      <PerspectiveCamera makeDefault fov={59} position={[4.3, 2, 6]} />

      <color attach={'background'} args={[0, 0, 0]} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
            <Rings />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={40}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={80}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <directionalLight
        castShadow
        position={[0, 60, 0]}
        intensity={0.7}
        shadow-mapSize={[2048, 2048]}
      />

      <Ground />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          <CarShow />
          <TextComponent />
        </Suspense>
      </Canvas>
    </Suspense>
  );
}

export default App;
