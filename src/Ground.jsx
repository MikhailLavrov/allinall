import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import { LinearEncoding } from '@react-three/drei/helpers/deprecated';

export function Ground() {
  // thanks to https://polyhaven.com/a/rough_plasterbrick_05 !
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  // useFrame((state, delta) => {
  //   let t = -state.clock.getElapsedTime() * 0.128;
  //   roughness.offset.set(0, t % 1);
  //   normal.offset.set(0, t % 1);
  // });

  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0, 0]} castShadow receiveShadow>
  <planeGeometry args={[30, 30]} />
  <MeshReflectorMaterial
    normalMap={normal}
    roughnessMap={roughness}
    color={[0.015, 0.015, 0.015]}
    roughness={0.7}
    blur={[1000, 400]}
    mixBlur={30}
    mixStrength={80}
    resolution={1024}
    mirror={0.5}
    depthScale={0.01}
    minDepthThreshold={0.9}
    maxDepthThreshold={1}
    reflectorOffset={0}
  />
</mesh>

  );
}