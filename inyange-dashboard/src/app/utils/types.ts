import { ReactNode } from "react";

export interface CartItem {
    category_name: ReactNode;
    image: string;
    material_name: string;
    brand_name: ReactNode;
    quantity: number;
    price: string;
    total_price: string;
  }
  
  export interface Order {
    brand_name: ReactNode;
    total_price: ReactNode;
    totalAmount: number;
    customerName: ReactNode;
    order_id: number;
    itemNumber: number;
    order_date: string;
    status: string;
    cart_data: Record<string, CartItem>;
    material: number;
  }


  export interface CartData {
    [key: string]: CartItem;
  }