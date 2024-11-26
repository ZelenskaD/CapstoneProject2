import React, { useState, useEffect, useContext } from "react";
import NyxisApi from "../api";
import "../Styles/Forms.css";
import UserContext from "../OtherComponents/UserContext";

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState(null);
    const [formErrors, setFormErrors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                setFormData({
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    email: currentUser.email,
                    deliveryAddress: currentUser.deliveryAddress,
                });
            }
        };
        fetchProfile();
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

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

    if (!formData) return <div>Loading...</div>;

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="form-title">Profile</h3>
                {Object.keys(formData).map((field) => (
                    <div key={field} className="form-group">
                        <label className="form-label">{field}</label>
                        <input
                            className="form-input"
                            name={field}
                            type="text"
                            value={formData[field]}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                ))}
                {formErrors.length > 0 && (
                    <div className="form-error-box">
                        {formErrors.map((err, idx) => (
                            <p key={idx}>{err}</p>
                        ))}
                    </div>
                )}
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


