import { useState } from "react";
import Modal from "../Modal";

interface AddItemButtonProps {
  onAdd: (formData: {
    name: string;
    height: string;
    ornaments_count: string;
    ornaments_color: string;
  }) => void;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    ornaments_count: "",
    ornaments_color: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      height: "",
      ornaments_count: "",
      ornaments_color: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Item
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg text-lime-600 font-bold mb-4">Add New Tree</h2>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="name"
            placeholder="Tree Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full text-gray-900 border rounded px-3 py-2 mb-3"
            required
          />
          <input
            type="text"
            name="height"
            placeholder="Height"
            value={formData.height}
            onChange={handleInputChange}
            className="w-full text-gray-900 border rounded px-3 py-2 mb-3"
            required
          />
          <input
            type="text"
            name="ornaments_count"
            placeholder="Number of Ornaments"
            value={formData.ornaments_count}
            onChange={handleInputChange}
            className="w-full text-gray-900 border rounded px-3 py-2 mb-3"
          />
          <input
            type="text"
            name="ornaments_color"
            placeholder="Ornaments Color"
            value={formData.ornaments_color}
            onChange={handleInputChange}
            className="w-full text-gray-900 border rounded px-3 py-2 mb-3"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddItemButton;
