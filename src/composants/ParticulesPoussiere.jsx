import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ParticulesPoussiere = ({ delai, haut, gauche }) => {
  const refParticule = useRef(null);

  useEffect(() => {
    const particule = refParticule.current;
    const angle = Math.random() * Math.PI * 2;
    const distance = 500 + Math.random() * 150;
    const duree = 1.2 + Math.random() * 0.8;
    const taille = 1 + Math.random() * 2;

    gsap.set(particule, {
      width: taille,
      height: taille,
      xPercent: -50,
      yPercent: -50,
      x: gauche,
      y: haut,
      opacity: 0,
    });

    gsap.to(particule, {
      delay: delai,
      duration: duree,
      x: gauche + Math.cos(angle) * distance,
      y: haut + Math.sin(angle) * distance,
      opacity: 1,
      scale: 3,
      rotate: Math.random() * 360,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(particule, {
          duration: duree * 0.5,
          opacity: 0,
          scale: 0,
          ease: "power2.in"
        });
      }
    });

    return () => {
      gsap.killTweensOf(particule);
    };
  }, [delai, haut, gauche]);

  return (
    <div
      ref={refParticule}
      className="absolute bg-black/60 blur-[1px] rounded-full"
      style={{ willChange: 'transform', zIndex: 5 }}
    />
  );
};

export default ParticulesPoussiere;