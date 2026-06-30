import React, { useState, type SetStateAction } from "react";

type FilterPanelProps = {
  status: string;
  pageSize: number;
  setStatus: React.Dispatch<SetStateAction<string>>;
  setPageSize: React.Dispatch<SetStateAction<number>>;
};

const statusValue = ["", "Applied", "Viewed", "Interview", "Offer", "Rejected"];
const statusLabel = [
  "All",
  "Applied",
  "Viewed",
  "Interviewed",
  "Offered",
  "Rejected",
];

const pageSizeValue = [1, 10, 20, 30, 50, 100];
const pageSizeLabel = ["1", "10", "20", "30", "50", "100"];

export function FilterPanel({
  status,
  pageSize,
  setStatus,
  setPageSize,
}: FilterPanelProps) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
      </div>
      <div
        style={{
          display: showFilter ? "block" : "none",
        }}
      >
        <select onChange={(select) => setStatus(select.target.value)}>
          {statusLabel.map((label, index) => {
            return (
              <option value={statusValue[index]} selected={label == status}>
                {label}
              </option>
            );
          })}
        </select>
        <select
          onChange={(select) =>
            setPageSize(Number.parseInt(select.target.value))
          }
        >
          {pageSizeLabel.map((label, index) => {
            return (
              <option
                value={pageSizeValue[index]}
                selected={pageSizeValue[index] == pageSize}
              >
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
