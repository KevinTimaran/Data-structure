import { MarsRoverQueue } from './MarsRoverQueue';

const curiosity = new MarsRoverQueue();

// Simulando recolección de datos en Marte
curiosity.recolectarDato({ sensor: "Cámara", contenido: "Foto Cráter Gale", prioridad: 1 });
curiosity.recolectarDato({ sensor: "Radiación", contenido: "Nivel alto detectado", prioridad: 2 });

console.log("\n--- Iniciando Transmisión a la Tierra ---");
while (!curiosity.isEmpty()) {
    const dato = curiosity.transmitirATierra();
    console.log(`Enviando: ${dato?.contenido}`);
}