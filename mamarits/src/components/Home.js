import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "../App.css";
import bulasing from "../assets/Bulasing.png";
import chickenChops from "../assets/ChickenChops.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="home">
      <div className="banner container">
        <div className="row">
          <div className="col-md-6 banner-left d-flex flex-column justify-content-center">
            <h1>Welcome to FoodHub!</h1>
            <p>Discover new and exciting recipes from around the world.</p>
            <div>
              <Button className="col-sm-3 me-2 bg-danger border-0">
                Order Now
              </Button>
              <Button className="col-sm-3 me-2 bg-transparent border-0">
                See Menu
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
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={chickenChops}
                  alt="Chicken Chops"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
