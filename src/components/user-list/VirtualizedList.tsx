import React, { useState, useEffect } from "react";
import "./VirtualizedList.css";
import { UserModelData } from "../../libs/models/user-models/userModelsData";

interface VirtualizedListProps {
  itemCount: number;
  itemSize: number;
  items: UserModelData[];
  renderItem: (item: UserModelData, index: number) => React.ReactNode;
}

/**
 * VirtualizedList component renders a virtualized list of items.
 * 
 * This component only renders the items that are currently visible in the viewport,
 * improving performance for large lists.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.itemCount - The total number of items in the list.
 * @param {number} props.itemSize - The height of a single item in pixels.
 * @param {UserModelData[]} props.items - The array of items to render.
 * @param {(item: UserModelData, index: number) => React.ReactNode} props.renderItem - A function to render each item.
 * @returns {JSX.Element} The rendered VirtualizedList component.
 */
const VirtualizedList = ({
  itemCount,
  itemSize,
  items,
  renderItem,
}: VirtualizedListProps) => {
  /**
   * State for storing the start index of visible items.
   */
  const [startIndex, setStartIndex] = useState(0);

  /**
   * State for storing the end index of visible items.
   */
  const [endIndex, setEndIndex] = useState(
    Math.min(itemCount - 1, Math.floor(window.innerHeight / itemSize))
  );

  /**
   * Handle scroll event to update visible items.
   */
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const newStartIndex = Math.floor(scrollTop / itemSize);
    const newEndIndex = Math.min(
      itemCount - 1,
      Math.floor((scrollTop + window.innerHeight) / itemSize)
    );
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const paddingTop = startIndex * itemSize;
  const paddingBottom = (itemCount - endIndex - 1) * itemSize;

  return (
    <div className="virtualized-list">
      <div
        className="virtualized-list-container"
        style={{
          paddingTop,
          paddingBottom,
        }}
      >
        {items.slice(startIndex, endIndex + 1).map((item, index) => (
          <div
            key={startIndex + index}
            className="virtualized-list-item"
            style={{
              top: (startIndex + index) * itemSize,
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;