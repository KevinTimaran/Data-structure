// This es a proyect that simulates a Mars Rover's data transmission queue using
// a Queue data structure in TypeScript.
export interface DataPacket {
    sensor: "Cámara" | "Radiación" | "Muestras";
    contenido: string;
    prioridad: number;
}

// Class represents the Mars Rover's data queue
export class MarsRoverQueue {
    private items: DataPacket[] = [];

    // Enqueue: The rover captura un dato y lo pone al final de la cola
    recolectarDato(paquete: DataPacket): void {
        this.items.push(paquete);
        console.log(`Dato guardado: ${paquete.sensor} -> ${paquete.contenido}`);
    }

    // Dequeue: Se envía el primer dato a la Tierra (FIFO)
    transmitirATierra(): DataPacket | undefined {
        return this.items.shift();
    }

    // Front: Ver qué dato será enviado a continuación
    verProximoEnvio(): DataPacket | undefined {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}