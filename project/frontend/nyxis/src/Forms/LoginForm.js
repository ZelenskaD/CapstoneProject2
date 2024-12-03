import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Forms.css"; // Import the CSS file

function LoginForm({ login }) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({
            ...f,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await login(formData); // Call login function
            if (result.success) {
                navigate("/"); // Redirect to homepage on successful login
            } else {
                // Display error message if username/password is incorrect
                setFormErrors(["Invalid username or password. Please try again."]);
            }
        } catch (err) {
            setFormErrors(["An unexpected error occurred. Please try again later."]);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Login</h3>
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
                {formErrors.length > 0 && (
                    <div className="form-error-box">
                        <h4 className="form-error-title">Oops!</h4>
                        <ul className="form-error-list">
                            {formErrors.map((error, index) => (
                                <li key={index} className="form-error-item">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button type="submit" className="form-button">
                    Login
                </button>
                <p>
                    Don't have an account?{" "}
                    <a href="/signup" className="signup-link">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;

