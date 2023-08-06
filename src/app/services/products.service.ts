import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //Función que trae el array de productos de la API
  getAllProducts() {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products');
  }
}
