// src/main.ts
import { Restaurant } from "./Restaurante";
import { OrderStatus } from "./Orden";
import { processNextPending, advanceOrderStep } from "./Procesos";

function main() {
  const restaurant = new Restaurant();

  // Crear órdenes (añadir a la lista)
  const o1 = restaurant.createOrder(1, ["burger", "fries"], "No onions");
  const o2 = restaurant.createOrder(2, ["pizza"]);
  const o3 = restaurant.createOrder(3, ["salad", "juice"]);

  console.log("Created orders:");
  restaurant.printSummary();

  // Usar la lista: buscar y actualizar
  console.log("\nUpdate order status (o2 -> preparing)");
  restaurant.updateOrderStatus(o2.id, OrderStatus.Preparing);
  restaurant.printSummary();

  // Procesos: avanzar el siguiente pendiente
  console.log("\nProcessing next pending order (applies a step):");
  const processed = processNextPending(restaurant);
  if (processed) {
    console.log(`Processed order ${processed.id} -> ${processed.status}`);
  } else {
    console.log("No pending orders to process.");
  }
  restaurant.printSummary();

  // Agregar y remover items (manejo de listas dentro de Order)
  console.log("\nAdd 'drink' to order #1 and remove 'fries':");
  const order1 = restaurant.getOrderById(o1.id);
  if (order1) {
    order1.addItem("drink");
    order1.removeItem("fries");
  }
  restaurant.printSummary();

  // Filtrar órdenes por estado
  console.log("\nFilter: all orders not served yet:");
  const notServed = restaurant.filterOrders(o => o.status !== OrderStatus.Served);
  notServed.forEach(o => console.log(o.toString()));

  // Remover una orden (ejemplo: cancelada)
  console.log("\nCancel and remove order #3:");
  restaurant.updateOrderStatus(o3.id, OrderStatus.Cancelled);
  restaurant.removeOrder(o3.id);
  restaurant.printSummary();

  // Ordenar por createdAt
  console.log("\nSort orders by time (descending):");
  restaurant.sortOrdersByCreatedAt(false);
  restaurant.printSummary();
}

main();