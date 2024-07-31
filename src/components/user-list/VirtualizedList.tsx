import React, { useState, useEffect, useCallback } from 'react';
import './VirtualizedList.css';

interface VirtualizedListProps<T> {
  itemCount: number;
  itemSize: number;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

const VirtualizedList = <T,>({
  itemCount,
  itemSize,
  items,
  renderItem,
}: VirtualizedListProps<T>) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    Math.min(itemCount - 1, Math.floor(window.innerHeight / itemSize))
  );

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const newStartIndex = Math.max(0, Math.floor(scrollTop / itemSize) - 1);
    const newEndIndex = Math.min(
      itemCount - 1,
      Math.floor((scrollTop + window.innerHeight) / itemSize) + 1
    );
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [itemSize, itemCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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