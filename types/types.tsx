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

export type TCategory = {
  id: string;
  categoryName: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  categoryName: string;
  links: null | string[];
  authorEmail: string;
  author: {
    name: string;
    image: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};
