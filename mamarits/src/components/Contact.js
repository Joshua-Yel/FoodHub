import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isSubmitting: false,
    successMessage: "",
    errorMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: check if all fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      setFormData({
        ...formData,
        errorMessage: "Please fill in all required fields.",
      });
      return;
    }

    setFormData({ ...formData, isSubmitting: true });

    try {
      // Send form data to server (replace with your server endpoint)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          ...formData,
          successMessage: "Message sent successfully!",
          isSubmitting: false,
        });
      } else {
        setFormData({
          ...formData,
          errorMessage: "Error submitting message. Please try again later.",
          isSubmitting: false,
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setFormData({
        ...formData,
        errorMessage: "Error submitting message. Please try again later.",
        isSubmitting: false,
      });
    }
  };

  return (
    <div className="contactPage">
      <h1>Contact Us</h1>
      <form
        className="contact"
        onSubmit={handleSubmit}
      >
        <div className="formGroup">
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
        <div className="formGroup">
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
        <div className="formGroup">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={formData.isSubmitting}
        >
          {formData.isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {formData.successMessage && (
          <p className="success-message">{formData.successMessage}</p>
        )}
        {formData.errorMessage && (
          <p className="error-message">{formData.errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
