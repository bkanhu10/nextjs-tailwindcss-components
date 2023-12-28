import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

import React from "react";

const AccordionPage = () => {
  return (
    <div>
      <ComboBox>
        <Label>Favorite Animal</Label>
        <div>
          <Input className="border" />
          <Button>▼</Button>
        </div>
        <Popover>
          <ListBox>
            <ListBoxItem>Aardvark</ListBoxItem>
            <ListBoxItem>Cat</ListBoxItem>
            <ListBoxItem>Dog</ListBoxItem>
            <ListBoxItem>Kangaroo</ListBoxItem>
            <ListBoxItem>Panda</ListBoxItem>
            <ListBoxItem>Snake</ListBoxItem>
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  );
};

export default AccordionPage;
// "use client";
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// const Accordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div
//       className={`border rounded mb-2 ${isOpen ? "bg-gray-100" : ""}`}
//       role="region"
//       aria-labelledby={`accordion-heading-${title}`}
//       aria-expanded={isOpen}
//     >
//       <div
//         className="flex items-center justify-between p-4 cursor-pointer"
//         onClick={toggleAccordion}
//         role="button"
//         aria-controls={`accordion-content-${title}`}
//       >
//         <h2 className="text-lg font-semibold" id={`accordion-heading-${title}`}>
//           {title}
//         </h2>

//         <ChevronDown
//           className={`transform ${
//             isOpen ? "rotate-180" : "rotate-0"
//           } transition-transform`}
//           aria-hidden="true"
//         />
//       </div>
//       <div
//         id={`accordion-content-${title}`}
//         className={`p-4 ${isOpen ? "" : "hidden"}`}
//         role="region"
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Accordion;
