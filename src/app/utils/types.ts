import { ReactNode } from "react";

export interface MaterialData {
  material_id: number
  material_name: string;
  brand_name: string;
  category_name: string;
  description: string;
  quantity: number;
  price: number;
  image: File | null; 
}

export interface NewMaterialData {
  material_name: string;
  brand_name: string;
  category_name: string;
  description: string;
  quantity: number;
  price: number;
  image: File | null;
}


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
    total_price: ReactNode;
    totalAmount: number;
    customerName: ReactNode;
    order_id: number;
    itemNumber: number;
    id?: number;
    order_date: string;
    status: string;
    cart_data: Record<string, CartItem>;
    material: number;
  }

  export interface CartData {
    [key: string]: CartItem;
  }

  export interface Credentials{
    email:string;
    password:string;
 }





