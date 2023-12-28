import ComponentLinkCard from "@/components/global/ComponentLinkCard";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="mx-auto mt-48">
        <h1 className="text-4xl font-bold text-center">
          Next.js & Tailwind CSS Components
        </h1>
        <div className="grid w-1/2 grid-cols-3 gap-4 mx-auto mt-20">
          <ComponentLinkCard
            componentLink="accordion"
            componentName="Accordion"
          />
          <ComponentLinkCard
            componentLink="auto-complete"
            componentName="Autocomplete"
          />
          <ComponentLinkCard componentLink="navbar" componentName="Navbar" />
          {/* <ComponentLinkCard componentLink="" componentName="" /> */}
        </div>
      </main>
    </>
  );
}
