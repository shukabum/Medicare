import React from "react";
import classes from "../Styles/content.module.css";
const SearchFilter = () => {
  const handleFilterChange = (e) => {
   e.preventDefault();
   
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleFilterChange}
        className={classes.search}
        // onFocus={"this.none"}
      />
    </form>
  );
};

export default SearchFilter;
