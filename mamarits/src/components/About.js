import React from "react";
import mamaritsLogo from "../assets/mamarits-logo.png";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function About() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "40px 20px" }}>
      <div
        style={{
          backgroundColor: "#212121",
          color: "#fff",
          padding: "50px 30px",
          textAlign: "center",
          borderRadius: "10px",
          marginBottom: "50px",
        }}
      >
        <img
          src={mamaritsLogo}
          alt="Mamarits Logo"
          style={{
            maxWidth: "400px",
            marginBottom: "50px",
            padding: "10px 20px",
          }}
        />
        <h1 style={{ fontSize: "3rem", marginBottom: "15px" }}>
          About Mamarits
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            fontStyle: "italic",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          "Bringing love to the table, one homemade meal at a time."
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              color: "#e60000",
              marginBottom: "20px",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              textAlign: "center",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            Mamarits is a family-owned and operated restaurant specializing in
            authentic Filipino cuisine. We pride ourselves on using the finest
            ingredients to create delicious dishes that are deeply rooted in
            tradition. Our mission is to create memorable experiences for our
            patrons, delivering exceptional service and quality in every meal.
          </p>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              color: "#e60000",
              marginBottom: "30px",
            }}
          >
            Our Dishes
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {[Image2, Image1, Image3].map((image, index) => (
              <div
                key={index}
                style={{ textAlign: "center" }}
              >
                <img
                  src={image}
                  alt={`Dish ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <p style={{ marginTop: "15px", fontSize: "1rem" }}>
                  A delightful dish that's bursting with flavor and tradition.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              color: "#e60000",
              marginBottom: "30px",
            }}
          >
            Meet Our Chefs
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {[Image5, Image6, Image4].map((chefImage, index) => (
              <div
                key={index}
                style={{ textAlign: "center" }}
              >
                <img
                  src={chefImage}
                  alt={`Chef ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <p style={{ marginTop: "15px", fontSize: "1rem" }}>
                  Chef Maria - Expert in Filipino Traditional Dishes
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              color: "#e60000",
              marginBottom: "30px",
            }}
          >
            Customer Testimonials
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            >
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                "The best Filipino food I've ever tasted! The flavors are
                authentic and the service is outstanding. I'll definitely be
                coming back."
              </p>
              <p
                style={{
                  fontStyle: "italic",
                  marginTop: "10px",
                  textAlign: "right",
                }}
              >
                - John Doe
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            >
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                "Amazing experience, from the warm welcome to the incredible
                food. Highly recommend Mamarits to anyone craving authentic
                Filipino cuisine!"
              </p>
              <p
                style={{
                  fontStyle: "italic",
                  marginTop: "10px",
                  textAlign: "right",
                }}
              >
                - Jane Smith
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              color: "#e60000",
              marginBottom: "30px",
            }}
          >
            Connect With Us
          </h2>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2rem", color: "#3b5998" }}
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2rem", color: "#C13584" }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2rem", color: "#1DA1F2" }}
            >
              <FaTwitter />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
