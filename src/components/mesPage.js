import React from "react";

import "../styles/message.css";

function Error() {
  return (
    <div className="Warning">
      <h2> No location found </h2>
      <p>Invalid Input...</p>
      <p> Ex: Toronto, Ontario </p>
    </div>
  );
}

export default Error;
