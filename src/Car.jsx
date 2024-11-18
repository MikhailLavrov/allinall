import { PresentationControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";

export function Car() {
  const { scene } = useGLTF('/models/lambo/scene.gltf');

  useEffect(() => {
    // console.dir(scene);  // Выведет весь объект сцены
    scene.scale.set(1.5, 1.5, 1.5);
    scene.position.set(1, -0.035, 0);
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        console.dir(object); // Выведет каждый Mesh объект на сцене
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [scene]);

  return (
    <primitive object={scene} />
  );
}
