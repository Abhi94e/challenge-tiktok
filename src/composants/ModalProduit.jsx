import React, { forwardRef } from 'react';
import { X } from 'lucide-react';
import Vue3DProduit from './Vue3DProduit';

const ModalProduit = forwardRef(({ onFermeture }, ref) => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md" 
        onClick={onFermeture} 
      />
      
      <div ref={ref} className="relative z-50 w-[90vw] max-w-6xl h-[80vh]">
        <button 
          onClick={onFermeture}
          className="top-4 right-4 z-10 absolute hover:bg-white/10 p-2 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="rounded-2xl w-full h-full overflow-hidden">
          <Vue3DProduit
            modeEtendu={true}
            afficherInfobulles={true}
            classeConteneur="w-full h-full"
            proprietesDuModele={{
              echelle: 1,
              position: [0, 0.5, 0],
              rotation: [0.5, 0, 0],
            }}
          />
        </div>

        <div className="bottom-8 left-1/2 absolute flex items-center gap-4 -translate-x-1/2">
          <span className="font-medium text-lg text-white">
            Survolez une partie de la montre
          </span>
        </div>
      </div>
    </div>
  );
});

export default ModalProduit;