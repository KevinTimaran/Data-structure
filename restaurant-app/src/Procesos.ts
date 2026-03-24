// src/Procesos.ts
import { Order, OrderStatus } from "./Orden";
import { Restaurant } from "./Restaurante";

/**
 * Advance one logical step in the order lifecycle.
 * Mapping: pending -> preparing -> ready -> served
 * Cancelling or already final states are manejados.
 */
export function advanceOrderStep(order: Order): OrderStatus {
  switch (order.status) {
    case OrderStatus.Pending:
      order.updateStatus(OrderStatus.Preparing);
      break;
    case OrderStatus.Preparing:
      order.updateStatus(OrderStatus.Ready);
      break;
    case OrderStatus.Ready:
      order.updateStatus(OrderStatus.Served);
      break;
    case OrderStatus.Served:
    case OrderStatus.Cancelled:
      // estados finales: no hacer nada
      break;
    default:
      order.updateStatus(OrderStatus.Pending);
  }
  return order.status;
}

/**
 * Process the next pending order in the restaurant (aplica un paso).
 * Devuelve la orden procesada o undefined si no hay pendientes.
 */
export function processNextPending(restaurant: Restaurant): Order | undefined {
  const next = restaurant.nextPendingOrder();
  if (!next) return undefined;
  advanceOrderStep(next);
  return next;
}