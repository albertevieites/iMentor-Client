import { useState } from "react";

import tagsArr from "../../utils/tagsArr";

import "./Tags.css";

const Tags = ({ onTagSelect, selectedTags }) => {
  const [showAll, setShowAll] = useState(false);

  const tagsToDisplay = showAll ? tagsArr : tagsArr.slice(0, 5);

  const toogleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <div className="tags">
      {tagsToDisplay.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <span
            key={tag}
            className={isSelected ? "selected" : ""}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </span>
        );
      })}
      <button onClick={toogleShowAll}>
        {showAll ? "Show less" : "Show all"}
      </button>
    </div>
  );
};

export default Tags;
