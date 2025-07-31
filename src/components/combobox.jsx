"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { City } from "country-state-city";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";
import { FixedSizeList as VirtualList } from "react-window";
import { useDebounce } from "use-debounce";

// Utilities
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ITEM_HEIGHT = 35;
const LIST_HEIGHT = 200;
const COMBOBOX_WIDTH = "w-[240px]";
const DEBOUNCE_MS = 300;

export function CitySelectCombobox() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_MS);
  const [cities, setCities] = React.useState([]);

  // Load once
  React.useEffect(() => {
    const cityData = City.getCitiesOfCountry("IN") || [];
    setCities(
      cityData.map((city) => ({
        label: city.name,
        value: slugify(city.name),
      }))
    );
  }, []);

  const filteredCities = React.useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return cities;
    return cities.filter((c) => c.label.toLowerCase().includes(term));
  }, [cities, debouncedSearch]);

  const selectedLabel = React.useMemo(() => {
    return cities.find((c) => c.value === selectedValue)?.label ?? "";
  }, [selectedValue, cities]);

  const handleSelect = (newValue) => {
    setSelectedValue((prev) => (prev === newValue ? "" : newValue));
    setSearch(""); // Reset input
    setOpen(false); // Close dropdown
  };
// Uncomment to track render count
// const renderCount = React.useRef(0);
// renderCount.current += 1;
// console.log(`Render count: ${renderCount.current}`);

 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(COMBOBOX_WIDTH, "justify-between")}
        >
          {selectedLabel || "Select city..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn(COMBOBOX_WIDTH, "p-0")}>
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search city..."
            autoFocus
          />

          <CommandList>
            {filteredCities.length === 0 ? (
              <CommandEmpty>No cities found.</CommandEmpty>
            ) : (
              <CommandGroup>
                <VirtualList
                  height={LIST_HEIGHT}
                  itemCount={filteredCities.length}
                  itemSize={ITEM_HEIGHT}
                  width="100%"
                >
                  {({ index, style }) => {
                    const city = filteredCities[index];
                    const isSelected = city.value === selectedValue;

                    return (
                      <div style={style} key={city.value}>
                        <CommandItem
                          value={city.value}
                          onSelect={handleSelect}
                          className="cursor-pointer"
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {city.label}
                        </CommandItem>
                      </div>
                    );
                  }}
                </VirtualList>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export function ExampleCombobox() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold">City Select Combobox</h2>
      <CitySelectCombobox />
    </div>
  );
}
