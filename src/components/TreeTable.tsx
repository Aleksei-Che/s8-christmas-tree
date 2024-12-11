import { Tree } from "../redux/treeSlice";

interface TreeTableProps {
  trees: Tree[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TreeTable: React.FC<TreeTableProps> = ({ trees, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Height</th>
          <th className="border px-4 py-2">Ornaments</th>
          <th className="border px-4 py-2">Color</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {trees.map((tree) => (
          <tr key={tree.id}>
            <td className="border px-4 py-2">{tree.id}</td>
            <td className="border px-4 py-2">{tree.name}</td>
            <td className="border px-4 py-2">{tree.height}</td>
            <td className="border px-4 py-2">{tree.ornaments_count}</td>
            <td className="border px-4 py-2">{tree.ornaments_color}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => onEdit(tree.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(tree.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TreeTable;
