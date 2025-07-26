// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Home as HomeIcon } from 'lucide-react';
import '../styles/Home.css';
import { gsap } from 'gsap';
import Loader from '../components/Spinner';
import Card from '../components/Card';
import CardAlert from '../components/CardAlert'; // Importa il nuovo componente

const Home = () => {
  // --- Dichiarazioni di stato ---
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [showAllIcons, setShowAllIcons] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState('');
  const [activeCard, setActiveCard] = useState('');
  const [selectedActivities, setSelectedActivities] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [alert, setAlert] = useState(null); // Stato per gestire l'alert
  const [loading, setLoading] = useState(false);

  // --- Riferimenti per elementi DOM ---
  const iconsRef = useRef([]);
  const arrowRef = useRef(null);
  const firstRenderRef = useRef(true);
  const cardsRef = useRef(null);

  // --- Dati delle icone social ---
  const socialIcons = [
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'home', label: <span><HomeIcon size={20} /></span> },
    { id: 'hiking', label: '🚶' },
    { id: 'beach', label: '🏖️' },
    { id: 'x', label: '➜' },
    { id: 'bus', label: '🚌' },
    { id: 'food', label: '🍽️' },
    { id: 'bike', label: '🚲' },
  ];

  // --- Dati delle card per categoria ---
  const categoryCards = {
    home: [
      { header: 'Villa Serenità', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=' },
      { header: 'Casa del Sole', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
      { header: 'Residenza Verde', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=' },
      { header: 'Chalet Montagna', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
    ],
    hiking: [
      { header: 'Sentiero Alpino', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=' },
      { header: 'Passeggiata Bosco', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
      { header: 'Escursione Monte', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1487739389426-6ae6e4f9d5b6?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=' },
      { header: 'Cammino Natura', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
    ],
    beach: [
      { header: 'Spiaggia Dorata', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=' },
      { header: 'Baia Tranquilla', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1506953823996-7a43a7d70df5?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
      { header: 'Costa Sole', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=' },
      { header: 'Mare Cristallo', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd4d0e?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
    ],
    bus: [
      { header: 'Autobus Urbano', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=' },
      { header: 'Pullman Turistico', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1500974517664-9fb4d8c0b7e8?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
      { header: 'Minibus', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1560448790-726e2e3a8d79?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=' },
      { header: 'Shuttle', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1563953200350-48f3a7e9b6d1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
    ],
    food: [
      { header: 'Ristorante Italiano', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=' },
      { header: 'Trattoria Locale', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
      { header: 'Pizzeria', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=' },
      { header: 'Bistrot', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
    ],
    bike: [
      { header: 'Bici da Corsa', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=' },
      { header: 'Mountain Bike', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1597193851082-6f87fc52f9c8?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
      { header: 'Bici Elettrica', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1600585154495-05c2b2e8e6d7?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=' },
      { header: 'Bici da Città', content: 'Lorem ipsum...', image: 'https://images.unsplash.com/photo-1600585154562-7f3c4b56f4e0?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=' },
    ],
  };

  // --- useEffect per animare le icone al cambio di showAllIcons ---
  useEffect(() => {
    const filteredIcons = iconsRef.current.filter(
      (ref, idx) => socialIcons[idx]?.id > 'x' && socialIcons[idx]?.id !== 'x'
    );

    if (showAllIcons) {
      gsap.fromTo(
        filteredIcons,
        { opacity: 0, y: -10, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          overwrite: true,
        }
      );
      gsap.to(arrowRef.current, { rotation: 180, duration: 0.3, ease: 'power1.out' });
    } else {
      gsap.to(filteredIcons, {
        opacity: 0,
        y: -10,
        scale: 0.5,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power1.in',
        overwrite: true,
      });
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3, ease: 'power1.out' });
    }
  }, [showAllIcons, socialIcons]);

  // --- useEffect per aggiungere/rimuovere classe di animazione ai bottoni al cambio di activeCard ---
  useEffect(() => {
    const buttons = document.querySelectorAll('.custom-btn.btn-12');

    if (activeCard) {
      buttons.forEach((btn) => btn.classList.add('animate-now'));
    } else {
      buttons.forEach((btn) => btn.classList.remove('animate-now'));
    }
  }, [activeCard]);

  // --- Gestore per selezionare la categoria attività ---
  const handleActivitySelect = (categoryId) => {
    setActiveCard('');
    setSelectedCategory((prev) => (prev === categoryId ? '' : categoryId));
  };

  // --- Gestore per aggiungere attività ---
  const handleAdd = () => {
    if (!activeCard || !selectedCategory) {
      setAlert({
        type: 'error',
        title: 'Errore',
        message: 'Per aggiungere un\'attività devi prima selezionare una categoria e una card.',
      });
      setActiveCard('');
      return;
    }

    let added = false;

    setSelectedActivities((prev) => {
      const existing = prev[selectedCategory] || [];
      const alreadyAdded = existing.some((c) => c.header === activeCard.header);

      if (selectedCategory === 'home' && existing.length >= 1) {
        setAlert({
          type: 'error',
          title: 'Errore',
          message: 'Puoi aggiungere solo una attività per la categoria "home".',
        });
        setActiveCard('');
        return prev;
      }

      if (alreadyAdded) {
        setAlert({
          type: 'error',
          title: 'Errore',
          message: 'L\'attività è già presente.',
        });
        setActiveCard('');
        return prev;
      }

      added = true;
      return {
        ...prev,
        [selectedCategory]: [...existing, activeCard],
      };
    });

    setAllActivities((prev) => {
      if (selectedCategory === 'home' && prev.some((c) => c.category === 'home')) {
        return prev;
      }

      const alreadyInAll = prev.some(
        (c) => c.header === activeCard.header && c.category === selectedCategory
      );
      if (alreadyInAll) return prev;

      if (!added) return prev;

      return [...prev, { ...activeCard, category: selectedCategory }];
    });

    if (added) {
      setAlert({
        type: 'success',
        title: 'Attività aggiunta',
        message: 'Hai aggiunto una nuova attività alla lista.',
      });
    }
    setActiveCard('');
  };

  // --- Gestore per rimuovere l'attività selezionata ---
  const handleRemove = () => {
    if (!activeCard || !selectedCategory) {
      setAlert({
        type: 'error',
        title: 'Errore',
        message: 'Seleziona prima un\'attività da rimuovere.',
      });
      return;
    }

    const existsInAll = allActivities.some(
      (item) => item.header === activeCard.header && item.category === selectedCategory
    );

    if (!existsInAll) {
      setAlert({
        type: 'error',
        title: 'Errore',
        message: 'L\'attività selezionata non è presente nella lista.',
      });
      return;
    }

    setSelectedActivities((prev) => {
      const existing = prev[selectedCategory] || [];
      const filtered = existing.filter((c) => c.header !== activeCard.header);

      return {
        ...prev,
        [selectedCategory]: filtered,
      };
    });

    setAllActivities((prev) => prev.filter((c) => !(c.header === activeCard.header && c.category === selectedCategory)));

    setActiveCard('');
    setAlert({
      type: 'success',
      title: 'Attività rimossa',
      message: 'L\'attività è stata rimossa con successo.',
    });
  };

  // --- Gestore per svuotare tutte le attività selezionate ---
  const handleClearAll = () => {
    setAlert(null);
    setLoading(true);
    setTimeout(() => {
      setSelectedActivities({});
      setAllActivities([]);
      setActiveCard('');
      setLoading(false);
      setAlert({
        type: 'success',
        title: 'Lista svuotata',
        message: 'Hai svuotato la lista delle attività.',
      });
    }, 2000);
  };

  // --- Gestore per procedere al passo successivo ---
  const handleNext = () => {
    console.log('Prosegui...');
    setActiveCard('');
  };

  // --- Gestore per selezionare una card di viaggio ---
  const handleTravel = (card) => {
    setSelectedTravel(card.header);
    setActiveCard(card);
    console.log('Hai selezionato', card);
  };

  // --- Prepara l'ordinamento delle icone in base a showAllIcons ---
  const orderedIcons = showAllIcons
    ? [...socialIcons.filter((icon) => icon.id !== 'x'), socialIcons.find((icon) => icon.id === 'x')]
    : socialIcons;

  // --- Renderizza le card per la categoria selezionata ---
  const renderedCards =
    selectedCategory &&
    categoryCards[selectedCategory].map((card, index) => (
        <div
        key={index}
        onClick={() => handleTravel(card)}
        style={{ cursor: 'pointer' }}
        className={`
          ${activeCard && activeCard.header === card.header ? 'card-active' : ''}
          ${selectedActivities[selectedCategory]?.some((c) => c.header === card.header) ? 'card-already-selected' : ''}
        `}
      >
        <Card header={card.header} content={card.content} image={card.image} />
      </div>
    ));

  // --- useEffect per animare le card al cambio di selectedCategory, saltando il primo render ---
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    let ctx = gsap.context(() => {
      const cardElements = cardsRef.current?.children;
      if (cardElements && cardElements.length > 0) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'opacity,transform',
          }
        );
      }
    }, cardsRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  // --- useEffect per loggare tutte le attività selezionate ---
  useEffect(() => {
    console.log('🟢 Stato aggiornato - Tutte le attività selezionate:', allActivities);
    // Attiva rotazione su "Prosegui" se ci sono attività salvate
    const nextButton = document.querySelector('.custom-btn.btn-12:last-of-type');
    if (nextButton) {
      if (allActivities.length > 0) {
        nextButton.classList.add('btn-animated');
      } else {
        nextButton.classList.remove('btn-animated');
      }
    }
  }, [allActivities]);

  // --- JSX di ritorno con sezioni e commenti chiari ---
  return (
    <div className="home-container">
      {/* Header con titolo e icone social */}
      <header>
        <h1>The great escape</h1>
        <h2>
          <span>Pura vita</span>
          <br />
          Prenota la tua vacanza al resto <br /> pensiamo noi
        </h2>

        {/* Navigazione icone social */}
        <div className="social-icons">
          {orderedIcons.map((icon, idx) => {
            const isVisible = showAllIcons || ['home', 'hiking', 'beach', 'x'].includes(icon.id);

            if (icon.id === 'x') {
              return (
                <span
                  key={icon.id}
                  className="social-icon next-arrow"
                  onClick={() => setShowAllIcons((prev) => !prev)}
                  ref={arrowRef}
                >
                  {icon.label}
                </span>
              );
            }

            return (
              <span
                key={icon.id}
                className={`social-icon ${!isVisible ? 'hidden' : ''} ${
                  selectedCategory === icon.id ? 'selected' : ''
                }`}
                onClick={() => handleActivitySelect(icon.id)}
                ref={(el) => (iconsRef.current[idx] = el)}
              >
                {icon.label}
                {selectedCategory === icon.id && <span className="green-dot" />}
              </span>
            );
          })}
        </div>
      </header>

      {/* Area contenuti principale */}
      <main>
  <div className="content-wrapper">
    {/* Contenuto normale */}
    {selectedCategory && (
      <div className="card-container">
        <div className="container" ref={cardsRef}>
          {renderedCards}
        </div>
      </div>
    )}

    <div className="buttons" style={{ justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
      <button className={`custom-btn btn-12 ${activeCard ? 'btn-animated' : ''}`} onClick={handleAdd}>
        <span>✔</span>
        <span>Aggiungi</span>
      </button>

      <button
        className={`custom-btn btn-12 ${activeCard ? 'btn-animated' : ''}`}
        onClick={handleRemove}
        disabled={!activeCard}
      >
        <span>✖</span>
        <span>Rimuovi</span>
      </button>

      <button className="custom-btn btn-12" onClick={handleClearAll}>
        <span>🗑️</span>
        <span>Svuota tutto</span>
      </button>

      <button className="custom-btn btn-12" onClick={handleNext}>
        <span>➜</span>
        <span>Prosegui</span>
      </button>
    </div>

    {/* Spinner overlay */}
    {loading && (
      <div className="spinner-overlay">
        <Loader />
      </div>
    )}
  </div>
</main>

      {/* Renderizza CardAlert se presente */}
      {alert && (
        <CardAlert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default Home;