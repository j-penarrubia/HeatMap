let map;
let heatmap;

// Función para inicializar el mapa de Google y cargar los datos del JSON
function initMap() {
    // Configuración inicial del mapa
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 }, // Centro inicial (puedes ajustarlo)
        zoom: 2, // Zoom inicial adecuado para ver un mapa global
    });

    // Configurar el mapa de calor sin datos al inicio
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: [],
        map: map,
    });

    // Cargar los puntos en el mapa de calor desde el archivo JSON
    loadSightingsForHeatmap();
}

// Función para cargar los puntos desde el archivo JSON y agregarlos al mapa de calor
async function loadSightingsForHeatmap() {
    try {
        // Realizar una solicitud para obtener el archivo JSON
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo de avistamientos.");
        }

        // Convertir la respuesta a JSON
        const sightings = await response.json();

        // Convertir los datos de coordenadas en objetos LatLng para el mapa de calor
        const heatmapData = sightings.map(sighting => {
            return new google.maps.LatLng(sighting.coordinates.latitude, sighting.coordinates.longitude);
        });

        // Asignar los datos al mapa de calor
        heatmap.setData(heatmapData);
    } catch (error) {
        console.error("Error al cargar avistamientos para el mapa de calor:", error);
    }
}

// Cargar los avistamientos en el mapa de calor al cargar la página
window.addEventListener("load", () => {
    if (typeof google !== 'undefined') {
        initMap();
    }
});