import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Product[] = [];

  //Tiene un array de productos que es lo que queremos transmitir
  private myCart = new BehaviorSubject<Product[]>([]);

  //Es el suscriptor de myCart, como si estuvieras suscripto a un canal de YouTube
  //Es un  observable por eso tiene un $ por  buenas prácticas
  //Un observable permite esuchar activamente cambios
  myCart$ = this.myCart.asObservable();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    //Con  el next emitimos un valor que seria  el estado de la lista
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
