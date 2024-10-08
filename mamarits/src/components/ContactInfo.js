import React from 'react';

function ContactInfo() {
  const locationUrl = "https://maps.app.goo.gl/VBz8BHRASyZ75BAw9";
  const facebookUrl = "https://facebook.com/mamaritsfoodhub?mibextid=ZbWKwL";
  const instagramUrl = "https://www.instagram.com/mamaritsfoodhub/?igsh=MTJpeGNub2c5aGltaQ%3D%3D&fbclid=IwY2xjawFyPyNleHRuA2FlbQIxMAABHbKq4FFAKXZMHY-hA7N0AHia8MME0E0H_1TuxoQ4vKYG96L63X7cS_C10g_aem_iU9oX6XFv7wWOasx5eRcog";

  return (
    <div className="contact-info">
      <ul>
        <li>
          <a href={locationUrl} target="_blank" rel="noopener noreferrer">
            3001 Kaalinsabay, Pasig, Metro Manila
          </a>
        </li>
        <li>
          <a href="mailto:MamaRits@gmail.com">MamaRits@gmail.com</a>
        </li>
        <li>
          <span>+1234567890</span>
        </li>
      </ul>
      <div className="social-icons">
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <img src="assets/fblogo.png" alt="Facebook" />
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <img src="assets/iglogo.png" alt="Instagram" />
        </a>
      </div>
    </div>
  );
}

export default ContactInfo;