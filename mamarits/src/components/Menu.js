import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("mains");

  return (
    <section>
      <div className="tabs">
        <ul
          className="nav nav-tabs"
          role="tablist"
        >
          <li
            className="nav-item"
            role="presentation"
          >
            <NavLink
              href="#mains"
              className={`nav-link ${activeTab === "mains" ? "active" : ""}`}
              role="tab"
              onClick={() => setActiveTab("mains")}
            >
              Mains
            </NavLink>
          </li>
          <li
            className="nav-item"
            role="presentation"
          >
            <NavLink
              href="#snacks"
              className={`nav-link ${activeTab === "snacks" ? "active" : ""}`}
              role="tab"
              onClick={() => setActiveTab("snacks")}
            >
              Snacks
            </NavLink>
          </li>
          <li
            className="nav-item"
            role="presentation"
          >
            <NavLink
              href="#appetizers"
              className={`nav-link ${
                activeTab === "appetizers" ? "active" : ""
              }`}
              role="tab"
              onClick={() => setActiveTab("appetizers")}
            >
              Appetizers
            </NavLink>
          </li>
          <li
            className="nav-item"
            role="presentation"
          >
            <NavLink
              href="#coffee"
              className={`nav-link ${activeTab === "coffee" ? "active" : ""}`}
              role="tab"
              onClick={() => setActiveTab("coffee")}
            >
              Coffee
            </NavLink>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "mains" && (
            <section
              className="tabs-panel"
              id="mains"
              role="tabpanel"
              aria-labelledby="mains-tab"
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <section className="menu-selection">
                      <div className="menu-section__header">
                        <h2>Mama Rits Tapsilog</h2>
                        Smoked daily, all served with Texas toast &amp; pickles.
                        Sold by the 1/2 lb.
                      </div>
                    </section>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "snacks" && (
            <section
              className="tabs-panel"
              id="snacks"
              role="tabpanel"
              aria-labelledby="snacks-tab"
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h2>Snacks Menu</h2>
                    <h6>Papa Rey's Chicken Sandwich</h6>

                    <h6>Potato Fries</h6>
                    <p2>Cheesy | Chili Con Carne</p2>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "appetizers" && (
            <section
              className="tabs-panel"
              id="appetizers"
              role="tabpanel"
              aria-labelledby="appetizers-tab"
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h2>Appetizers</h2>
                    <p>
                      6 Pcs. Chicken Wings (Korean Buffalo, Soy Garlic, Chili,
                      BBQ): 199
                    </p>
                    <p>Crispy Chicken Skin with Chili Con Carne: 199</p>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "coffee" && (
            <section
              className="tabs-panel"
              id="coffee"
              role="tabpanel"
              aria-labelledby="coffee-tab"
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h2>Coffee</h2>
                    <p>Latte (Medium 69 | Large 99 | Small 59)</p>
                    <p>Americano (69 | 99 | 59)</p>
                    <p>Spanish Latte 🌟 (69 | 99 | 59)</p>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
