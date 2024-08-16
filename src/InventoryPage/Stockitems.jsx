import React, { useEffect, useState } from "react";
import axios from "axios";

function StockItems() {
  const [inventory, setInventory] = useState([]);
  const [threshold, setThreshold] = useState(10); // Set a default threshold value

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleStockUpdate = async (id, stock) => {
    try {
      await axios.put(`http://localhost:3001/api/inventory/${id}/stock`, {
        stock,
      });
      fetchInventory(); // Refresh inventory after update
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return "bg-red-500"; // Red for zero stock
    if (stock < threshold) return "bg-yellow-500"; // Yellow for less than threshold
    return "bg-green-500"; // Green for stock above or equal to threshold
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Stock Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {inventory.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-2 flex flex-col items-center justify-between h-48 w-full shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center">
              <img
                src={item.imgUrl || "https://via.placeholder.com/80"}
                alt={item.name}
                className="mb-1 w-16 h-16 object-cover rounded-md"
                onError={(e) => {
                  console.log(`Error loading image: ${item.imgUrl}`);
                }}
              />
              <h3 className="text-center text-sm font-medium">{item.name}</h3>
            </div>
            <div className="flex items-center justify-between w-full mt-1">
              <span className="text-xs">Stock: {item.stock}</span>
              <div
                className={`w-4 h-4 rounded-full ${getStockColor(item.stock)}`}
                title={`Stock Status: ${
                  item.stock === 0
                    ? "Out of Stock"
                    : item.stock < threshold
                    ? "Low Stock"
                    : "In Stock"
                }`}
              ></div>
            </div>
            <input
              type="number"
              min="0"
              className="border border-gray-300 rounded p-1 mt-1 w-full text-xs"
              placeholder="Update Stock"
              onChange={(e) =>
                setInventory(
                  inventory.map((inv) =>
                    inv._id === item._id
                      ? { ...inv, stock: e.target.value }
                      : inv
                  )
                )
              }
              value={item.stock}
            />
            <button
              onClick={() => handleStockUpdate(item._id, item.stock)}
              className="bg-blue-500 text-white text-xs px-2 py-1 mt-1 rounded w-full"
            >
              Update Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockItems;
