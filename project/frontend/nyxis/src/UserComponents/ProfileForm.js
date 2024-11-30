import React, { useState, useEffect, useContext } from "react";
import NyxisApi from "../api";
import "../Styles/Forms.css";
import UserContext from "../OtherComponents/UserContext";

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // Mapping field names to more user-friendly labels
    const fieldLabels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        deliveryAddress: 'Delivery Address',
    };

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                console.log(currentUser); // Log to verify the structure
                setFormData({
                    firstName: currentUser.first_name || "",
                    lastName: currentUser.last_name || "",
                    email: currentUser.email || "",
                    deliveryAddress: currentUser.deliveryAddress || "",
                });
            }
        };
        fetchProfile();
    }, [currentUser]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await NyxisApi.updateProfile(currentUser.username, formData);
            setCurrentUser(updatedUser);
            setIsEditing(false);
        } catch (err) {
            setFormErrors([err.message || "Update failed."]);
        }
    };

    // Display loading message if form data is not ready
    if (!formData) return <div>Loading...</div>;

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="form-title">Profile</h3>

                {/* Loop through the formData keys to create input fields */}
                {Object.keys(formData).map((field) => (
                    <div key={field} className="form-group">
                        <label className="form-label">{fieldLabels[field] || field}</label>
                        <input
                            className="form-input"
                            name={field}
                            type="text"
                            value={formData[field] || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder={fieldLabels[field] || field} // Optional placeholder
                        />
                    </div>
                ))}

                {/* Display errors if any */}
                {formErrors.length > 0 && (
                    <div className="form-error-box">
                        {formErrors.map((err, idx) => (
                            <p key={idx}>{err}</p>
                        ))}
                    </div>
                )}

                {/* Edit or Save button */}
                {isEditing ? (
                    <button type="submit" className="form-button">
                        Save
                    </button>
                ) : (
                    <button
                        type="button"
                        className="form-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
            </form>
        </div>
    );
}

export default ProfileForm;



