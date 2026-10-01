import React from "react";

export default function table() {
  return (
    <div>
      <div className="flex">
        <SearchBar />
        <NavSort />
      </div>
      <Theader />
      <Tbody />
    </div>
  );
}
