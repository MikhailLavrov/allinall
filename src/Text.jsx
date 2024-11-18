import { Html, Text3D, useTexture } from "@react-three/drei";
import FONT from './fonts/Comfortaa_Regular.json';
import { useState } from "react";

const textureURL = "https://png.pngtree.com/thumb_back/fw800/background/20230707/pngtree-striking-3d-illustration-of-contemporary-relief-plaster-texture-for-background-image_3785945.jpg";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export const TextComponent = () => {
  const texture = useTexture(textureURL);
  const [textColor, setTextColor] = useState('#b15804');
  
  // Пример конфигурации текста
  const textConfig = {
    font: FONT,
    size: 0.6,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 20,
    letterSpacing: -0.1,
  };

  const handleClick = () => {
    const newColor = getRandomColor();
    setTextColor(newColor);
  };

  return (
    <mesh position={[-5, 0.35, 5]} rotation={[0, 1, 0]} castShadow >
      <Html
        position={[2, 1.2, 0]}  // Позиция над текстом
        // center  // Центрирует содержимое
        style={{
          userSelect: 'none',
          fontFamily: 'Comfortaa',
          fontSize: '15px',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '15px',
          backgroundColor: 'rgba(158, 156, 156, 0.7)', // Полупрозрачный фон
          borderRadius: '10px', // Скругленные углы
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)', // Тень
          position: 'absolute',  // Для позиционирования в нужном месте
          transform: 'translateX(-50%)', // Центрирование относительно позиции
        }}
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '10px', // Место для стрелочки
          }}
        >
          Жамкай
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '10px solid rgba(255, 254, 254, 0.7)', // Стрелочка для облачка
            }}
          />
        </div>
      </Html>
      <Text3D {...textConfig} onClick={handleClick}>
        trendnaprazdnik
        <meshPhysicalMaterial 
          color={textColor}
          emissive={textColor}
          roughness={0.2}
          metalness={0}
          ior={12}
          reflectivity={10}
          iridescence={10}
          iridescenceIOR={5}
          sheen={2}
          sheenColor={'#7e7e7e'}
          clearcoat={1}
          specularIntensity={10}
          map={texture}
        />
      </Text3D>
    </mesh>
  );
};
