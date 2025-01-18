import React from "react";
import Container from "./Container";
import RangeSlider from "./RangeSlider";

const SummaryView = ({
  fileName,
  originalContent,
  currentSummaryType,
  summary,
  onRangeChange,
  rangeValue,
}) => {
  return (
    <Container>
      <div
        style={{ height: `calc(100vh - 90px)` }}
        className="flex flex-col mb-4"
      >
        <div className="flex  items-start m-4 px-4">
          <div className="mr-4">Summary Length: </div>
          <RangeSlider
            ranges={["short", "medium", "long"]}
            onChange={onRangeChange}
            value={rangeValue}
          />
        </div>

        <div className="flex flex-1 gap-4 min-h-[500px] h-[calc(100vh-200px)]">
          {/* Left Panel */}
          <div className="flex-1 w-1/2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <p className="font-semibold">{fileName}</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">{originalContent}</div>
            </div>

            {/* Fixed Bottom Section */}
            {/* <div className="border-t bg-amber-50">
              <div className="">
                <div className="bg-white/50 rounded-lg p-4 flex justify-end">
                  <button className="btn btn-neutral rounded-lg">
                    Summarize
                  </button>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Panel */}
          <div className="flex-1 w-1/2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <p className="font-semibold">Summary</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">{summary}</div>
            </div>

            {/* Fixed Bottom Section */}
            {/* <div className="border-t bg-amber-50">
              <div className="p-4">
                <div className="bg-white/50 rounded-lg p-4">
                  {summary && (
                    <span className="font-semibold">
                      Total {summary.split(" ").length} words
                    </span>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SummaryView;
