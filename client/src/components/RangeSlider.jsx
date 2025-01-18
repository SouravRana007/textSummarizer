import React from "react";

const RangeSlider = ({ ranges, onChange, value }) => {
  return (
    <div>
      <input
        type="range"
        min={1}
        max="3"
        value={value}
        className="range"
        step={1}
        onChange={onChange}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {ranges.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default RangeSlider;
