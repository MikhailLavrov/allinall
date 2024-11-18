import { PresentationControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings() {
  const itemsRef = useRef([]);

  // Инициализация позиций в массиве
  const positions = Array.from({ length: 5 }, (_, i) => (i - 2.5) * 3);

  useFrame((state) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      const mesh = itemsRef.current[i];
      if (!mesh) continue;

      // Вычисление расстояния от нулевой точки
      let z = positions[i]; // Позиции остаются статичными
      let dist = Math.abs(z);

      // Масштабирование кольца
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      // Изменение цвета с учётом расстояния
      let colorScale = 1;
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      colorScale *= 0.5;

      if (i % 2 === 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
      } else {
        mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale);
      }
    }
  });

  return (
    <>
      {[...Array(14)].map((_, i) => (
        <PresentationControls
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 20, Math.PI / 20]} // Vertical limits
          azimuth={[-Math.PI / 0, Math.PI / 0]} // Horizontal limits
          config={{ mass: 2, tension: 500 }} // Spring config
        >
          <mesh
            castShadow
            receiveShadow
            key={i}
            position={[0, 0, positions[i]]} // Позиция задаётся один раз
            ref={(el) => (itemsRef.current[i] = el)}
          >
            <torusGeometry args={[3.35, 0.05, 16, 100, Math.PI]} />

            <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
          </mesh>
        </PresentationControls>
      ))}
    </>
  );
}
