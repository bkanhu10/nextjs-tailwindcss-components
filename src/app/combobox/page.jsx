"use client";
import { SearchableSelect } from "@/components/SearchableSelect";
import { City, State } from "country-state-city";
import { useState } from "react";

const cities = City.getCitiesOfCountry("IN").map((city) => ({
  label: city.name,
  value: city.name.toLowerCase().replace(/\s/g, "-"),
}));
const states = State.getStatesOfCountry("IN").map((state) => ({
  label: state.name,
  value: state.name.toLowerCase().replace(/\s/g, "-"),
}));

const ComboboxPage = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  return (
    <div>
      ComboboxPage
      
      <SearchableSelect
        options={cities}
        value={selectedCity}
        onSelect={setSelectedCity}
        placeholder="Select city..."
        label="City"
      />
      <SearchableSelect
        options={states}
        value={selectedState}
        onSelect={setSelectedState}
        placeholder="Select city..."
        label="City"
      />

    </div>
  );
};

export default ComboboxPage;
