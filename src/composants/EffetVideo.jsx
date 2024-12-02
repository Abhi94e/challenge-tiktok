import React, { useRef, useEffect, useMemo } from 'react';
import { forwardRef } from 'react';
import gsap from 'gsap';

const EffetVideo = forwardRef((props, ref) => {
  const refVideo = useRef(null);
  const refCanvas = useRef(null);
  const refConteneur = useRef(null);
  const refAnimation = useRef(null);

  const parametresCanvas = useMemo(() => ({
    largeur: 960, 
    hauteur: 540,
    seuils: {
      vert: 80,
      vertIntense: 170,
      ratioVertRouge: 1.2,
      ratioVertBleu: 1.2,
      diffRougeBleu: 50
    }
  }), []);

  useEffect(() => {
    const video = refVideo.current;
    const canvas = refCanvas.current;
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      willReadFrequently: true 
    });

    canvas.width = parametresCanvas.largeur;
    canvas.height = parametresCanvas.hauteur;

    let dernierTemps = 0;
    const INTERVALLE_FRAMES = 1000 / 60; 

    const traiterImage = (temps) => {
      if (video.paused || video.ended) return;

      refAnimation.current = requestAnimationFrame(traiterImage);

      if (temps - dernierTemps < INTERVALLE_FRAMES) return;
      dernierTemps = temps;

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const donneesImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const donnees = donneesImage.data;
        
        const buffer = new Uint8ClampedArray(donnees.buffer);

        for (let i = 0; i < buffer.length; i += 4) {
          const rouge = buffer[i];
          const vert = buffer[i + 1];
          const bleu = buffer[i + 2];

          const { vert: seuilVert, vertIntense, ratioVertRouge, ratioVertBleu, diffRougeBleu } = parametresCanvas.seuils;

          if (vert > vertIntense && vert > rouge * 1.5 && vert > bleu * 1.5) {
            buffer[i + 3] = 0;
            continue;
          }

          if (vert > seuilVert && 
              vert > rouge * ratioVertRouge && 
              vert > bleu * ratioVertBleu && 
              Math.abs(rouge - bleu) < diffRougeBleu) {
            const intensiteVert = (vert - Math.max(rouge, bleu)) / 255;
            buffer[i + 3] = Math.floor(Math.max(0, 1 - intensiteVert * 2) * 255);
          }
        }

        ctx.putImageData(new ImageData(buffer, canvas.width, canvas.height), 0, 0);
      } catch (erreur) {
        console.error('Erreur traitement image:', erreur);
      }
    };

    const demarrerVideo = () => {
      video.currentTime = 0;
      video.play()
        .then(() => {
          refAnimation.current = requestAnimationFrame(traiterImage);
          gsap.to(refConteneur.current, {
            opacity: 1,
            duration: 0.1,
          });
        })
        .catch(e => console.error('Erreur lecture vidéo:', e));
    };

    if (ref) {
      ref.current = { demarrerVideo };
    }

    return () => {
      if (refAnimation.current) {
        cancelAnimationFrame(refAnimation.current);
      }
      video.pause();
      video.currentTime = 0;
    };
  }, [ref, parametresCanvas]);

  return (
    <div 
      ref={refConteneur} 
      className="top-1/2 left-1/2 fixed w-full -translate-x-1/2 -translate-y-1/2 aspect-video"
      style={{ zIndex: 1, pointerEvents: 'none' }}
    >
      <video
        ref={refVideo}
        src="/src/assets/impact 2.mp4"
        className="hidden"
        playsInline
        muted
      />
      <canvas
        ref={refCanvas}
        className="w-full h-full"
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  );
});

export default EffetVideo;