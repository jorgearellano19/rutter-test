export interface ProductsResponse {
  products: Product[];
  error?: string;
}
export interface OrdersResponse {
  orders: Order[];
  error?: string;
}
export interface Order {
  id: number;
  line_items: {
    product_id: number;
  }[];
}
export interface Product {
  id: number;
  title: string;
}

export interface APIResponse<T> {
  data: T;
  nextLink: string;
  error?: string;
}
