import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const colorMap: { [key: string]: string } = {
  red: "#FF6384",
  green: "#4CAF50",
  blue: "#36A2EB",
  yellow: "#FFCE56",
  violet: "#8B5CF6",
  orange: "#FF9F40",
  pink: "#F472B6",
  gray: "#9CA3AF",
};

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ChartsPage: React.FC = () => {
  const [treeData, setTreeData] = useState<any[]>([]);

  const fetchTreeData = async () => {
    try {
      const response = await fetch(`${apiUrl}/trees`);
      const data = await response.json();
      setTreeData(data);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const pieData = {
    labels: [...new Set(treeData.map((tree) => tree.ornaments_color))],
    datasets: [
      {
        label: "Colores de adornos",
        data: Object.values(
          treeData.reduce((acc: any, tree: any) => {
            acc[tree.ornaments_color] = (acc[tree.ornaments_color] || 0) + 1;
            return acc;
          }, {})
        ),
        backgroundColor: [...new Set(treeData.map((tree) => colorMap[tree.ornaments_color] || "#CCCCCC"))],
        hoverBackgroundColor: [...new Set(treeData.map((tree) => colorMap[tree.ornaments_color] || "#BBBBBB"))],
      },
    ],
  };

  const barData = {
    labels: treeData.map((tree) => tree.name),
    datasets: [
      {
        label: "Altura del árbol (m)",
        data: treeData.map((tree) => tree.height),
        backgroundColor: treeData.map((_, i) => {
          const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8B5CF6"];
          return colors[i % colors.length];
        }),
        borderColor: treeData.map((_, i) => {
          const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8B5CF6"];
          return colors[i % colors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-b from-green-800 to-blue-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Gráficos de árboles de Navidad</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Круговая диаграмма */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-black">
          <h3 className="text-xl font-bold mb-4 text-center">Colores de los adornos</h3>
          <Pie data={pieData} />
        </div>

        {/* Столбчатая диаграмма */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-black">
          <h3 className="text-xl font-bold mb-4 text-center">Altura de los árboles</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
