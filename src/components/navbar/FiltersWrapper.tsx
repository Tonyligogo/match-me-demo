"use client";

import { usePathname } from "next/navigation";
import Filters from "./Filters";
import FilterWidget from "./FilterWidget";

export default function FiltersWrapper() {
  const pathname = usePathname();

  if (pathname === "/tony") return <FilterWidget />;
  else return null;
}
