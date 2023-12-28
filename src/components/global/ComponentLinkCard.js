import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ComponentLinkCard = ({ componentLink, componentName }) => {
  return (
    <Link
      href={`/${componentLink}`}
      alt={`Link to ${componentName}`}
      className="flex justify-between gap-6 p-4 border rounded-md shadow hover:bg-slate-50"
    >
      <p>{componentName}</p>
      <ChevronRight />
    </Link>
  );
};

export default ComponentLinkCard;
