import { Document } from "mongoose";

export interface IOrder extends Document {
  order_id: number;
  order_name: string;
  number_of_items: string;
}