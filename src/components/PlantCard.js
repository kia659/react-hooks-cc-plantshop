import React from "react";

function PlantCard({ plant }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price.toFixed(2)}</p>
      <button className={plant.soldOut ? "primary" : ""}>
        {plant.soldOut ? "Sold Out" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;