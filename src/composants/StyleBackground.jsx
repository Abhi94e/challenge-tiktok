
import React from 'react';

export function StyledBackground() {
  return (
    <group>
      {/* Ground plane with material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Lignes diagonales */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 2 - 10, 0, -5]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <planeGeometry args={[0.1, 20]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}