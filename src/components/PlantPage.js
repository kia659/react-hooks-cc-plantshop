import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data); 
      })
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    newPlant.id = plants.length + 1;
    setPlants([...plants, newPlant]);
    setFilteredPlants([...filteredPlants, newPlant]); 
  };

  const handleSearch = (searchTerm) => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
