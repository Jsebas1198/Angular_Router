export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface Category {
  id: string;
  name: string;
}

//Interfaz para crear un producto, se omiten los campos que no se utilizan con Omit
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

//Partial agrega el signo de ? en todos los atributos
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface updateProductDTO extends Partial<CreateProductDTO> {}
