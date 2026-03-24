// src/Restaurante.ts
import { Order, OrderStatus } from "./Orden";

export class Restaurant {
  private orders: Order[] = []; // la "lista" principal de órdenes

  // Crear y añadir una orden a la lista
  createOrder(tableNumber: number, items: string[], notes?: string): Order {
    const order = new Order(tableNumber, items, notes);
    this.orders.push(order);
    return order;
  }

  // Obtener una orden por id
  getOrderById(id: number): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  // Listar todas las órdenes (copia para evitar modificación externa)
  listOrders(): Order[] {
    return this.orders.slice();
  }

  // Filtrar usando una función (por ejemplo: status, table)
  filterOrders(predicate: (o: Order) => boolean): Order[] {
    return this.orders.filter(predicate);
  }

  // Actualizar estado de una orden
  updateOrderStatus(id: number, status: OrderStatus): Order | undefined {
    const order = this.getOrderById(id);
    if (!order) return undefined;
    order.updateStatus(status);
    return order;
  }

  // Remover una orden (por ejemplo si fue cancelada o cobrada)
  removeOrder(id: number): boolean {
    const idx = this.orders.findIndex(o => o.id === id);
    if (idx === -1) return false;
    this.orders.splice(idx, 1);
    return true;
  }

  // Obtener la siguiente orden pendiente (ejemplo de manejo de lista FIFO)
  nextPendingOrder(): Order | undefined {
    return this.orders.find(o => o.status === OrderStatus.Pending);
  }

  // Ordenar las órdenes por fecha de creación (mutación)
  sortOrdersByCreatedAt(ascending = true) {
    this.orders.sort((a, b) =>
      ascending
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Mostrar resumen para consola
  printSummary() {
    console.log("=== Restaurant orders summary ===");
    this.orders.forEach(o => {
      console.log(o.toString());
    });
    console.log("=== end summary ===");
  }
}