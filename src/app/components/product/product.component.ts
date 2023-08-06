import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Output() addedProduct = new EventEmitter<IProduct>();
  @Input('theProduct') product: IProduct = {
    id: '',
    price: 0,
    image: '',
    title: '',
    category: '',
    description: ''
  };

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
}
