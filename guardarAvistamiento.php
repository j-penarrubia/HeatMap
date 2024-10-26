<?php
// Definir la ruta del archivo JSON
$jsonFile = 'data.json';

// Leer los datos enviados en la solicitud POST
$data = file_get_contents("php://input");
$sightingData = json_decode($data, true);

if ($sightingData) {
    // Leer el contenido actual del archivo JSON
    if (file_exists($jsonFile)) {
        $currentData = json_decode(file_get_contents($jsonFile), true);
    } else {
        $currentData = [];
    }

    // Agregar los nuevos datos al array existente
    $currentData[] = $sightingData;

    // Guardar los datos actualizados en el archivo JSON
    if (file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        // Respuesta exitosa
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "¡Avistamiento registrado con éxito!"]);
    } else {
        // Error al escribir en el archivo
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al guardar el avistamiento."]);
    }
} else {
    // Error con los datos recibidos
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Datos de entrada inválidos."]);
}
?>