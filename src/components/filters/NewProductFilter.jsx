import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";

const NewProductFilter = ({
  handleFilterChange,
  selectedFilters,
  statusOptions,
  categoryOptions,
  subcategoryOptions,
}) => {
  return (
    <div className="top-0 flex flex-col gap-4 md:absolute md:flex-row md:items-center md:justify-end">
      <div>
        <Label htmlFor="productStatus">Filter By Product Status</Label>
        <Select
          id="productStatus"
          onChange={handleFilterChange("productStatus")}
          value={selectedFilters.productStatus || ""}
        >
          <option value="">All</option>
          {statusOptions.map((status, index) => (
            <option value={status} key={index} className="capitalize">
              {status}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Filter By Category</Label>
        <Select
          id="category"
          onChange={handleFilterChange("category")}
          value={selectedFilters.category || ""}
        >
          <option value="">All</option>
          {categoryOptions.map((category, index) => (
            <option value={category?.slug} key={index} className="capitalize">
              {category.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="subcategory">Filter By Subcategory</Label>
        <Select
          id="subcategory"
          onChange={handleFilterChange("subcategory")}
          value={selectedFilters.subcategory || ""}
        >
          <option value="">All </option>
          {subcategoryOptions.map((subcat, index) => (
            <option value={subcat?.slug} key={index} className="capitalize">
              {subcat.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default NewProductFilter;
