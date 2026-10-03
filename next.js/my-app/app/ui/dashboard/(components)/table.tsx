import React from "react";
import SearchBar from "@/app/ui/dashboard/(components)/searchbar";
import SortBar from "@/app/ui/dashboard/(components)/sortbar";
import Thead from "@/app/ui/dashboard/(components)/thead";
import Tbody from "@/app/ui/dashboard/(components)/tbody";

export default function table() {
  return (
    <div>
      <div className="flex">
        <SearchBar />
        <SortBar />
        <Thead />
        <Tbody />
      </div>
    </div>
  );
}
