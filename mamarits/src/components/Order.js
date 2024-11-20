import React, { useState, useEffect } from "react";

export default function Order() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMenuItems(data);
        console.log("Menu Items:", data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchMenuData();
  }, []);

  const renderMenuItem = (item) => (
    <div
      key={item._id}
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

  const renderMenuCategory = (category, index) => (
    <div
      key={index}
      className="grid-column"
    >
      <div className="text-center mb-4">
        <h3 className="category-title">{category.category}</h3>
      </div>
      {category.items.map(renderMenuItem)}
    </div>
  );

  return (
    <section className="order-section">
      <div className="container my-4">
        <div className="grid-container">
          <div className="grid-row">
            {menuItems.slice(0, 4).map(renderMenuCategory)}
          </div>
          <div className="grid-row">
            {menuItems.slice(4).map(renderMenuCategory)}
          </div>
        </div>

        {selectedItem && (
          <AddCart
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </section>
  );
}
const AddCart = ({ item, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleOptionChange = (e) => setSelectedOption(e.target.value);
  const handleFlavorChange = (e) => setSelectedFlavor(e.target.value);
  const handleSizeChange = (e) => setSelectedSize(e.target.value);
  const handleQuantityChange = (e) => setQuantity(parseInt(e.target.value, 10));

  const calculatePrice = () => {
    if (!item) return 0;

    let basePrice = item.price || 0;

    if (selectedSize) {
      const sizeObj = item.sizes.find((size) => size.size === selectedSize);
      if (sizeObj && typeof sizeObj.price === "number") {
        basePrice = sizeObj.price;
      }
    }
    if (selectedOption || item.options.flavors) {
      const optionObj = item.options.find(
        (option) => option.option === selectedOption
      );
      if (optionObj && typeof optionObj.price === "number") {
        return item.price * quantity;
      }
    }

    return typeof basePrice === "number" ? basePrice * quantity : 0;
  };

  const handleAddToCart = async () => {
    try {
      const dataToSend = {
        id: item._id,
        quantity,
        size:
          selectedSize ||
          (item.sizes.length > 0 ? item.sizes[0].size : "Regular"),
        option: selectedOption || null,
        flavor: selectedFlavor || null,
      };

      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Server error:", errorMessage);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Item added to orders in DB:", data);
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-content card shadow-lg p-4">
        <h2 className="mb-4">{item.name}</h2>

        {item.options && item.options.length > 0 && (
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
              {item.options.map((option, index) => (
                <option
                  key={index}
                  value={typeof option === "string" ? option : option.option}
                >
                  {typeof option === "string" ? option : option.option}
                </option>
              ))}
            </select>
          </div>
        )}

        {item.flavors && item.flavors.length > 0 && (
          <div className="flavors-selection mb-3">
            <label
              htmlFor="flavors"
              className="form-label"
            >
              Flavors:
            </label>
            <select
              id="flavors"
              className="form-select"
              value={selectedFlavor}
              onChange={handleFlavorChange}
            >
              <option value="">Select Flavor</option>
              {item.flavors.map((flavor, index) => (
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

        {item.sizes && item.sizes.length > 0 && (
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
              <option value="">Select Size</option>
              {item.sizes.map((size, index) => (
                <option
                  key={index}
                  value={size.size}
                >
                  {size.size}
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="fw-bold mb-3">Price: php {calculatePrice()}</p>
        <button
          className="btn btn-primary me-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="btn btn-secondary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
