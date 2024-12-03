import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NyxisApi from '../api';
import '../Styles/TagsButtonComponent.css';

function TagsButtonComponent() {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const excludedTags = ["CertClean", "No Talc", "USDA Organic", "No Talk", "Hypoallergenic", "EWG Verified", "EcoCert"];

    useEffect(() => {
        async function fetchTags() {
            try {
                const uniqueTags = await NyxisApi.getTagNames();
                const filteredTags = uniqueTags.filter(tag => !excludedTags.includes(tag));
                setTags(filteredTags);
            } catch (error) {
                throw error;
            }
        }
        fetchTags();
    }, []);

    const handleTagClick = (tag) => {
        navigate(`/makeup/tag/${tag}`);
    };

    const formatTagText = (tag) => tag.toLowerCase() === "peanut free product" ? "Peanut Free" : tag;

    return (
        <div className="tags-carousel-container">
            <div className="tag-buttons-carousel">
                {tags.map(tag => (
                    <button
                        key={tag}
                        className="tag-btn-carousel"
                        onClick={() => handleTagClick(tag)}
                    >
                        <img
                            src={`/images/tags/${tag.toLowerCase().replace(/\s+/g, '-')}.png`}
                            alt={tag}
                            className="tag-image"
                        />
                        <span className="tag-text">{formatTagText(tag)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TagsButtonComponent;










