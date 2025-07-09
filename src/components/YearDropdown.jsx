import Select from "./Select";

const YearDropdown = ({
  name = "year",
  selectedYear,
  onChange,
  startYear = 2024,
  endYear,
}) => {
  const end = endYear || new Date().getFullYear();
  const yearOptions = [];

  for (let year = end; year >= startYear; year--) {
    yearOptions.push(year);
  }

  return (
    <Select
      name={name}
      value={selectedYear}
      defaultValue={endYear}
      onChange={onChange}
    >
      <option value="">Choose Year</option>
      {yearOptions.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  );
};

export default YearDropdown;
