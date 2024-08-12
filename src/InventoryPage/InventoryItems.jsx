import React, { useEffect, useState } from "react";
import axios from "axios";

function InventoryItems() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", imgUrl: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="grid grid-cols-4 gap-4">
        {inventory.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 p-4 flex flex-col items-center"
          >
            <img src={item.imgUrl} alt={item.name} className="mb-2 w-24 h-24" />
            <h3 className="text-center">{item.name}</h3>
            <button
              onClick={() => handleDeleteItem(item._id)}
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            >
              Delete
            </button>
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
