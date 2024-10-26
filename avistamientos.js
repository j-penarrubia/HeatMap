document.getElementById("sightingForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Obtener la hora actual en el momento del envío
    const currentTime = new Date().toISOString();
    const animalType = document.getElementById("animalType").value;

    // Solicitar la ubicación en el momento del envío
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async position => {
                const coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                // Estructura de datos a enviar
                const sightingData = {
                    animalType: animalType,
                    time: currentTime,
                    coordinates: coordinates
                };

                try {
                    const response = await fetch('guardarAvistamiento.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(sightingData)
                    });
                    
                    if (response.ok) {
                        alert("¡Avistamiento registrado con éxito!");
                    } else {
                        alert("Hubo un problema al registrar el avistamiento.");
                    }
                } catch (error) {
                    console.error("Error al enviar los datos:", error);
                }
            },
            error => {
                alert("No se pudo obtener la ubicación.");
                console.error("Error obteniendo ubicación:", error);
            }
        );
    } else {
        alert("Geolocalización no soportada en este navegador.");
    }
});