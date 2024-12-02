import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NyxisApi from '../api';  // Import the method from api.js
import '../Styles/TagsButtonComponent.css';  // Import your CSS

function TagsButtonComponent() {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    // Exclude these specific tags
    const excludedTags = ["CertClean", "No Talc", "USDA Organic", "No Talk", "Hypoallergenic", "EWG Verified", "EcoCert"];



    useEffect(() => {
        // Fetch tags from API when the component loads
        async function fetchTags() {
            try {
                const uniqueTags = await NyxisApi.getTagNames(); // Call the method to fetch tags
                const filteredTags = uniqueTags.filter(tag => !excludedTags.includes(tag)); // Exclude specific tags
                setTags(filteredTags); // Set the filtered tags
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        }

        fetchTags();
    }, []);

    const handleTagClick = (tag) => {
        navigate(`/makeup/tag/${tag}`);  // Correct route for tag
    };

    const formatTagText = (tag) => {
        // Special case for "Peanut Free Product"
        if (tag.toLowerCase() === "peanut free product") {
            return "Peanut Free";
        }
        return tag;
    };

    return (
        <div className="tags-carousel-container">
            <div className="tag-buttons-carousel">
                {tags.map(tag => (
                    <button
                        key={tag}
                        className="tag-btn-carousel"
                        onClick={() => handleTagClick(tag)} // On button click, redirect to the tag page
                    >
                        <img
                            src={`/images/tags/${tag.toLowerCase().replace(/\s+/g, '-')}.png`}  // Dynamically load the tag image
                            alt={tag}
                            className="tag-image"  // CSS class for styling the image
                        />
                        <span className="tag-text">{formatTagText(tag)}</span>  {/* Tag name */}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TagsButtonComponent;









