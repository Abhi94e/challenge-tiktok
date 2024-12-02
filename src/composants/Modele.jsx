import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const Infobulle = ({ texte, visible, position }) => {
  return (
    <Html
      distanceFactor={6}
      zIndexRange={[0, 100]}
      occlude={false}
      className="pointer-events-none"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-white/20 bg-white/95 shadow-lg backdrop-blur-sm px-4 py-2 border rounded-xl min-w-[120px] font-medium text-black text-center text-sm"
          >
            {texte}
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
};

const Modele = ({ afficherInfobulles = false, ...props }) => {
  const { nodes, materials } = useGLTF('/apple_watch_ultra_2.glb');
  const [partieHoveree, setPartieHoveree] = useState(null);
  const [delaiHover, setDelaiHover] = useState(null);

  const groupesPieces = {
    VHnHbLOyhEXLvWA: {
      nom: "Écran Digital",
      description: "Affichage OLED Always-On"
    },
    "digital-crown": {
      pieces: ["pYoTjWyHwknCsXs", "qHpopFXBXmHOUYS", "odYscQETIRVJKxR"],
      nom: "Digital Crown",
      description: "Navigation et contrôle"
    },
    pPJyCszCvDGrLse: {
      nom: "Bouton Action",
      description: "Raccourci personnalisable"
    },
    BMKlRAQYzgiNCrq_1: {
      nom: "Bouton Latéral",
      description: "Menu et retour"
    },
    AnKriXdRdkHvVgp: {
      nom: "Capteur Cardiaque",
      description: "Suivi santé avancé"
    },
    "bracelet": {
      pieces: ["YufihILXVHVrDwt", "pVqLnJdxODmWtTg", "EZmdWXCjqrUDeoX"],
      nom: "Bracelet Sport",
      description: "Confort et durabilité"
    }
  };

  const gererSurvol = (e, nomPiece) => {
    e.stopPropagation();
    if (!afficherInfobulles) return;
    setPartieHoveree(nomPiece);
    document.body.style.cursor = 'pointer';
  };

  const gererFinSurvol = () => {
    if (!afficherInfobulles) return;
    
    if (delaiHover) clearTimeout(delaiHover);
    
    setDelaiHover(setTimeout(() => {
      setPartieHoveree(null);
      document.body.style.cursor = 'default';
    }, 100));
  };

  const obtenirInfoPiece = (nomPiece) => {
    for (const [nomGroupe, groupe] of Object.entries(groupesPieces)) {
      if (groupe.pieces?.includes(nomPiece)) {
        return groupe;
      }
    }
    return groupesPieces[nomPiece];
  };

  return (
    <group {...props} dispose={null}>
      <group scale={0.4}>
        {Object.entries(nodes).map(([nomNode, node]) => {
          if (!node.geometry) return null;
          
          const infoPiece = obtenirInfoPiece(nomNode);
          
          return (
            <mesh
              key={nomNode}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={materials[node.material?.name || 'default']}
              onPointerOver={(e) => gererSurvol(e, nomNode)}
              onPointerOut={gererFinSurvol}
            >
              {afficherInfobulles && infoPiece && (
                <Infobulle 
                  texte={
                    <div>
                      <div className="mb-1 font-bold">{infoPiece.nom}</div>
                      <div className="text-gray-600 text-xs">{infoPiece.description}</div>
                    </div>
                  }
                  visible={partieHoveree === nomNode || 
                          (infoPiece.pieces && partieHoveree === Object.keys(groupesPieces).find(
                            key => groupesPieces[key].pieces?.includes(nomNode)
                          ))}
                />
              )}
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default Modele;