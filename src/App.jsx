import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import SideNavBar from "./SideNavBar";
import Billing from "./pages/Billing";
import About from "./pages/About";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import InventoryItems from "./InventoryPage/InventoryItems";

function App() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <Router>
      <div className="flex">
        <SideNavBar language={language} />
        <div className="flex-grow px-2 bg-gray-100">
          <Routes>
            <Route path="/" element={<Billing language={language} />} />
            <Route path="/accounts" element={<About />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory-items" element={<InventoryItems />} />
            <Route
              path="/settings"
              element={
                <Settings
                  language={language}
                  onLanguageChange={handleLanguageChange}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
