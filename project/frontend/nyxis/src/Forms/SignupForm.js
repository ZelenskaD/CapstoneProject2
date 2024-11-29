import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignUpForm.css"; // Shared CSS file for Login and Signup

function SignupForm({ signup }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        deliveryAddress: "",
    });
    const [formErrors, setFormErrors] = useState([]); // Array to store any form or server errors
    const navigate = useNavigate();

    /** Updates form data field */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    // /** Handles form submission */
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     // Validate password length before submission
    //     if (formData.password.length < 5) {
    //         setFormErrors(["Password must be at least 5 characters long"]);
    //         return;
    //     }
    //
    //     try {
    //         // Call the signup function passed as a prop
    //         const result = await signup(formData);
    //         if (result.success) {
    //             navigate("/"); // Redirect to home page on successful signup
    //         } else {
    //             setFormErrors(result.errors || ["Signup failed"]);
    //         }
    //     } catch (err) {
    //         console.error("Error during signup:", err);
    //         setFormErrors(["An unexpected error occurred. Please try again."]);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 5) {
            setFormErrors(["Password must be at least 5 characters long"]);
            return;
        }

        try {
            const result = await signup(formData); // Signup call
            if (result.success) {
                navigate("/");
            } else {
                setFormErrors(result.errors);
            }
        } catch (err) {
            console.error("Error during signup:", err);
            setFormErrors(["An unexpected error occurred. Please try again."]);
        }
    };


    return (
        <div className="form-container"> {/* Reusing shared container class */}
            <form className="form" onSubmit={handleSubmit}> {/* Reusing shared form class */}
                <h3 className="form-title">Sign Up</h3>

                {/* Username */}
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

                {/* Password */}
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

                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Email */}
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

                {/* Delivery Address */}
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

                {/* Display form errors */}
                {formErrors.length > 0 && (
                    <div className="form-error-box">
                        <h4 className="form-error-title">Errors:</h4>
                        <ul className="form-error-list">
                            {formErrors.map((error, idx) => (
                                <li key={idx} className="form-error-item">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="form-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
