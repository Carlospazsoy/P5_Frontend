import React, { useState } from "react";
import HomeCategory from "../shop/Categories/HomeCategory";
import PersonalCare from "../shop/Categories/PersonalCareCategory";
import CleaningCategory from "../shop/Categories/CleaningCategory";
import FoodCategory from "../shop/Categories/FoodCategory";
import ClothesCategory from "../shop/Categories/ClothesCategory";
import { Dropdown } from "react-bootstrap";

function Tienda() {
  const [selectedCategory, setSelectedCategory] = useState("all"); // Estado inicial: all

  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case "home":
        return <HomeCategory />;
      case "cleaning":
        return <CleaningCategory />;
      case "personal-care":
        return <PersonalCare />;
      case "food":
        return <FoodCategory />;
      case "clothes":
        return <ClothesCategory />;
      case "all":
        // Renderizar todos los componentes de categoría
        return (
          <>
            <HomeCategory />
            <PersonalCare />
            <CleaningCategory />
            <FoodCategory />
            <ClothesCategory />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Selecciona una categoría
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedCategory("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("home")}>
              Home
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("cleaning")}>
              Cleaning
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("personal-care")}>
              Personal Care
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("food")}>
              Food
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("clothes")}>
              Clothes
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {renderCategoryComponent()}
    </>
  );
}

export default Tienda;
