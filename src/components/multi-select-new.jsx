"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import Input from "./Input";
import Label from "./Label";

const MultiSelectNew = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select options",
  className = "",
  required = false,
  labelKey = "label", // <-- default to "label"
}) => {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const isSelected = (id) => value.some((v) => v._id === id);

  const toggleOption = (option) => {
    setTouched(true);

    if (isSelected(option._id)) {
      onChange(value.filter((v) => v._id !== option._id));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor={label}>{label}</Label>

      {required && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: "absolute",
            opacity: 0,
            height: 1,
            pointerEvents: "none",
          }}
          value={value.length > 0 ? "selected" : ""}
          onChange={() => {}}
          required
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className={cn("relative w-full cursor-pointer", className)}>
            <Input
              placeholder={placeholder}
              value={value.map((v) => v[labelKey]).join(", ")}
              className="pr-10 caret-transparent focus:caret-transparent"
              readOnly
            />
            <ChevronDown
              size={18}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <div className="flex w-full flex-col gap-2">
            {options.map((option) => (
              <label
                key={option._id}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={isSelected(option._id)}
                  onChange={() => toggleOption(option)}
                  className="accent-brand-950"
                />
                {option[labelKey]}
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {/* Custom error message */}
      {required && touched && value.length === 0 && (
        <div
          id={`${label}-error`}
          className="mt-1 text-sm text-red-600 transition-opacity duration-200"
        >
          This field is required
        </div>
      )}
    </div>
  );
};

export default MultiSelectNew;


// Uses: 
// - Popover for dropdown functionality
// - Input for the display field
// - Label for accessibility
// - Custom error message for required fields
// - Checkbox for selecting options
// - State management for open/close and touched state
// - Utility function `cn` for conditional class names
// - Ref for dropdown reference (if needed in the future)
// - `labelKey` prop to customize the label field in options
// - `required` prop to handle required field validation
// - `placeholder` prop for the input field
// - `className` prop for additional styling
// - `value` prop to manage selected options
// - `onChange` prop to handle selection changes
// - `options` prop to provide the list of selectable options
// - `isSelected` function to check if an option is already selected

  //  <MultiSelectNew
  //     label="Product Overview"
  //     options={productOverview}
  //     value={selectedProductOverview}
  //     placeholder="Select product overview"
  //     onChange={setSelectedProductOverview}
  //     required="true"
  //     labelKey="name"
  //   />