import React from "react";
import mamaritsLogo from "../assets/mamarits-logo.png";
import Image1 from "../assets/image1.png";
import Google_logo from "../assets/google-logo.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";

function About() {
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#000",
          padding: "20px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1>About</h1>
      </div>

      {/* Mission Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* Text Section */}
        <div style={{ flex: "1", textAlign: "left", fontFamily: "Times New Roman" }}>
          <h2><center> Mission</center></h2>
          <p>
            Mamarits is a family-owned and operated restaurant specializing in
            authentic Filippino cuisine. We pride ourselves on providing our
            customers with the finest ingredients and the most delicious dishes. Our
            mission is to create memorable experiences for our patrons, and we
            strive to deliver exceptional service and quality ingredients to our
            customers.
          </p>
        </div>

        
        <div style={{ flex: "1", textAlign: "left"}}>
          <img
            src={mamaritsLogo}
            alt="mamaritsLogo"
            style={{
              width: "300px",
              borderRadius: "8px",
              borderHeight: "30px",
              backgroundColor: "black",
            }}
          />
    </div>
  </div>
</div>
     
      
  );
}

export default About;
