import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        dob: '',
        skill: 'beginner',
        terms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Checkboxes use 'checked', everything else uses 'value'
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("New User Registered:", formData);
        alert("Welcome to the community! Check your email for next steps.");
    };

    return (
        <main className="container">
            <section className="form-container">
                <form onSubmit={handleSubmit} className="styled-form">
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name:</label>
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>

                    <fieldset>
                        <legend>Skill Level</legend>
                        <label>
                            <input 
                                type="radio" name="skill" value="beginner" 
                                checked={formData.skill === 'beginner'} 
                                onChange={handleChange} 
                            /> Beginner
                        </label><br />
                        <label>
                            <input 
                                type="radio" name="skill" value="intermediate" 
                                checked={formData.skill === 'intermediate'} 
                                onChange={handleChange} 
                            /> Intermediate
                        </label>
                    </fieldset>

                    <div className="form-group checkbox-group">
                        <input 
                            type="checkbox" 
                            name="terms" 
                            id="terms" 
                            checked={formData.terms} 
                            onChange={handleChange} 
                            required 
                        />
                        <label htmlFor="terms">I agree to the terms and conditions</label>
                    </div>

                    <button type="submit" className="submit-btn">Register Now</button>
                </form>
            </section>
        </main>
    );
}