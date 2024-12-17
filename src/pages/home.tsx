import { useEffect, useState } from "react";
import AddItemButton from "../components/buttons/AddItemButton";
import DownloadCSVButton from "../components/buttons/DownloadCSVButton";
import TreeTable from "../components/TreeTable";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrees, deleteTree, addTree, updateTree, Tree } from "../redux/treeSlice";
import { RootState, AppDispatch } from "../redux/store";
import Snowfall from "react-snowfall";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trees = useSelector((state: RootState) => state.trees.trees);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    ornaments_count: "",
    ornaments_color: "",
  });

  // Загружаем деревья при монтировании
  useEffect(() => {
    dispatch(fetchTrees());
  }, [dispatch]);

  // Открытие модалки для редактирования
  const handleEdit = (id: number) => {
    const treeToEdit = trees.find((tree) => tree.id === id);
    if (treeToEdit) {
      setSelectedTree(treeToEdit);
      setFormData({
        name: treeToEdit.name,
        height: treeToEdit.height.toString(),
        ornaments_count: treeToEdit.ornaments_count.toString(),
        ornaments_color: treeToEdit.ornaments_color,
      });
      setIsModalOpen(true);
    }
  };

  // Сохранение редактированных данных
  const handleSave = async () => {
    if (selectedTree) {
      try {
        await dispatch(
          updateTree({
            id: selectedTree.id,
            name: formData.name,
            height: Number(formData.height),
            ornaments_count: Number(formData.ornaments_count),
            ornaments_color: formData.ornaments_color,
            created_at: selectedTree.created_at,
          })
        );
        dispatch(fetchTrees()); // Обновляем данные
        setIsModalOpen(false);
        setSelectedTree(null);
      } catch (error) {
        console.error("Error updating tree:", error);
      }
    }
  };

  const handleAdd = async (formData: {
    name: string;
    height: string;
    ornaments_count: string;
    ornaments_color: string;
  }) => {
    try {
      await dispatch(
        addTree({
          name: formData.name,
          height: Number(formData.height),
          ornaments_count: Number(formData.ornaments_count),
          ornaments_color: formData.ornaments_color,
        })
      );
      dispatch(fetchTrees());
    } catch (error) {
      console.error("Error adding tree:", error);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTree(id));
  };

  return (
    <div className="p-6 bg-gradient-to-b from-sky-950 via-sky-800 to-green-700 min-h-screen text-gray-200">
      <Snowfall
        snowflakeCount={50}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      />
      <h1 className="text-3xl font-bold mb-6 text-center">Christmas Tree Manager</h1>
      <div className="flex justify-between items-center mb-6">
        <AddItemButton onAdd={handleAdd} />
        <DownloadCSVButton trees={trees} />
      </div>
      <TreeTable trees={trees} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Модалка для редактирования */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Tree</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            placeholder="Height"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={formData.ornaments_count}
            onChange={(e) => setFormData({ ...formData, ornaments_count: e.target.value })}
            placeholder="Ornaments Count"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={formData.ornaments_color}
            onChange={(e) => setFormData({ ...formData, ornaments_color: e.target.value })}
            placeholder="Ornaments Color"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
