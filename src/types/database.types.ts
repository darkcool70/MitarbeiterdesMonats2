export interface Image {
  id: string;
  created_at: string;
  user_id: string | null;
  image_url: string;
  frame_id: string;
  title: string;
  employee_name: string;
  title_style: string;
  name_style: string;
  title_position: string;
  name_position: string;
  banner_color: string;
  logo_url?: string;
  logo_position?: string;
  decorations?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}