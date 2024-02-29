import React, { useState } from 'react';

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, price } = formData;

    
    if (!name || !image || !price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image,
          price: parseFloat(price)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add plant');
      }

      const data = await response.json();
      onAddPlant(data);
      
      setFormData({
        name: '',
        image: '',
        price: ''
      });
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description (Image URL):
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;