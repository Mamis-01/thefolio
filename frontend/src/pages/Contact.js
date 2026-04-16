import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // This updates only the field that changed while keeping the others the same
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert(`Thanks ${formData.name}! We'll get back to you at ${formData.email}.`);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main className="container">
            <section>
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit} className="styled-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="5" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </section>
            {/* ... rest of the tables ... */}
        </main>
    );
}