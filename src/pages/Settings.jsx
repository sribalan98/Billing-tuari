import React from "react";

function Settings({ language, onLanguageChange }) {
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    onLanguageChange(selectedLanguage); // Notify parent about the language change
  };

  return (
    <div className="h-screen flex items-start  px-4 py-4">
      <div className=" flex items-center border bg-gray-600 px-4 py-2 rounded-lg">
        <label className="text-2xl font-semibold mr-4">Language</label>
        <select
          className="border-none bg-transparent text-xl"
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
