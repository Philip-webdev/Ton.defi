import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive height (md:h-80)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      id: 1,
      image: "/african-american-team-comparing-class-notes-doing-research-library (1).jpg",
      title: "Stable Money",
      description: "3MTT & Stablecoin"
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-vector/blue-bitcoin-word-constructed-with-numbers_1217-2567.jpg?ga=GA1.1.92224753.1734105421&semt=ais_hybrid&w=740",
      title: "Bitcoin",
      description: "Blockchain"
    },
    {
      id: 3,
      image: "/portrait-african-young-businessman-businesswoman-holding-clipboard-digital-tablet-looking-camera (1).jpg",
      title: "Crypto podcast",
      description: "Vibrant community conversations"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Shared Styles
  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    padding: '4px'
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: isMobile ? '160px' : '320px',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'none'
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPast = index < currentSlide;

          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                transition: 'all 500ms ease-in-out',
                opacity: isActive ? 1 : 0,
                transform: isActive 
                  ? 'translateX(0)' 
                  : isPast ? 'translateX(-100%)' : 'translateX(100%)',
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem',
                color: 'white'
              }} >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{slide.title}</h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{slide.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <ChevronLeft 
        style={{   position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    padding: '4px', left: '10px' }} 
        onClick={prevSlide} 
      />
      <ChevronRight 
        style={{   position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    padding: '4px', right: '10px' }} 
        onClick={nextSlide} 
      />

      {/* Slide indicators */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              cursor: 'pointer',
              border: 'none',
              padding: 0,
              height: '8px',
              borderRadius: '9999px',
              transition: 'all 300ms',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              width: index === currentSlide ? '24px' : '8px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
