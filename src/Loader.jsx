import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "red", fontFamily: 'Comfortaa' }}>{Math.round(progress)}%</div>
    </Html>
  );
};
