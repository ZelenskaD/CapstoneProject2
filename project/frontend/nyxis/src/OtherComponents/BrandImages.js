import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../Styles/BrandImages.css';

// Brands data with image paths and links
const brands = [
    { name: "Dior", image: require('./images/dior.jpg'), link: "/makeup/brands/dior" },
    { name: "L'Oreal", image: require('./images/loreal.jpg'), link: "/makeup/brands/l'oreal" },
    { name: "e.l.f.", image: require('./images/elf.png'), link: "/makeup/brands/e.l.f." },
    { name: "Glossier", image: require('./images/glossier.jpg'), link: "/makeup/brands/glossier" }
];

function BrandImages() {
    return (
        <div>

            {/* Brand Gallery */}
            <div className="brand-gallery">
                {brands.map((brand, index) => (
                    <div key={index} className="brand-item">
                        <Link to={brand.link}>  {/* Add Link component */}
                            <img src={brand.image} alt={brand.name} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandImages;



