import React from "react";

function Settings({ language, onLanguageChange }) {
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    onLanguageChange(selectedLanguage); // Notify parent about the language change
  };

  return (
    <div className="h-screen flex flex-col items-start p-6 space-y-4">
      <div className="w-full flex justify-between items-center bg-gray-700 p-4 rounded-lg">
        <label className="text-2xl text-white font-semibold">Language</label>
        <select
          className="text-2xl bg-gray-800 text-white p-2 rounded-md border-none"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="tn">Tamil</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
