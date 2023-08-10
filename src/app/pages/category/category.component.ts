import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  template: `<app-products
    [products]="products"
    (loadMore)="onLoadMore()"
    [productId]="productId"
  ></app-products>`,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    //Permite capturar un id
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }

  onLoadMore() {
    if (this.categoryId) {
      this.productsService
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }
}
