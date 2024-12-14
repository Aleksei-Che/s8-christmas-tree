import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css"; 

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; 

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Mapa: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null); 
  const map = useRef<mapboxgl.Map | null>(null); 
  const [locations, setLocations] = useState<Location[]>([]); 
  const [newLocation, setNewLocation] = useState<{ latitude: number; longitude: number } | null>(null); 
  const [newLocationName, setNewLocationName] = useState<string>(""); 

  const initMap = () => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.1734, 41.3851],
      zoom: 12,
    });

    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setNewLocation({ latitude: lat, longitude: lng });
    });
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/locations");
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMarkers = () => {
    if (!map.current) return;

    locations.forEach(({ latitude, longitude, name }) => {
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setText(name))
        .addTo(map.current!);
    });
  };

  const handleAddLocation = async () => {
    if (!newLocation || !newLocationName) {
      alert("¡Introduce un nombre y selecciona un punto en el mapa!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/locations", {
        name: newLocationName,
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      });

      if (response.status === 201) {
        alert("¡Ubicación agregada con éxito!");
        setNewLocation(null); 
        setNewLocationName(""); 
        fetchLocations(); 
      }
    } catch (error) {
      console.error("Error al agregar la ubicación:", error);
    }
  };

  useEffect(() => {
    initMap();
    fetchLocations();
  }, []);

  useEffect(() => {
    addMarkers();
  }, [locations]);

  return (
    <div className="flex flex-row items-start min-h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 text-gray-300 p-6">
        <h2 className="text-xl font-bold mb-4">Agregar nueva ubicación</h2>

        <input
          type="text"
          placeholder="Nombre de la ubicación"
          value={newLocationName}
          onChange={(e) => setNewLocationName(e.target.value)}
          className="w-full p-2 bg-gray-700 text-gray-300 rounded mb-4"
        />
        {newLocation && (
          <p className="text-gray-400 mb-4">
            Coordenadas: Latitud {newLocation.latitude.toFixed(4)}, Longitud {newLocation.longitude.toFixed(4)}
          </p>
        )}
        <button
          onClick={handleAddLocation}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded"
        >
          Agregar ubicación
        </button>
      </div>

      {/* Mapa */}
      <div
        ref={mapContainer}
        className="flex-1 h-[600px] w-full rounded-lg shadow-lg ml-2"
      ></div>
    </div>
  );
};

export default Mapa;
