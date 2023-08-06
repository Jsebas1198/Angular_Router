import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  //Array que detecta  los productos agregados al carrito
  myShoppingCart: IProduct[] = [];
  //Precio total de la suma de los precios de cada producto
  total = 0;

  //Inicializamos la propiedad en un array  vacio que va a almacenar los datos de los productos traidos por la API
  products: IProduct[] = [];

  // products: IProduct[] = [
  //   {
  //     id: '1',
  //     name: 'EL mejor juguete',
  //     price: 565,
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     id: '2',
  //     name: 'Bicicleta casi nueva',
  //     price: 356,
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     id: '3',
  //     name: 'Colleción de albumnes',
  //     price: 34,
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     id: '4',
  //     name: 'Mis libros',
  //     price: 23,
  //     image: 'https://source.unsplash.com/random',
  //   },
  // ];

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  //Al renderizar trae los datos de la API
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
  //Funcion que agrega un producto al carrito y suma los precios
  onAddToShoppingCart(product: IProduct) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
