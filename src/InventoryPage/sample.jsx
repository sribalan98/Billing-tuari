import React, { useEffect, useState } from "react";
import axios from "axios";

function InventoryItems() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", imgUrl: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddItem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/inventory",
        newItem
      );
      setInventory([...inventory, response.data]);
      setNewItem({ name: "", imgUrl: "" });
      setIsModalOpen(false); // Close the modal after adding the item
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/inventory/${id}`);
      setInventory(inventory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
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

  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/150"; // Fallback image URL
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>
      <div
        id="maindiv"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4"
      >
        {inventory.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-lg p-2 flex flex-col items-center  drop-shadow-lg justify-between h-auto w-full shadow-sm group transition-all  hover:shadow-lg hover:scale-105 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center">
              <img
                src={item.imgUrl || "https://via.placeholder.com/150"} // Fallback image if URL is empty
                alt={item.name}
                className="mb-1 w-16 h-16 object-cover rounded-md"
                onError={handleImageError}
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
            <div className="flex flex-col w-full">
              <button
                onMouseEnter={(e) => {
                  e.target.parentNode.parentNode.style.borderColor = "#ef4444"; // Dark Red for border
                  e.target.parentNode.parentNode.style.backgroundColor =
                    "#fca5a5"; // Light Red for background
                }}
                onMouseLeave={(e) => {
                  e.target.parentNode.parentNode.style.borderColor =
                    "rgba(209, 213, 219, 1)"; // Reset to gray-300
                  e.target.parentNode.parentNode.style.backgroundColor =
                    "transparent";
                }}
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-500 text-white text-xs px-2 py-1 mt-1 rounded w-full transition-colors"
              >
                Delete
              </button>
              <button
                onMouseEnter={(e) => {
                  e.target.parentNode.parentNode.style.borderColor = "#3b82f6"; // Dark Blue for border
                  e.target.parentNode.parentNode.style.backgroundColor =
                    "#93c5fd"; // Light Blue for background
                }}
                onMouseLeave={(e) => {
                  e.target.parentNode.parentNode.style.borderColor =
                    "rgba(209, 213, 219, 1)"; // Reset to gray-300
                  e.target.parentNode.parentNode.style.backgroundColor =
                    "transparent";
                }}
                onClick={() => handleStockUpdate(item._id, item.stock)}
                className="bg-blue-500 text-white text-xs px-2 py-1 mt-1 rounded w-full transition-colors"
              >
                Update Stock
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Item</h2>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Name"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              value={newItem.imgUrl}
              onChange={(e) =>
                setNewItem({ ...newItem, imgUrl: e.target.value })
              }
              placeholder="Image URL"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddItem}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryItems;
