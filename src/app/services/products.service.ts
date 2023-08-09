import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';

import {
  CreateProductDTO,
  Product,
  updateProductDTO,
} from './../models/product.model';
import { throwError, zip } from 'rxjs';
import { API_URL } from '../constants';
import { checkTime } from '../interceptors/time.interceptor';

// import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${API_URL}/products`;
  // private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

  fetchReadAndUpdate(id: string, dto: updateProductDTO) {
    return zip(this.getProduct(id), this.update(id, dto));
  }

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
    return this.http
    //Acá habilitamos el interceptor con el contexto, entonces solamente esta función usa el timeInterceptor
      .get<Product[]>(this.apiUrl, { params, context: checkTime() })
      .pipe(
        retry(2),
        map((product) =>
          product.map((item) => {
            return {
              ...item,
              taxes: 0.1 * item.price,
            };
          })
        )
      );
  }

  //Trae los productos con paginación (La función getAllProducts hace lo mismo)
  // getProductsByPage(limit: number, offset: number) {
  //   return this.http.get<Product[]>(`${this.apiUrl}`, {
  //     params: { limit, offset }
  //   })
  // }

  //Trae la información de un producto
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpStatusCode.ServiceUnavailable:
            return throwError(() => new Error('Service Unavailable'));
            break;
          case HttpStatusCode.NotFound:
            return throwError(() => new Error('Product Not Found'));
            break;
          default:
            return throwError(() => new Error('Error default'));
        }
      })
    );
  }

  //Crea un producto
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
