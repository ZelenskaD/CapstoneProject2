import React, { useState, useEffect } from 'react';
import '../Styles/BannerCarousel.css';  // Create CSS file for styling

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const ads = [
        '/ads/benefit.jpg',
        '/ads/elf.jpg',
        '/ads/dior.jpg',
        '/ads/lo.webp',
        '/ads/colorpop.webp',
        '/ads/lore.webp',
        '/ads/elf.avif',
        '/ads/dior2.jpg',
        '/ads/glossier.webp',

    ];

    // Change the advertisement every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 5000); // 30 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [ads.length]);

    // Function to go to a specific image
    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="banner-carousel">
            <img src={ads[currentIndex]} alt="Advertisement" className="banner-image" />

            {/* Dots below the image */}
            <div className="carousel-dots">
                {ads.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;

