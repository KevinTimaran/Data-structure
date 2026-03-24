// src/Orden.ts
export enum OrderStatus {
  Pending = "pending",
  Preparing = "preparing",
  Ready = "ready",
  Served = "served",
  Cancelled = "cancelled",
}

export class Order {
  private static nextId = 1;

  public readonly id: number;
  public tableNumber: number;
  public items: string[]; // lista de items (concepto de LIST)
  public status: OrderStatus;
  public createdAt: Date;
  public notes?: string;

  constructor(tableNumber: number, items: string[], notes?: string) {
    this.id = Order.nextId++;
    this.tableNumber = tableNumber;
    this.items = items.slice(); // copiar la lista recibida
    this.status = OrderStatus.Pending;
    this.createdAt = new Date();
    this.notes = notes;
  }

  updateStatus(newStatus: OrderStatus) {
    this.status = newStatus;
  }

  addItem(item: string) {
    this.items.push(item);
  }

  removeItem(item: string) {
    const idx = this.items.indexOf(item);
    if (idx >= 0) this.items.splice(idx, 1);
  }

  toJSON() {
    return {
      id: this.id,
      table: this.tableNumber,
      items: this.items,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      notes: this.notes,
    };
  }

  toString() {
    return `Order #${this.id} (table ${this.tableNumber}) - ${this.status} - items: [${this.items.join(", ")}]`;
  }
}