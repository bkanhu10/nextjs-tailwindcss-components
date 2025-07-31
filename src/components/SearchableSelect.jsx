"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";
import { FixedSizeList as VirtualList } from "react-window";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const COMBOBOX_WIDTH = "w-[240px]";
const DEBOUNCE_MS = 300;
export function SearchableSelect({
  options,
  value,
  onSelect,
  placeholder = "Select...",
  label,
  debounceMs = 300,
  getOptionLabel = (o) => o.label,
  getOptionValue = (o) => o.value,
}) {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [debouncedSearch] = useDebounce(search, debounceMs);

  const filteredOptions = React.useMemo(() => {
    const term = debouncedSearch.toLowerCase().trim();
    if (!term) return options;
    return options.filter((opt) =>
      getOptionLabel(opt).toLowerCase().includes(term)
    );
  }, [debouncedSearch, options, getOptionLabel]);

  const selectedLabel = React.useMemo(() => {
    return getOptionLabel(
      options.find((o) => getOptionValue(o) === value) ?? { label: "" }
    );
  }, [value, options, getOptionLabel, getOptionValue]);

  const handleSelect = (newValue) => {
    onSelect(newValue === value ? "" : newValue);
    setSearch("");
    setOpen(false);
  };
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
            placeholder={placeholder}
            autoFocus
          />

          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup>
                <VirtualList
                  height={200}
                  itemCount={filteredOptions.length}
                  itemSize={35}
                  width="100%"
                >
                  {({ index, style }) => {
                    const option = filteredOptions[index];
                    const isSelected = getOptionValue(option) === value;

                    return (
                      <div key={getOptionValue(option)} style={style}>
                        <CommandItem
                          value={getOptionValue(option)}
                          onSelect={handleSelect}
                          className="cursor-pointer"
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {getOptionLabel(option)}
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
