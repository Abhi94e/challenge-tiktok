import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Modele from './Modele'; 

const Vue3DProduit = ({ 
  afficherInfobulles = false, 
  permettreZoom = false,     
  classeConteneur = "",      
  modeEtendu = false,        
  proprietesDuModele = {}   
}) => {
  const proprietesDuModeleParDefaut = {
    rotation: [0.5, 0, 0],
    position: [0, 0, 0],
    ...proprietesDuModele
  };

  const proprietesControles = modeEtendu ? {
    enablePan: false,           
    enableZoom: true,         
    maxDistance: 15,         
    minDistance: 3,           
    enableRotate: true,       
  } : {
    enablePan: false,     
    enableZoom: false,         
    minPolarAngle: Math.PI / 2,
    maxPolarAngle: Math.PI / 2, 
    enableRotate: true,         
  };

  return (
    <div className={classeConteneur}>
      <Canvas
        shadows={modeEtendu} 
        style={{ background: 'transparent' }}
        camera={{
          position: [5, 0, 11],
          fov: 24, 
        }}
      >
        <Suspense fallback={null}>
          <Modele
            afficherInfobulles={afficherInfobulles}
            {...proprietesDuModeleParDefaut}
          />
          <OrbitControls {...proprietesControles} />
          <Environment preset="studio" />
          {modeEtendu ? (
            <ambientLight intensity={0.3} /> 
          ) : (
            <>
              <spotLight
                position={[5, 8, 5]}   
                angle={0.3}             
                penumbra={1}          
                intensity={1}           
                castShadow             
              />
              <ambientLight intensity={0.3} />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Vue3DProduit;