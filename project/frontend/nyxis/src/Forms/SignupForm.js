import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Forms.css"; // Shared CSS file for Login and Signup

function SignupForm({ signup }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        deliveryAddress: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({
            ...f,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password length validation
        if (formData.password.length < 5) {
            setFormErrors(["Password must be at least 5 characters long"]);
            return;
        }

        try {
            let result = await signup(formData); // Call signup function
            if (result.success) {
                navigate("/");
            } else {
                setFormErrors(result.errors);
            }
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    return (
        <div className="login-container"> {/* Reusing the container class */}
            <form className="login-form" onSubmit={handleSubmit}> {/* Reusing the login-form class */}
                <h3 className="form-title">Sign Up</h3>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input
                        className="form-input"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        className="form-input"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">First Name:</label>
                    <input
                        className="form-input"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name:</label>
                    <input
                        className="form-input"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        className="form-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Delivery Address:</label>
                    <input
                        className="form-input"
                        name="deliveryAddress"
                        type="text"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                {formErrors.length > 0 && (
                    <div className="form-error-box">
                        <h4 className="form-error-title">Errors:</h4>
                        <ul className="form-error-list">
                            {formErrors.map((error) => (
                                <li key={error} className="form-error-item">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button type="submit" className="form-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
