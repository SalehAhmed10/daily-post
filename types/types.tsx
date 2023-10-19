export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  images: string[];
}

export interface PostData {
  id: string;
  title?: string;
  content?: string;
  author?: string;
  datePublished?: string;
  category?: string;
  links?: string[];
  thumbnail?: string;
}
