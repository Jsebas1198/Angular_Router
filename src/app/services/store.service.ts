import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IProduct } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: IProduct[] = [];

  //Tiene un array de productos que es lo que queremos transmitir
  private myCart = new BehaviorSubject<IProduct[]>([]);

  //Es el suscriptor de myCart, como si estuvieras suscripto a un canal de YouTube
  //Es un  observable por eso tiene un $ por  buenas prácticas
  //Un observable permite esuchar activamente cambios
  myCart$ = this.myCart.asObservable();

  constructor() {}

  addProduct(product: IProduct) {
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
