"use client"

import Slider from "react-slick";
import { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import { useIsMobile } from "../hooks/use-media-query";
import { assetPath } from "@/lib/assetPath";
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

const galleryCaptions = [
  "Funkcionalni trening snage pod stručnim nadzorom terapeuta",
  "Kinetec uređaj za pasivno razgibavanje zgloba koljena",
  "Kinetec uređaj za pasivno razgibavanje zglobova",
  "Kinetec uređaj za pasivno razgibavanje zglobova",
  "Kinetec uređaj za pasivno razgibavanje zglobova",
  "Kombinirani polivalentni uređaj Enraf Nonius omogućuje istodobnu primjenu ultrazvuka i elektroterapije za ciljano i učinkovito liječenje",
  "Kombinirani polivalentni uređaj Enraf Nonius omogućuje istodobnu primjenu ultrazvuka i elektroterapije za ciljano i učinkovito liječenje",
  "LPG M6 uređaj s integriranom laserskom terapijom za tretman mekih tkiva",
  "Manualna terapija usmjerena na poboljšanje pokretljivosti i smanjenje napetosti",
  "Manualna terapija usmjerena na poboljšanje pokretljivosti i smanjenje napetosti",
  "Manualna terapija kralježnice u sklopu individualno prilagođenog rehabilitacijskog tretmana",
  "Pasivna TECAR izolirana aktivna elektroda i suprotna neaktivna elektroda s kontaktnim gelom služi za zatvaranje strujnog kruga tijekom terapije",
  "Pasivna TECAR izolirana aktivna elektroda i suprotna neaktivna elektroda s kontaktnim gelom služi za zatvaranje strujnog kruga tijekom terapije",
  "Rezistivni TECAR aplikator (RET) u primjeni za djelovanje na dublje tkivne strukture",
  "TECAR terapija - kapacitativni TECAR aplikator djeluje na površna meka tkiva pomoću radiofrekventne struje",
  "TECAR uređaj proizvođača Globus omogućuje provođenje TECAR terapije uz potpunu kontrolu terapijskih parametara",
  "Manualna terapija kralježnice u sklopu individualno prilagođenog rehabilitacijskog tretmana",
  "Procjena stanja i razgovor s pacijentom kao dio individualnog terapijskog pristupa",
  "Prostor za rehabilitacijske vježbe s ljestvama i elastičnim trakama za trening snage i mobilnosti",
  "Prostor za rehabilitaciju i kondicijski trening opremljen je spravama za snagu, stabilnost i funkcionalne vježbe",
  "Prostor za terapijske vježbe i funkcionalni trening opremljen je girjama različitih težina za funkcionalni trening i rehabilitaciju",
  "Prostor s utezima",
  "Rehabilitacijske vježbe usmjerene na povrat snage i kontrole pokreta",
  "Suradnja pacijenta i terapeuta ključ je uspješne rehabilitacije",
  "Suvremena terapijska oprema omogućuje cjelovit i individualno prilagođen rehabilitacijski pristup",
  "Terapijske vježbe s elastičnom trakom vode se pod stručnim nadzorom terapeuta",
];

const galleryImages: GalleryImage[] = galleryCaptions.map((caption, i) => ({
  src: assetPath(`/gallery/gallery-${i + 1}.jpg`),
  caption,
}));

export { galleryImages };
