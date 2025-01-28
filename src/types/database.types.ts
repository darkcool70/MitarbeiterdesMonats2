// export interface Image {
//   id: string;
//   created_at: string;
//   user_id: string | null;
//   image_url: string;
//   frame_id: string;
//   title: string;
//   employee_name: string;
//   title_style: string;
//   name_style: string;
//   title_position: string;
//   name_position: string;
//   banner_color: string;
//   logo_url?: string;
//   logo_position?: string;
//   decorations?: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   created_at: string;
// }
export interface Position {
  x: number;
  y: number;
}

export interface TextStyle {
  font: string;
  size: number;
  color: string;
}

export interface Decoration {
  id: string;
  image: string;
  position: Position;
}

export interface OrderItem {
  id: string;
  frame_id: string;
  frame_price: number;
  quantity: number;
  print_file_url: string;
  design_data: {
    title: string;
    employee_name: string;
    title_style: TextStyle;
    name_style: TextStyle;
    title_position: Position;
    name_position: Position;
    banner_color: string;
    decorations: Decoration[];
  };
}

export interface Order {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    shipping_address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  items: OrderItem[];
  total_price: number;
  status: "pending" | "processing" | "shipped";
  created_at: Date;
  updated_at: Date;
}
