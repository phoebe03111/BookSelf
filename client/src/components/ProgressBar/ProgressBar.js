import React from "react";

function ProgressBar({ percentage }) {
  const containerStyles = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 30,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: "#33413c",
    borderRadius: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${percentage}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
