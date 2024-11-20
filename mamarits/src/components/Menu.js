import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("mains");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        console.log("Fetched Menu Data:", data);
        if (Array.isArray(data.menu)) {
          setMenuItems(data.menu);
        } else {
          throw new Error("Menu is not an array");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleFlavorChange = (e) => setSelectedFlavor(e.target.value);
  const handleSizeChange = (e) => setSelectedSize(e.target.value);
  const handleQuantityChange = (e) => setQuantity(parseInt(e.target.value, 10));
  const handleOptionChange = (e) => setSelectedOption(e.target.value);

  const renderMenuItem = (item) => (
    <div
      key={item.name}
      className="card border-1 shadow-sm rounded mb-3 pe-5"
    >
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={item.img || "https://via.placeholder.com/150"}
            alt={item.name}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-md-9 d-flex align-items-center">
          <div className="card-body ps-5">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text text-muted">{item.description}</p>
            {item.sizes &&
              item.sizes.map((size, index) => (
                <p
                  key={index}
                  className="menu-sizes card-text"
                >
                  {size.size}: php {size.price}
                </p>
              ))}
          </div>
          <button
            className="btn btn-add-order ms-auto me-3"
            onClick={() => setSelectedItem(item)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              fill="black"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const calculatePrice = () => {
    if (selectedItem && selectedSize) {
      const sizePrice = selectedItem.sizes.find(
        (size) => size.size === selectedSize
      ).price;
      return sizePrice * quantity;
    }
    return 0;
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      selectedItem,
      selectedFlavor,
      selectedSize,
      quantity,
    });
    setSelectedItem(null); // Close the overlay after adding to cart
  };

  const renderMenuItems = (category) => {
    const selectedCategory = menuItems.find(
      (item) => item.category === category
    );
    if (!selectedCategory || !Array.isArray(selectedCategory.items))
      return null;

    return selectedCategory.items.map((item, index) => (
      <li
        key={index}
        className="menu-item"
      >
        <img
          src={item.img || "https://via.placeholder.com/150"}
          alt={item.name}
          style={{ width: "100px", height: "100px" }}
        />
        <h6>{item.name}</h6>
        {Array.isArray(item.sizes) && (
          <ul>
            {item.sizes.map((size, sizeIndex) => (
              <li key={sizeIndex}>
                {size.size}: {size.price}
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => setSelectedItem(item)}>Select</button>
      </li>
    ));
  };

  const onClose = () => {
    setSelectedItem(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="menu-section">
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
              to="#mains"
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
              to="#snacks"
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
              to="#appetizers"
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
              to="#coffee"
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
          {activeTab === "mains" && selectedItem && (
            <div className="cart-content card shadow-lg p-4">
              <h2 className="mb-4">{selectedItem.name}</h2>
              {/* Options Selection */}
              {selectedItem.options && (
                <div className="options-selection mb-3">
                  <label
                    htmlFor="option"
                    className="form-label"
                  >
                    Options:
                  </label>
                  <select
                    id="option"
                    className="form-select"
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    <option value="">Select Option</option>
                    {selectedItem.options.map((option, index) => (
                      <option
                        key={index}
                        value={
                          typeof option === "string" ? option : option.option
                        }
                      >
                        {typeof option === "string" ? option : option.option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Flavor Selection */}
              {selectedItem.flavors && (
                <div className="flavor-selection mb-3">
                  <label
                    htmlFor="flavor"
                    className="form-label"
                  >
                    Flavor:
                  </label>
                  <select
                    id="flavor"
                    className="form-select"
                    value={selectedFlavor}
                    onChange={handleFlavorChange}
                  >
                    <option value="">Select a flavor</option>
                    {selectedItem.flavors.map((flavor, index) => (
                      <option
                        key={index}
                        value={flavor}
                      >
                        {flavor}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Size Selection */}
              {selectedItem.sizes && (
                <div className="size-selection mb-3">
                  <label
                    htmlFor="size"
                    className="form-label"
                  >
                    Size:
                  </label>
                  <select
                    id="size"
                    className="form-select"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <option value="">Select a size</option>
                    {selectedItem.sizes.map((size, index) => (
                      <option
                        key={index}
                        value={size.size}
                      >
                        {size.size}: php {size.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Quantity Selection */}
              <div className="quantity-selection mb-3">
                <label
                  htmlFor="quantity"
                  className="form-label"
                >
                  Quantity:
                </label>
                <input
                  id="quantity"
                  className="form-control"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
              </div>
              <h3>Price: php {calculatePrice()}</h3>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-dark me-2"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === "mains" && renderMenuItems("mains")}
          {activeTab === "snacks" && renderMenuItems("snacks")}
          {activeTab === "appetizers" && renderMenuItems("appetizers")}
          {activeTab === "coffee" && renderMenuItems("coffee")}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
