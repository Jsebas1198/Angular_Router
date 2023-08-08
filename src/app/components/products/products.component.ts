import { Component, OnInit } from '@angular/core';

import {
  CreateProductDTO,
  Product,
  updateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  today = new Date(2019, 4, 4);
  anotherDate = new Date(2025, 5, 20);
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;

  //Para mostrar la informacion de un prodcuto
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts(10, 0).subscribe((data: Product[]) => {
      this.products = data;
    });

    // this.productsService.getProductsByPage(10, 0).subscribe((data) => {
    //   this.products = data;
    //   this.offset += this.limit;
    // });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  //Muestra la información del producto seleccionado
  onShowDetail(id: string) {
    //en caso de que den dos veces al botón solo ocultara los detalles(para no ir a darle al botón de cerrar)
    if (
      this.productChosen.id != '' &&
      this.productChosen.id == id &&
      this.showProductDetail == true
    ) {
      this.showProductDetail = false;
      return;
    }

    //en caso de que seleccionen el mismo producto ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
    if (
      this.productChosen.id != '' &&
      this.productChosen.id == id &&
      this.showProductDetail == false
    ) {
      this.showProductDetail = true;
      return;
    }
    //en caso que le den al botón de ver detalles mientras ya están abiertos los de un producto diferente cierra el panel de detalles
    if (
      this.productChosen.id != '' &&
      this.productChosen.id != id &&
      this.showProductDetail == true
    ) {
      this.showProductDetail = false;
    }

    this.productsService.getProduct(id).subscribe((data: Product) => {
      this.productChosen = data;
      if (!this.showProductDetail) {
        this.toggleProductDetail();
      }
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data: Product) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: updateProductDTO = {
      title: 'Nuevo title',
      description: 'Esta es un prueba',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data: Product) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data: ConcatArray<Product>) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
