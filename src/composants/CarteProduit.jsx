import React from 'react';
import { Heart } from 'lucide-react';
import Vue3DProduit from './Vue3DProduit'; 
import arrierePlan from '../assets/background.jpg';

const CarteProduit = ({ onOuvertureModal, onAjoutPanier, enCoursDAnimation }) => {
  return (
    <div className="flex max-sm:flex-col items-center gap-6 container-content">
      <div className="relative w-[310px] h-[275px]">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundImage: `url(${arrierePlan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onOuvertureModal}
        >
          <Vue3DProduit classeConteneur="h-full" />
        </div>
      </div>
      
      <div className="flex flex-col flex-1 h-[275px]">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-[#020712]/80 px-3.5 py-1.5 rounded-full font-light text-white text-xs">
            FitLife
          </span>
          <span className="text-[#02071280]/50 text-xs">
            XV-383923810
          </span>
        </div>
        <h1 className="mb-2 font-bold text-[#020712]/80 text-xl">
          Montre Connectée FitLife Pro 5+
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-lg text-yellow-400 -translate-y-[1px]">
            ★★★★☆
          </div>
          <span className="text-[#020712]/50 text-xs">43 notes</span>
        </div>
        <div className="mb-1 font-medium text-[#020712]/40 text-sm line-through">
          183,99 €
        </div>
        <div className="mb-6 font-bold text-[#020712] text-3xl">
          149,99 €
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <button 
            className="flex-1 items-center bg-[#477AEB] hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-[#F6F8FE] text-center text-sm transition-colors"
            onClick={onAjoutPanier}
            disabled={enCoursDAnimation}
          >
            Ajouter au panier
          </button>
          <button className="bg-[#477AEB1A] hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-[#477AEB]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarteProduit;