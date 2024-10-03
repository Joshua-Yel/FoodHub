import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("mains");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu"); // Adjust the URL as necessary
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Log the data to inspect its structure
        console.log("Fetched Menu Data:", data);

        // Ensure 'menu' is an array and set it to state
        if (Array.isArray(data.menu)) {
          setMenuItems(data.menu);
        } else {
          throw new Error("Menu is not an array");
        }
      } catch (error) {
        console.error("Fetch Error:", error); // Log error to console
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const renderMenuItems = (category) => {
    const selectedCategory = menuItems.find(
      (item) => item.category === category
    );

    // Log selected category to debug
    console.log("Selected Category:", selectedCategory);

    // Added checks for selectedCategory and its items
    if (!selectedCategory || !Array.isArray(selectedCategory.items))
      return null;

    return selectedCategory.items.map((item, index) => (
      <li
        className="menu-item"
        key={index}
      >
        <img
          src={item.img}
          alt={item.name}
          style={{ width: "100px", height: "100px" }}
        />
        <h6>{item.name}</h6>
        {Array.isArray(item.sizes) &&
          item.sizes.map((size, sizeIndex) => (
            <p key={sizeIndex}>
              {size.size}: {size.price}
            </p>
          ))}
      </li>
    ));
  };

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <section>
      <div className="tabs">
        <ul
          className="nav nav-tabs justify-content-center border-dark"
          role="tablist"
        >
          <li
            className="nav-item"
            role="presentation"
          >
            <NavLink
              href="#mains"
              className={`nav-link ${
                activeTab === "mains" ? "active" : ""
              } text-center border-dark`}
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
              className={`nav-link ${
                activeTab === "snacks" ? "active" : ""
              } text-center border-dark`}
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
              } text-center border-dark`}
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
              className={`nav-link ${
                activeTab === "coffee" ? "active" : ""
              } text-center border-dark`}
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
                  <div className="col-md-12 text-center">
                    <h2 className="text-center mb-4">Menu</h2>
                    <div className="container">
                      <div className="row justify-content-center mb-4">
                        <div className="col-md-6">
                          <h3 className="text-center">Main Dishes</h3>
                          <ul
                            style={{
                              listStyle: "none",
                              paddingLeft: 0,
                              textAlign: "left",
                            }}
                          >
                            {renderMenuItems("Mains")}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h3 className="text-center">Snacks</h3>
                          <ul
                            style={{
                              listStyle: "none",
                              paddingLeft: 0,
                              textAlign: "left",
                            }}
                          >
                            {renderMenuItems("Snacks")}
                          </ul>
                        </div>
                      </div>
                      <div className="row justify-content-center mb-4">
                        <div className="col-md-6">
                          <h3 className="text-center">Appetizers</h3>
                          <ul
                            style={{
                              listStyle: "none",
                              paddingLeft: 0,
                              textAlign: "left",
                            }}
                          >
                            {renderMenuItems("Appetizers")}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h3 className="text-center">Coffee</h3>
                          <ul
                            style={{
                              listStyle: "none",
                              paddingLeft: 0,
                              textAlign: "left",
                            }}
                          >
                            {renderMenuItems("Coffee")}
                          </ul>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <h3 className="text-center">Events</h3>
                          <ul
                            style={{
                              listStyle: "none",
                              paddingLeft: 0,
                              textAlign: "left",
                            }}
                          >
                            {renderMenuItems("Events")}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Similar style adjustments for other tabs */}
          {activeTab === "snacks" && (
            <section
              className="tabs-panel"
              id="snacks"
              role="tabpanel"
              aria-labelledby="snacks-tab"
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-6 text-center">
                    <h3>Snacks</h3>
                    <ul
                      style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        textAlign: "left",
                      }}
                    >
                      {renderMenuItems("Snacks")}
                    </ul>
                  </div>
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
                <div className="row justify-content-center">
                  <div className="col-md-6 text-center">
                    <h3>Appetizers</h3>
                    <ul
                      style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        textAlign: "left",
                      }}
                    >
                      {renderMenuItems("Appetizers")}
                    </ul>
                  </div>
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
                <div className="row justify-content-center">
                  <div className="col-md-6 text-center">
                    <h3>Coffee</h3>
                    <ul
                      style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        textAlign: "left",
                      }}
                    >
                      {renderMenuItems("Coffee")}
                    </ul>
                  </div>
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
