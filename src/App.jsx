import React, { useState, useRef, useEffect } from 'react';
import EffetVideo from './composants/EffetVideo';
import ParticulesPoussiere from './composants/ParticulesPoussiere';
import CarteProduit from './composants/CarteProduit';
import ModalProduit from './composants/ModalProduit';
import gsap from 'gsap';
import logoYoutube from './assets/Youtube_logo.png';

const App = () => {
  const [estEtendu, setEstEtendu] = useState(false);
  const refConteneur = useRef(null);
  const refModal = useRef(null);
  const refEnveloppe = useRef(null);
  const refEffetVideo = useRef(null);
  const [particules, setParticules] = useState([]);
  const [positionParticule, setPositionParticule] = useState({ haut: 0, gauche: 0 });
  const [enRotation, setEnRotation] = useState(false);
  const [animationJouee, setAnimationJouee] = useState(false);

  const creerParticules = (rect) => {
    const nouvellesParticules = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delai: i * 0.02,
    }));
    setParticules(nouvellesParticules);
    setPositionParticule({
      haut: rect.bottom,
      gauche: rect.left + (rect.width / 2)
    });
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set(refConteneur.current, {
      y: -1000,
      rotation: 0,
      scaleY: 1,
      scaleX: 1
    });

    tl.to(refConteneur.current, {
      duration: 0.8,
      y: 0,
      ease: "power4.in",
      onComplete: () => {
        const rect = refConteneur.current.getBoundingClientRect();
        
        gsap.to(refConteneur.current, {
          duration: 0.01,
          scaleY: 0.7,
          scaleX: 1.3,
          ease: "power1.out",
          onComplete: () => {
            refEffetVideo.current?.demarrerVideo();
            creerParticules(rect);
            
            gsap.to(refConteneur.current, {
              duration: 0.4,
              scaleY: 1,
              scaleX: 1,
              ease: "elastic.out(1, 0.3)"
            });
          }
        });

        gsap.to(refEnveloppe.current, {
          duration: 0.3,
          keyframes: [
            { rotate: -1, y: 2 },
            { rotate: 1.5, y: -3 },
            { rotate: -1.2, y: 2 },
            { rotate: 0.8, y: -1 },
            { rotate: 0, y: 0 },
          ],
          ease: "power1.inOut"
        });
      }
    });
  }, []);

  useEffect(() => {
    if (estEtendu) {
      gsap.to(refConteneur.current, {
        duration: 0.8,
        scale: 1.2,
        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
        ease: 'power3.out',
      });
      gsap.fromTo(
        refModal.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(refConteneur.current, {
        duration: 0.8,
        scale: 1,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        ease: 'power3.inOut',
      });
    }
  }, [estEtendu]);

  const gererAjoutPanier = () => {
    setEnRotation(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationJouee(true);
        setEnRotation(false);
      }
    });
  
    tl.to(".container-content", {
      duration: 0.2,
      opacity: 0,
      scale: 0.8,
      ease: "power2.in",
    })
    .to(refConteneur.current, {
      duration: 0.4,
      width: "80px",
      height: "80px",
      padding: 0,
      borderRadius: "50%",
      backgroundColor: "#477AEB",
      ease: "power2.inOut",
    })
    .to(refConteneur.current, {
      duration: 0.3,
      y: -100,
      ease: "power2.out",
    })
    .to(refConteneur.current, {
      duration: 0.4,
      y: 0,
      ease: "bounce.out",
    })
    .to(refConteneur.current, {
      duration: 0.8,
      x: -window.innerWidth - 100,
      rotate: -720,
      ease: "power1.in",
      onStart: () => {
        gsap.to(refConteneur.current, {
          duration: 0.4,
          y: [-20, 0],
          ease: "power1.inOut",
          repeat: 2,
        });
      }
    })
    .to(refConteneur.current, {
      duration: 0.2,
      opacity: 0,
      scale: 0.5,
      ease: "power2.in",
    }, "-=0.2");
  };

  const reinitialiserAnimation = () => {
    const tl = gsap.timeline();
    
    gsap.set(refConteneur.current, {
      opacity: 0,
      x: 0,
      y: -1000,
      rotate: 0,
      scale: 1,
      width: "610px",
      height: "auto",
      backgroundColor: "white",
      borderRadius: "1rem",
      padding: "30px"
    });
  
    gsap.set(".container-content", {
      opacity: 1,
      scale: 1
    });
  
    tl.to(refConteneur.current, {
      opacity: 1,
      duration: 0.1
    })
    .to(refConteneur.current, {
      duration: 0.8,
      y: 0,
      ease: "power4.in",
      onComplete: () => {
        const rect = refConteneur.current.getBoundingClientRect();
        
        gsap.to(refConteneur.current, {
          duration: 0.15,
          scaleY: 0.7,
          scaleX: 1.3,
          ease: "power1.out",
          onComplete: () => {
            refEffetVideo.current?.demarrerVideo();
            creerParticules(rect);
            
            gsap.to(refConteneur.current, {
              duration: 0.4,
              scaleY: 1,
              scaleX: 1,
              ease: "elastic.out(1, 0.3)"
            });
          }
        });
  
        gsap.to(refEnveloppe.current, {
          duration: 0.3,
          keyframes: [
            { rotate: -1, y: 2 },
            { rotate: 1.5, y: -3 },
            { rotate: -1.2, y: 2 },
            { rotate: 0.8, y: -1 },
            { rotate: 0, y: 0 },
          ],
          ease: "power1.inOut"
        });
      }
    });
  
    setAnimationJouee(false);
  };

  return (
    <div ref={refEnveloppe} className="relative flex justify-center items-center bg-[#DBE5FB] min-h-screen overflow-hidden">
      {animationJouee && (
        <div className='flex flex-col'>
          <button
            onClick={reinitialiserAnimation}
            className="bg-[#477AEB] hover:bg-blue-600 mb-10 px-6 py-3 rounded-lg text-sm text-white transition-all hover:scale-105"
          >
            Rejouer l'animation
          </button>
          
          <div className='flex justify-center items-center text-2xl'>
            <img src={logoYoutube} width={45} className='mr-5' alt="Logo YouTube" />
            @Habi-DEV75 sur YOUTUBE
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particules.map(particule => (
          <ParticulesPoussiere 
            key={particule.id} 
            delai={particule.delai}
            haut={positionParticule.haut}
            gauche={positionParticule.gauche}
          />
        ))}
      </div>
      
      <EffetVideo ref={refEffetVideo} />

      <div
        ref={refConteneur}
        className="relative z-10 bg-white shadow-lg p-[30px] rounded-2xl w-[610px] max-sm:w-auto origin-center"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <CarteProduit 
          onOuvertureModal={() => setEstEtendu(true)}
          onAjoutPanier={gererAjoutPanier}
          enCoursDAnimation={enRotation}
        />
      </div>

      {estEtendu && (
        <ModalProduit 
          ref={refModal}
          onFermeture={() => setEstEtendu(false)} 
        />
      )}
    </div>
  );
};

export default App;