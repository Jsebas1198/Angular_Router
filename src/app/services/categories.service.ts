import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/product.model';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${API_URL}/categories`;

  constructor(private http: HttpClient) {}

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      (params = params.set('limit', limit)),
        (params = params.set('offset', offset));
    }
    console.log(this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl, { params });
  }
}
