import { Tree } from "../../redux/treeSlice"; 

interface DownloadCSVButtonProps {
  trees: Tree[];
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ trees }) => {
  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Height,Ornaments,Color"]
        .concat(
          trees.map((tree) =>
            [tree.id, tree.name, tree.height, tree.ornaments_count, tree.ornaments_color].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "trees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Download CSV
    </button>
  );
};

export default DownloadCSVButton;
