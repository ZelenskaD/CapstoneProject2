import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "../Styles/Forms.css";
// import "../Styles/ModalFormLogin.css"; // Custom modal styles


function LoginForm({ login , isOpen, onClose}) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(f => ({
            ...f,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await login(formData);  // Call login function
            if (result.success) {
                navigate("/");  // Redirect to homepage on successful login
                onClose(); //close modal on success
            } else {
                setFormErrors(result.errors);

            }
        } catch (err) {
            console.error("Error during login:", err);
        }
    };

    if (!isOpen) return null; //do not render anything if modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times; {/* Close button */}
                </button>
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div>
                        <label>Username:</label>
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {formErrors.length > 0 && (
                        <div>
                            <h4>Errors:</h4>
                            <ul>
                                {formErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;