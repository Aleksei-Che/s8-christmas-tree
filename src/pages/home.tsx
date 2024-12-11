import { useEffect } from "react";
import AddItemButton from "../components/buttons/AddItemButton";
import DownloadCSVButton from "../components/buttons/DownloadCSVButton";
import TreeTable from "../components/TreeTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrees, deleteTree, addTree } from "../redux/treeSlice";
import { RootState, AppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trees = useSelector((state: RootState) => state.trees.trees);

  useEffect(() => {
    dispatch(fetchTrees());
  }, [dispatch]);

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
      <h1 className="text-3xl font-bold mb-6 text-center">Christmas Tree Manager</h1>
      <div className="flex justify-between items-center mb-6">
        <AddItemButton onAdd={handleAdd} />
        <DownloadCSVButton trees={trees} />
      </div>
      <TreeTable trees={trees} onEdit={() => {}} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
