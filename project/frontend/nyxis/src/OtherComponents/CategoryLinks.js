import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/CategoryLinks.css';

// Import images from the src folder
import diorFoundation from './images/diorfoundation.jpeg';
import diorMascara from './images/diormascara.jpg';
import diorLipstick from './images/diorlipstick.jpg';

const categories = [
    { name: "Foundation", link: "/makeup/product_type/foundation", imgSrc: diorFoundation },
    { name: "Mascara", link: "/makeup/product_type/mascara", imgSrc: diorMascara },
    { name: "Lipstick", link: "/makeup/product_type/lipstick", imgSrc: diorLipstick }
];

function CategoryLinks() {
    return (
        <div className="category-links">
            <h3>Must Have Products</h3>
            <div className="category-gallery">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <Link to={category.link} className="category-link">
                            <div className="circle">
                                <img src={category.imgSrc} alt={category.name} />
                            </div>
                            <p>{category.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryLinks;






