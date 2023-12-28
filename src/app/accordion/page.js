"use client";
import Accordion from "@/components/Accordion";
import Autocomplete from "@/components/Autocomplete";
import { useState } from "react";
const AccordionPage = () => {
  const [formData, setFormdata] = useState({
    name: "",
    movie: "",
  });
  const suggestions = [
    "The Shawshank Redemption",
    "The Godfather",
    "Pulp Fiction",
    "The Dark Knight",
    "Schindler's List",
    "Forrest Gump",
    "The Matrix",
    "Titanic",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Inception",
    "Fight Club",
    "The Silence of the Lambs",
    "The Lion King",
    "Gladiator",
    "Jurassic Park",
    "The Avengers",
    "Star Wars: Episode IV - A New Hope",
    "E.T. the Extra-Terrestrial",
    "The Wizard of Oz",
    "Casablanca",
    "Gone with the Wind",
    "Avatar",
    "Back to the Future",
    "The Great Gatsby",
    "The Grand Budapest Hotel",
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", formData);
  };
  const handleSuggestionSelected = (selectedValue) => {
    // console.log("Selected Value:", selectedValue);
    setFormdata((prevData) => ({
      ...prevData,
      movie: selectedValue,
    }));
    // You can perform additional actions with the selected value here
  };

  return (
    <div className="w-1/2 mx-auto mt-20">
      <hr />

      <form action="" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-4 border"
        />
        <Autocomplete
          suggestions={suggestions}
          onSuggestionSelected={handleSuggestionSelected}
          // value={formData.movie}
          // onChange={handleInputChange}
          // name="movie"
          // id="movie"
        />
        <button type="submit">submit</button>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </form>
    </div>
  );
};

export default AccordionPage;
