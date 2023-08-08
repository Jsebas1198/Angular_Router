import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import {
  CreateProductDTO,
  Product,
  updateProductDTO,
} from './../models/product.model';

// import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  // private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

  //Trae todos los productos, se le agregó paginación
  // getAllProducts() {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    //Debido a que se usan observables, podemos usar una funcionalidad para reintentar peticiones is fallan con retry de rxjs
    return this.http.get<Product[]>(this.apiUrl, { params }).pipe(retry(2));
  }

  //Trae los productos con paginación (La función getAllProducts hace lo mismo)
  // getProductsByPage(limit: number, offset: number) {
  //   return this.http.get<Product[]>(`${this.apiUrl}`, {
  //     params: { limit, offset }
  //   })
  // }

  //Trae la información de un producto
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  //Crea un
  //Le enviamos un DTO, pero cuando responda nos envia un producto
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  //Edita un producto
  update(id: string, dto: updateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  //Elimina un producto
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
