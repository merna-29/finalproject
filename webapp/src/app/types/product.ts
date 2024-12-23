export interface Product {
    _id?: string;  // Optional product ID
    name: string;  // Name of the product
    shortDescription: string;  // Brief description of the product
    description: string;  // Detailed description of the product
    price: number;  // Price of the product
    discount: number;  // Discount on the product, if any
    images: string[];  // Array of image URLs for the product
    categoryId: string;  // Category ID to which the product belongs
    isFeatured:Boolean;
    isNew:Boolean;

  }
  