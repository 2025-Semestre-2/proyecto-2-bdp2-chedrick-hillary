import React from "react";

function Card({ title, data }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Card;
