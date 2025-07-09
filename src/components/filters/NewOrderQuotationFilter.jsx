import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";

const NewOrderQuotationFilter = ({
  handleFilterChange,
  selectedFilters,
  filterOptions,
  // selectedFilterStatus,
  // onFilterStatusChange,
  // startDate,
  // setStartDate,
  // endDate,
  // setEndDate,
}) => {
  return (
    <div className="top-0 flex flex-col gap-4 md:absolute md:flex-row md:items-center md:justify-end">
      <div>
        <Label htmlFor="status">Filter By Status</Label>
        <Select
          id="status"
          value={selectedFilters?.orderStatus || ""}
          onChange={handleFilterChange("orderStatus")}
          // value={selectedFilterStatus}
          // onChange={onFilterStatusChange}
          className="capitalize"
        >
          <option value="">All</option>
          {filterOptions.map((status, index) => (
            <option value={status} key={index} className="capitalize">
              {status}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="startDate">Date Filter (Start)</Label>
        <Input
          type="date"
          // value={startDate}
          value={selectedFilters?.orderDateStart || ""}
          onChange={handleFilterChange("orderDate[start]")}
          // onChange={(e) => setStartDate(e.target.value)}
          id="startDate"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div>
        <Label htmlFor="endDate">Date Filter (End)</Label>
        <Input
          type="date"
          // value={endDate}
          value={selectedFilters?.orderDateEnd || ""}
          onChange={handleFilterChange("orderDate[end]")}
          // onChange={(e) => setEndDate(e.target.value)}
          id="endDate"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
};

export default NewOrderQuotationFilter;
