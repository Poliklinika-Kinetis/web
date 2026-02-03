"use client"

import Slider from "react-slick";
import { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import { useIsMobile } from "../hooks/use-media-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface GalleryImage {
  src: string;
  thumb?: string;
  caption: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

interface SliderRef {
  slickNext: () => void;
  slickPrev: () => void;
}

// Process filename to create a readable caption
function processCaption(filename: string): string {
  // Remove file extensions
  let caption = filename.replace(/\.jpg\.jpg$|\.jpg$/gi, '');

  // Replace underscores and hyphens with spaces
  caption = caption.replace(/[_-]/g, ' ');

  // Capitalize first letter
  caption = caption.charAt(0).toUpperCase() + caption.slice(1);

  return caption;
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  let sliderRef: SliderRef | null = null;

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  // Modal navigation functions
  const goToPrevGalleryItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
    }
  };

  const goToNextGalleryItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedIndex, images.length]);

  const goToNextSlide = () => {
    (sliderRef as unknown as SliderRef).slickNext();
  };

  const goToPrevSlide = () => {
    (sliderRef as unknown as SliderRef).slickPrev();
  };

  const registerSliderRef = (slider: Slider | null) => {
    sliderRef = slider as SliderRef | null;
  };

  const sliderSettings = {
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className={styles.sliderContainer}>
        <button
          className={`${styles.sliderNav} ${styles.sliderPrev}`}
          onClick={goToPrevSlide}
          aria-label="Previous images"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <polyline points="15 6 9 12 15 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Slider
          {...sliderSettings}
          ref={registerSliderRef}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.sliderItem}
              onClick={() => openModal(index)}
            >
              <div className={styles.imageWrapper}>
                <img src={image.src} alt={image.caption} className={styles.sliderImage} />
                <div className={styles.caption}>{image.caption}</div>
              </div>
            </div>
          ))}
        </Slider>

        <button
          className={`${styles.sliderNav} ${styles.sliderNext}`}
          onClick={goToNextSlide}
          aria-label="Next images"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <polyline points="9 6 15 12 9 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {selectedIndex !== null && (
        <div
          className={styles.galleryModalOverlay}
          onClick={closeModal}
        >
          <div className={styles.galleryModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.galleryModalClose} onClick={closeModal} aria-label="Close">
              ×
            </button>

            <button
              className={styles.galleryModalNav + " " + styles.galleryModalPrev}
              onClick={goToPrevGalleryItem}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <polyline points="15 6 9 12 15 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              className={`${styles.galleryModalNav} ${styles.galleryModalNext}`}
              onClick={goToNextGalleryItem}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <polyline points="9 6 15 12 9 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.galleryModalImageContainer}>
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].caption}
                className={styles.galleryModalImage}
              />
            </div>

            <div className={styles.galleryModalCaption}>
              {images[selectedIndex].caption}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Gallery images
const galleryImages: GalleryImage[] = [
  "Funkcionalni trening snage pod stručnim nadzorom terapeuta.jpg",
  "Kinetec uređaj za pasivno razgibavanje zgloba koljena.jpg.jpg",
  "Kinetec uređaj za pasivno razgibavanje zglobova(1).jpg",
  "Kinetec uređaj za pasivno razgibavanje zglobova(2).jpg",
  "Kinetec uređaj za pasivno razgibavanje zglobova.jpg",
  "Kombinirani polivalentni uređaj Enraf Nonius omogućuje istodobnu primjenu utrazvuka i elektroterapije (za ciljano i učinkovito liječenje) 1.jpg",
  "Kombinirani polivalentni uređaj Enraf Nonius omogućuje istodobnu primjenu utrazvuka i elektroterapije (za ciljano i učinkovito liječenje) 1.jpg.jpg",
  "LPG M6 uređaj s integriranom laserskom terapijom za tretman mekih tkiva.jpg",
  "Manualna terapija usmjerena na poboljšanje pokretljivosti i smanjenje napetosti(1).jpg",
  "Manualna terapija usmjerena na poboljšanje pokretljivosti i smanjenje napetosti.jpg",
  "Manualna terapije kralježnice u sklopu individualno prilagođenog rehabilitacijskog tretmana.jpg",
  "Pasivna TECAR elektroda s kontaktnim gelom služi za zatvaranje strujnog kruga tijekom terapije(1).jpg",
  "Pasivna TECAR elektroda s kontaktnim gelom služi za zatvaranje strujnog kruga tijekom terapije.jpg",
  "Rezistivni TECAR aplikator (RET) u primjeni za djelovanje na dublje tkivne strukture.jpg",
  "TECAR terapija - kapacitativni TECAR aplikator djeluje na površna meka tkiva pomoću radiofrekventne struje .jpg",
  "TECAR uređaj proizvođača Globus omogućuje provođenje TECAR terapije uz potpunu kontrolu terapijskih parametara.jpg",
  "manualna terapije kralježnice u sklopu individualno prilagođenog rehabilitacijskog tretmana(1).jpg",
  "procjena stanja i razgovor s pacijentom kao dio individualnog terapijskog pristupa.jpg",
  "prostor za rehabilitacijske vježbe s ljestvama i elastičnim trakama za trening snage i mobilnosti.jpg",
  "prostor za rehabilitaciju i kondicijski trening opremljen je spravama za snagu, stabilnost i funkcionalne vjezbe.jpg",
  "prostor za terapijske vježbe i funkcionalni trening opremljen je girjama različitih težina za funkcionalni trening i rehabilitaciju.jpg",
  "prostor_utezi1.jpg",
  "rehabilitacijske vježbe usmjerene na povrat snage i kontrole pokreta.jpg",
  "suradnja pacijenta i terapeuta ključ je uspješne rehabilitacije.jpg",
  "suvremena terapijska oprema omogućuje cjelovit i individualno prilagođen rehabilitacijski pristup.jpg",
  "terapijske vježbe s elastičnom trakom vode se pod stručnim nadzorom terapeuta.jpg",
].map(filename => ({
  src: `/gallery/${filename}`,
  caption: processCaption(filename),
}));

export { galleryImages };
