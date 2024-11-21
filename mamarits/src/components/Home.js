import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import bulasing from "../assets/image1.png";
import chickenChops from "../assets/image2.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="home">
      <div className="banner container ">
        <div className="d-flex flex-row ">
          <div className="col-md-6 banner-left d-flex flex-column justify-content-center">
            <h1>Welcome to Mamarits!</h1>
            <p>Discover new and exciting recipes from around the world.</p>
            <div>
              <Button
                className="see-menu col-sm-3 me-2 "
                as={Link}
                to="/order"
                Name="col-sm-3 me-2 bg-transparent border-0"
              >
                Order Now
              </Button>
            </div>
          </div>
          <div className="col-md-6 banner-right">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bulasing}
                  alt="Bulasing"
                  style={{
                    width: "100%",
                    height: "50vh",
                    objectFit: "",
                    objectPosition: "center",
                  }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={chickenChops}
                  alt="Chicken Chops"
                  style={{
                    width: "100%",
                    height: "50vh",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      {/* <div className="services container justify-content-center">
        <div className="column">
          <h1>Services</h1>
          <div className="row">
            <div className="col-sm-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Service 1"
                className="service-image"
              />
              <h2>Service 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-sm-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Service 2"
                className="service-image"
              />
              <h2>Service 2</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-sm-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Service 3"
                className="service-image"
              />
              <h2>Service 2</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
