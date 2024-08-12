import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function SideNavBar({ language }) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const menuItems = [
    {
      name: language === "en" ? "Billing" : "பில்லிங்",
      href: "/",
      icon: "fa-indian-rupee-sign",
    },
    {
      name: language === "en" ? "Accounts" : "கணக்குகள்",
      href: "/accounts",
      icon: "fa-user",
    },
    {
      name: language === "en" ? "Inventory" : "சரக்கு",
      href: "#",
      icon: "fa-boxes-stacked",
      subItems: [
        {
          name: language === "en" ? "Inventory Items" : "சரக்கு பொருட்கள்",
          href: "/inventory-items",
        },
        {
          name: language === "en" ? "Stock Items" : "பங்கு பொருட்கள்",
          href: "/stock-items",
        },
      ],
    },
    {
      name: language === "en" ? "Settings" : "அமைப்புகள்",
      href: "/settings",
      icon: "fa-gear",
    },
  ];

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  return (
    <div
      className={`group h-screen ${
        isPinned ? "w-64" : "w-16 hover:w-64"
      } bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4 text-xl font-bold">
        <i className="fa-solid fa-bars"></i>
        <i
          onClick={togglePin}
          className={`fa-solid fa-thumbtack cursor-pointer transition-opacity duration-500 ease-in-out ${
            isPinned
              ? "text-blue-400"
              : "text-white group-hover:opacity-100 opacity-0"
          }`}
          title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
        ></i>
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="p-4 hover:bg-gray-700">
              <div
                onClick={
                  item.name === "Inventory" || "சரக்கு" ? toggleInventory : null
                }
              >
                <Link to={item.href} className="flex items-center">
                  <i className={`fas ${item.icon} mr-2`}></i>
                  <span
                    className={`${
                      isPinned
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-500 ease-in-out`}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
              {item.subItems && isInventoryOpen && (
                <ul className="ml-6">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name} className="p-2 hover:bg-gray-700">
                      <Link to={subItem.href} className="flex items-center">
                        <span
                          className={`${
                            isPinned
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          } transition-opacity duration-500 ease-in-out`}
                        >
                          {subItem.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideNavBar;
