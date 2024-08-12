import React from "react";

function Billing({ language }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">
        {language === "en" ? "Billing Page" : "பில்லிங் பக்கம்"}
      </h1>
    </div>
  );
}

export default Billing;
